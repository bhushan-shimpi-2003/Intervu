import React, { useState, useRef } from 'react';
import { Download, Check, ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { AppView } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Fix: Cast motion.div to any to avoid type errors
const MotionDiv = motion.div as any;

interface InterviewSummaryProps {
  onChangeView: (view: AppView) => void;
}

const MOCK_TRANSCRIPTS = [
  {
    id: 1,
    question: "Can you explain the concept of closures in JavaScript and provide a practical use case?",
    answer: "Absolutely. A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function’s variables and scope, even after the outer function has returned. Essentially, it ’remembers’ the environment in which it was created. A practical use case is data privacy, like creating private variables in a function factory.",
    highlights: [
      { text: "in JavaScript", type: "keyword" },
      { text: "(enclosing)", type: "keyword" },
      { text: "variables", type: "negative" },
      { text: "Essentially", type: "keyword" }
    ]
  },
  {
    id: 2,
    question: "What is the difference between `let`, `const`, and `var`? When would you use each?",
    answer: "Var is function scoped and hoisted, while let and const are block scoped. Const cannot be reassigned, whereas let can. It is generally recommended to use const by default and let only when you need to reassign a variable. This prevents accidental reassignment and keeps code cleaner.",
    highlights: [
        { text: "function scoped", type: "keyword" },
        { text: "block scoped", type: "keyword" }
    ]
  },
  {
    id: 3,
    question: "Describe your experience with RESTful APIs. How do you handle error states?",
    answer: "I have extensive experience building and consuming RESTful APIs using Node.js and Express. I understand the importance of standard HTTP methods like GET, POST, PUT, and DELETE. For errors, I ensure we return proper status codes like 400 for bad requests or 500 for server errors, along with a consistent JSON error structure.",
    highlights: [
        { text: "standard HTTP methods", type: "keyword" },
        { text: "status codes", type: "keyword" }
    ]
  },
  {
    id: 4,
    question: "How would you optimize a React application that is experiencing performance issues?",
    answer: "First, I'd profile the app using React DevTools to identify expensive re-renders. I would implement `React.memo` for components that don't need to update often, and use `useMemo` or `useCallback` for expensive calculations. I'd also look into code-splitting with `React.lazy` to reduce the initial bundle size and optimize images using next/image or lazy loading.",
    highlights: [
        { text: "React DevTools", type: "keyword" },
        { text: "re-renders", type: "negative" },
        { text: "React.memo", type: "keyword" },
        { text: "code-splitting", type: "keyword" }
    ]
  },
  {
    id: 5,
    question: "Tell me about a time you had a disagreement with a team member. How did you resolve it?",
    answer: "In a previous project, a backend engineer and I disagreed on the API schema structure. He wanted a nested JSON structure, while I preferred a flat structure for easier frontend state management. We scheduled a 15-minute sync to discuss the pros and cons of both. We compromised on a flatter structure that still preserved the necessary data relationships, ensuring both ease of use and data integrity.",
    highlights: [
        { text: "disagreed", type: "negative" },
        { text: "compromised", type: "keyword" },
        { text: "data integrity", type: "keyword" }
    ]
  }
];

export const InterviewSummary: React.FC<InterviewSummaryProps> = ({ onChangeView }) => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [openTranscriptId, setOpenTranscriptId] = useState<number | null>(1);
  const reportRef = useRef<HTMLDivElement>(null);

  const toggleTranscript = (id: number) => {
    setOpenTranscriptId(openTranscriptId === id ? null : id);
  };

  const handleDownload = async () => {
    if (!reportRef.current) return;
    setDownloadStatus('loading');
    
    // Save current open state
    const currentOpenId = openTranscriptId;
    
    // In a real implementation, we might want to temporarily expand all items for the PDF capture
    // But for now, we'll just capture as-is or you could modify state here.
    
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#121212',
        useCORS: true
      } as any);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('Interview_Summary.pdf');
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch (error) {
      console.error("PDF gen failed", error);
      setDownloadStatus('idle');
    }
  };

  // Helper to render text with highlights
  const renderHighlightedText = (text: string, highlights: any[]) => {
    if (!highlights || highlights.length === 0) return text;
    
    let result = text;
    // Note: This simple replacement can be buggy if keywords overlap. 
    // For a production app, use a text tokenization approach.
    highlights.forEach(h => {
        const colorClass = h.type === 'keyword' ? 'text-yellow-400' : 'text-red-400';
        // Basic global replace
        const regex = new RegExp(`(${h.text})`, 'gi');
        result = result.replace(regex, `<span class="${colorClass}">$1</span>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 py-8" ref={reportRef}>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">All Questions & Answers Summary</h1>
          <p className="text-text-muted">A detailed analysis of your interview performance.</p>
        </div>
        <div data-html2canvas-ignore>
          <Button 
            onClick={handleDownload}
            loading={downloadStatus === 'loading'}
            disabled={downloadStatus === 'success'}
            icon={downloadStatus === 'success' ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            className={downloadStatus === 'success' ? '!bg-primary !border-primary !text-background-dark' : 'bg-primary text-background-dark'}
          >
            {downloadStatus === 'success' ? 'Downloaded' : 'Export as PDF'}
          </Button>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-6">Overall Performance</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-background-card border border-zinc-800 p-5 rounded-xl">
                <div className="text-sm text-text-muted mb-1">Overall Confidence</div>
                <div className="text-3xl font-bold text-white mb-1">85%</div>
                <div className="text-xs text-green-400">+5%</div>
            </div>
            <div className="bg-background-card border border-zinc-800 p-5 rounded-xl">
                <div className="text-sm text-text-muted mb-1">Technical Score</div>
                <div className="text-3xl font-bold text-white mb-1">78%</div>
                <div className="text-xs text-red-400">-2%</div>
            </div>
            <div className="bg-background-card border border-zinc-800 p-5 rounded-xl">
                <div className="text-sm text-text-muted mb-1">Total Filler Words</div>
                <div className="text-3xl font-bold text-white mb-1">12</div>
                <div className="text-xs text-green-400">+1%</div>
            </div>
            <div className="bg-background-card border border-zinc-800 p-5 rounded-xl">
                <div className="text-sm text-text-muted mb-1">Average Pace</div>
                <div className="text-3xl font-bold text-white mb-1">155 WPM</div>
                <div className="text-xs text-red-400">-3%</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-white font-medium">Overall Confidence Score</span>
                    <span className="text-white">85%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%] rounded-full"></div>
                </div>
            </div>
             <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-white font-medium">Overall Technical Score</span>
                    <span className="text-white">78%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[78%] rounded-full"></div>
                </div>
            </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-background-card border border-zinc-800 rounded-xl p-6">
            <h3 className="text-primary font-bold text-lg mb-6">Strengths</h3>
            <ul className="space-y-4">
                <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-zinc-300 text-sm">Strong technical knowledge of core JavaScript concepts.</span>
                </li>
                 <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-zinc-300 text-sm">Clear and concise communication on familiar topics.</span>
                </li>
                 <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-zinc-300 text-sm">Good use of industry-standard terminology.</span>
                </li>
            </ul>
        </div>
        <div className="bg-background-card border border-zinc-800 rounded-xl p-6">
            <h3 className="text-primary font-bold text-lg mb-6">Weaknesses</h3>
            <ul className="space-y-4">
                <li className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-zinc-300 text-sm">Occasional use of filler words like "Um" when hesitating.</span>
                </li>
                 <li className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-zinc-300 text-sm">Slight dip in confidence on specific API method details (e.g., PUT).</span>
                </li>
                 <li className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-zinc-300 text-sm">Could provide more in-depth examples for practical experience.</span>
                </li>
            </ul>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold text-white">Interview Transcript</h2>
             <div className="flex items-center gap-4 text-xs">
                 <span className="text-text-muted">Confidence:</span>
                 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> High</div>
                 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Medium</div>
                 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Low</div>
             </div>
        </div>

        <div className="space-y-4">
            {MOCK_TRANSCRIPTS.map((item, index) => {
                const isOpen = openTranscriptId === item.id;
                return (
                    <div key={item.id} className="bg-background-card border border-zinc-800 rounded-xl overflow-hidden">
                        <div 
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/30 transition-colors"
                            onClick={() => toggleTranscript(item.id)}
                        >
                            <h3 className="font-medium text-white flex gap-3">
                                <span className="text-text-muted">{index + 1}.</span> {item.question}
                            </h3>
                            {isOpen ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <MotionDiv 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-zinc-800/50 bg-zinc-900/30"
                                >
                                    <div className="p-6">
                                        <p className="text-zinc-300 leading-relaxed font-light">
                                            {renderHighlightedText(item.answer, item.highlights)}
                                        </p>
                                    </div>
                                </MotionDiv>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
      </section>

      <div className="flex justify-center mt-12 mb-8" data-html2canvas-ignore>
         <Button onClick={() => onChangeView(AppView.DASHBOARD)} variant="outline" className="px-8 border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white">
            Return to Dashboard
         </Button>
      </div>
    </div>
  );
};