
import React, { useState, useRef } from 'react';
import { AppView } from './types';
import { Button } from '../components/Button';
import { Download, CheckCircle, AlertTriangle, BookOpen, Code, Terminal, MicOff, Activity, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface FinalReportProps {
  onChangeView: (view: AppView) => void;
}

const data = [
  { subject: 'Confidence', A: 82, fullMark: 100 },
  { subject: 'Clarity', A: 91, fullMark: 100 },
  { subject: 'Pace', A: 88, fullMark: 100 },
  { subject: 'Technical', A: 65, fullMark: 100 },
  { subject: 'Structure', A: 78, fullMark: 100 },
];

const QUESTION_BREAKDOWN = [
  {
    id: 1,
    question: "Tell me about a time you faced a difficult challenge at work.",
    technicalScore: 85,
    confidenceScore: 88,
    feedback: "Strong use of the STAR method. Good pacing, though slightly hesitant at the start.",
  },
  {
    id: 2,
    question: "How would you design a URL shortening service?",
    technicalScore: 92,
    confidenceScore: 85,
    feedback: "Excellent system design knowledge. Covered database schema and scalability trade-offs well.",
  },
  {
    id: 3,
    question: "Explain the concept of closures in JavaScript.",
    technicalScore: 33,
    confidenceScore: 80,
    feedback: "Definition was slightly vague. Providing a concrete code example would strengthen this answer.",
  }
];

const RecommendationCard: React.FC<{ icon: React.ReactNode; title: string; color: string }> = ({ icon, title, color }) => (
  <div className={`flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-background-card hover:bg-zinc-800/50 transition-colors cursor-pointer group`}>
    <div className={`${color} p-2 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors`}>
      {icon}
    </div>
    <span className="font-medium text-sm text-zinc-300 group-hover:text-white transition-colors">{title}</span>
  </div>
);

const QuestionCard: React.FC<{ item: typeof QUESTION_BREAKDOWN[0]; index: number; isOpen: boolean; onToggle: () => void }> = ({ item, index, isOpen, onToggle }) => {
  return (
    <div className="bg-background-card border border-zinc-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-zinc-700">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer bg-zinc-900/30 hover:bg-zinc-900/50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-primary font-display">
            {index + 1}
          </div>
          <h4 className="font-medium text-white">{item.question}</h4>
        </div>
        <button className="text-zinc-500 hover:text-white transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Expanded Content */}
      <div className={`px-4 pb-4 pt-2 border-t border-zinc-800/50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Technical:</span>
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: `${item.technicalScore}%` }}></div>
            </div>
            <span className="text-sm font-bold text-white">{item.technicalScore}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Confidence:</span>
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-green-500" style={{ width: `${item.confidenceScore}%` }}></div>
            </div>
            <span className="text-sm font-bold text-white">{item.confidenceScore}%</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
          <span className="font-semibold text-primary">AI Feedback: </span>
          {item.feedback}
        </p>
      </div>
    </div>
  );
}

export const FinalReport: React.FC<FinalReportProps> = ({ onChangeView }) => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);

  const toggleQuestion = (id: number) => {
    setExpandedQuestions(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const handleDownload = async () => {
    if (!reportRef.current) return;

    setDownloadStatus('loading');
    
    // 1. Save current expansion state
    const previousState = [...expandedQuestions];
    
    // 2. Expand all questions for the PDF
    const allIds = QUESTION_BREAKDOWN.map(q => q.id);
    setExpandedQuestions(allIds);

    // 3. Wait for render (state update + animation frame)
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const element = reportRef.current;
      
      // 4. Capture
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        backgroundColor: '#121212',
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      } as any);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add subsequent pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('InterVu_Performance_Report.pdf');
      
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch (error) {
      console.error("PDF generation failed", error);
      setDownloadStatus('idle');
    } finally {
      // 5. Restore original state
      setExpandedQuestions(previousState);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 py-8" ref={reportRef}>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Final Performance Report</h1>
          <p className="text-text-muted">Great work! Here's a breakdown of your interview performance.</p>
        </div>
        <div data-html2canvas-ignore>
          <Button 
            variant="primary" 
            onClick={handleDownload}
            loading={downloadStatus === 'loading'}
            disabled={downloadStatus === 'success'}
            icon={downloadStatus === 'success' ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            className={downloadStatus === 'success' ? '!bg-green-500 !border-green-500 !text-white' : ''}
          >
            {downloadStatus === 'idle' && 'PDF Download'}
            {downloadStatus === 'loading' && 'Generating...'}
            {downloadStatus === 'success' && 'Downloaded!'}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Radar Chart Section */}
        <div className="bg-background-card border border-primary/20 rounded-2xl p-6 flex flex-col relative shadow-[0_0_40px_rgba(0,194,186,0.05)]">
          <h3 className="font-bold text-white mb-6">Overall Scores</h3>
          <div className="w-full h-[300px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <PolarGrid stroke="#3F3F46" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#A1A1AA', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Alex"
                  dataKey="A"
                  stroke="#00C2BA"
                  strokeWidth={3}
                  fill="#00C2BA"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-white text-lg mb-4">Strengths & Weaknesses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-primary/30 bg-primary/5 flex gap-4 hover:bg-primary/10 transition-colors">
              <div className="mt-1 flex-shrink-0"><CheckCircle className="w-6 h-6 text-primary" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">Excellent Pace</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">You spoke at a consistent rate of 150wpm, which made your delivery more persuasive and impactful.</p>
              </div>
            </div>
            
            <div className="p-5 rounded-xl border border-primary/30 bg-primary/5 flex gap-4 hover:bg-primary/10 transition-colors">
              <div className="mt-1 flex-shrink-0"><CheckCircle className="w-6 h-6 text-primary" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">Strong Confidence</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">Your tone remained steady even during complex technical questions, projecting authority.</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-yellow-500/30 bg-yellow-500/5 flex gap-4 hover:bg-yellow-500/10 transition-colors">
              <div className="mt-1 flex-shrink-0"><AlertTriangle className="w-6 h-6 text-yellow-500" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">Answer Structure</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">Try using frameworks like STAR to structure your behavioral answers more clearly.</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 flex gap-4 hover:bg-red-500/10 transition-colors">
              <div className="mt-1 flex-shrink-0"><MicOff className="w-6 h-6 text-red-500" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">Filler Words</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">Reducing filler words like "um" and "uh" can make your responses sound more polished.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Per-Question Breakdown */}
      <div className="mb-8">
        <h3 className="font-bold text-white text-lg mb-6">Per-Question Breakdown</h3>
        <div className="grid grid-cols-1 gap-4">
           {QUESTION_BREAKDOWN.map((item, idx) => (
             <QuestionCard 
                key={item.id} 
                item={item} 
                index={idx}
                isOpen={expandedQuestions.includes(item.id)}
                onToggle={() => toggleQuestion(item.id)}
             />
           ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-background-card border border-zinc-800 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-white text-lg mb-6">Recommendations</h3>
        <div className="flex flex-wrap gap-4">
          <RecommendationCard icon={<BookOpen className="w-4 h-4 text-primary" />} title="Behavioral Interview Techniques" color="text-primary" />
          <RecommendationCard icon={<Code className="w-4 h-4 text-primary" />} title="System Design Fundamentals" color="text-primary" />
          <RecommendationCard icon={<Terminal className="w-4 h-4 text-primary" />} title="Public Speaking Drills" color="text-primary" />
          <RecommendationCard icon={<Activity className="w-4 h-4 text-primary" />} title="Data Structures Review" color="text-primary" />
        </div>
      </div>

      <div className="flex justify-center pb-8" data-html2canvas-ignore>
        <Button onClick={() => onChangeView(AppView.DASHBOARD)} variant="outline" className="px-12 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500">Return to Dashboard</Button>
      </div>
    </div>
  );
};
