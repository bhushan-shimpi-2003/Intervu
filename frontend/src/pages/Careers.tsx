import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '../components/Button';
import { AppView } from './types';

interface CareersProps {
  onChangeView: (view: AppView) => void;
}

const JobCard: React.FC<{ title: string; department: string; location: string }> = ({ title, department, location }) => (
  <div className="bg-background-card border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-600 transition-colors group cursor-pointer">
    <div>
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{title}</h3>
      <div className="flex items-center gap-4 text-sm text-text-muted">
        <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{department}</span>
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</span>
      </div>
    </div>
    <Button variant="outline" className="sm:w-auto">Apply Now</Button>
  </div>
);

export const Careers: React.FC<CareersProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Join the Revolution</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
            We're building the future of career development. Work on cutting-edge AI challenges and help millions of people succeed.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-white">
            <span className="flex flex-col items-center"><span className="text-3xl font-bold text-primary mb-1">100%</span> Remote First</span>
            <span className="flex flex-col items-center"><span className="text-3xl font-bold text-primary mb-1">4.9/5</span> Glassdoor</span>
            <span className="flex flex-col items-center"><span className="text-3xl font-bold text-primary mb-1">$50M+</span> Funding</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
          
          <JobCard title="Senior Machine Learning Engineer" department="Engineering" location="Remote (US/EU)" />
          <JobCard title="Full Stack Developer" department="Engineering" location="Remote (Global)" />
          <JobCard title="Product Designer" department="Design" location="Remote (US)" />
          <JobCard title="Developer Advocate" department="Marketing" location="London, UK" />
          <JobCard title="Customer Success Manager" department="Sales" location="New York, NY" />
        </div>

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Don't see your role?</h3>
          <p className="text-text-muted mb-6">We are always looking for exceptional talent. Send us your resume.</p>
          <Button variant="secondary">Email Us</Button>
        </div>
      </div>
    </div>
  );
};