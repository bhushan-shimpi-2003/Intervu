import React from 'react';
import { Building2, ShieldCheck, Users, Zap, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AppView } from './types';

interface EnterpriseProps {
  onChangeView: (view: AppView) => void;
}

export const Enterprise: React.FC<EnterpriseProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            For Large Teams & Organizations
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6 leading-tight">
            Scale Your Hiring <br/> with <span className="text-primary">AI Consistency</span>
          </h1>
          <p className="text-lg text-text-muted mb-8 leading-relaxed">
            InterVu Enterprise empowers hiring teams to standardize technical assessments, reduce bias, and screen candidates faster with our advanced AI infrastructure.
          </p>
          
          <div className="space-y-6 mb-10">
            {[
              "Custom Role & Question Modeling",
              "SSO & Advanced Security Compliance",
              "Centralized Candidate Analytics",
              "ATS Integration (Greenhouse, Lever, etc.)"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background-card border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">Book a Demo</h3>
          <p className="text-text-muted mb-6">See how InterVu can transform your hiring pipeline.</p>
          
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your interest! We'll be in touch."); }}>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input type="email" placeholder="Work Email" />
            <Input placeholder="Company Name" icon={<Building2 className="w-4 h-4" />} />
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Team Size</label>
              <select className="w-full bg-background-card border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option>1-50 employees</option>
                <option>51-200 employees</option>
                <option>201-1000 employees</option>
                <option>1000+ employees</option>
              </select>
            </div>
            <Button type="submit" fullWidth className="h-12 mt-2">Schedule Demo</Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Trusted Security & Compliance</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">SOC 2 Type II</h3>
            <p className="text-text-muted">Enterprise-grade security standards for data protection.</p>
          </div>
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">GDPR Compliant</h3>
            <p className="text-text-muted">Full compliance with European data privacy regulations.</p>
          </div>
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
            <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">99.9% Uptime SLA</h3>
            <p className="text-text-muted">Guaranteed reliability for your mission-critical hiring.</p>
          </div>
        </div>
      </div>
    </div>
  );
};