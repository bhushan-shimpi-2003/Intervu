import React from 'react';
import { AppView } from './types';

interface AboutProps {
  onChangeView: (view: AppView) => void;
}

const TeamMember: React.FC<{ name: string; role: string; img: string }> = ({ name, role, img }) => (
  <div className="text-center">
    <div className="w-32 h-32 mx-auto rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden mb-4 hover:border-primary transition-colors">
      <img src={img} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg font-bold text-white">{name}</h3>
    <p className="text-primary text-sm">{role}</p>
  </div>
);

export const About: React.FC<AboutProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Our Mission</h1>
          <p className="text-xl text-text-muted leading-relaxed">
            We believe that talent is equally distributed, but opportunity is not. InterVu AI exists to democratize interview preparation, giving every engineer the confidence and skills to land their dream job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Why We Started</h2>
            <div className="space-y-6 text-text-muted text-lg">
              <p>
                As former engineering managers, we saw countless talented candidates fail interviews not because of a lack of skill, but because of anxiety and poor communication.
              </p>
              <p>
                Traditional mock interviews are expensive and hard to schedule. We built InterVu to provide a scalable, accessible, and judgment-free zone for developers to practice.
              </p>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-2 border border-zinc-800 rotate-2 hover:rotate-0 transition-transform duration-500">
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2940" alt="Team collaborating" className="rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TeamMember name="Elena Rodriguez" role="CEO & Co-Founder" img="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" />
            <TeamMember name="James Chen" role="CTO" img="https://api.dicebear.com/7.x/avataaars/svg?seed=James" />
            <TeamMember name="Sarah Miller" role="Head of AI" img="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
            <TeamMember name="David Okonjo" role="Product Design" img="https://api.dicebear.com/7.x/avataaars/svg?seed=David" />
          </div>
        </div>
      </div>
    </div>
  );
};