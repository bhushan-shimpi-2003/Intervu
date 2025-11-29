
import React from 'react';
import { Mic, BarChart2, Database, FileText, Building2, ArrowRight, Shield, Cpu } from 'lucide-react';
import { Button } from '../components/Button';
import { AppView } from './types';

interface ServicesProps {
  onChangeView: (view: AppView) => void;
}

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string; features: string[] }> = ({ icon, title, description, features }) => (
  <div className="bg-background-card border border-zinc-800 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 flex flex-col h-full group">
    <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
      <div className="text-primary">
        {icon}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-white mb-3 font-display">{title}</h3>
    <p className="text-text-muted mb-6 leading-relaxed flex-1">{description}</p>
    
    <ul className="space-y-3 mt-auto">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export const Services: React.FC<ServicesProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Our Services</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Comprehensive tools and technologies designed to help you master technical interviews and land your dream job.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <ServiceCard 
            icon={<Mic className="w-8 h-8" />}
            title="AI Mock Interviews"
            description="Experience realistic voice-based technical interviews with our advanced AI coach that adapts to your responses in real-time."
            features={[
              "Natural language processing",
              "Real-time follow-up questions",
              "Adaptive difficulty levels",
              "Role-specific scenarios"
            ]}
          />
          <ServiceCard 
            icon={<BarChart2 className="w-8 h-8" />}
            title="Voice Analysis"
            description="Get detailed feedback on your communication style, including pace, tone, filler words, and confidence metrics."
            features={[
              "Speech-to-text transcription",
              "Tone & sentiment analysis",
              "Pacing & clarity scoring",
              "Filler word detection"
            ]}
          />
          <ServiceCard 
            icon={<Database className="w-8 h-8" />}
            title="Question Bank"
            description="Access thousands of curated technical questions covering algorithms, system design, and behavioral topics."
            features={[
              "5000+ technical questions",
              "Company-specific tracks",
              "System design scenarios",
              "Regularly updated content"
            ]}
          />
          <ServiceCard 
            icon={<FileText className="w-8 h-8" />}
            title="Performance Reports"
            description="Receive comprehensive PDF reports after every session detailing your strengths, weaknesses, and areas for improvement."
            features={[
              "Detailed scoring breakdown",
              "Actionable recommendations",
              "Progress tracking over time",
              "Shareable PDF exports"
            ]}
          />
          <ServiceCard 
            icon={<Building2 className="w-8 h-8" />}
            title="Enterprise Solutions"
            description="Empower your hiring team with consistent, bias-free technical assessments and candidate screening tools."
            features={[
              "Custom interview pipelines",
              "Team management dashboard",
              "ATS integration",
              "Candidate ranking & insights"
            ]}
          />
          <ServiceCard 
            icon={<Cpu className="w-8 h-8" />}
            title="Custom Learning Paths"
            description="Personalized study plans generated based on your interview performance to target your weak spots."
            features={[
              "AI-generated study guides",
              "Targeted practice drills",
              "Resource recommendations",
              "Skill gap analysis"
            ]}
          />
        </div>

        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-12 border border-zinc-700 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to accelerate your career?</h2>
            <p className="text-lg text-text-muted mb-10">
              Join thousands of developers who are using InterVu AI to prepare for their next big opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onChangeView(AppView.SIGNUP)} className="h-14 px-10 text-lg shadow-xl shadow-primary/20">
                Start Practicing Free
              </Button>
              <Button onClick={() => onChangeView(AppView.CONTACT)} variant="outline" className="h-14 px-10 text-lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
