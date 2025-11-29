import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '../components/Button';
import { AppView } from './types';

interface PricingProps {
  onChangeView: (view: AppView) => void;
}

const PricingCard: React.FC<{ 
  title: string; 
  price: string; 
  features: string[]; 
  notIncluded?: string[];
  recommended?: boolean;
  onSignup: () => void;
}> = ({ title, price, features, notIncluded = [], recommended = false, onSignup }) => (
  <div className={`relative p-8 rounded-2xl border flex flex-col h-full ${recommended ? 'bg-zinc-900 border-primary shadow-2xl shadow-primary/10' : 'bg-background-card border-zinc-800'}`}>
    {recommended && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-bold text-white">{price}</span>
      {price !== 'Free' && <span className="text-text-muted">/month</span>}
    </div>
    
    <div className="space-y-4 mb-8 flex-1">
      {features.map((feature, i) => (
        <div key={i} className="flex items-start gap-3">
          <Check className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-zinc-300 text-sm">{feature}</span>
        </div>
      ))}
      {notIncluded.map((feature, i) => (
        <div key={i} className="flex items-start gap-3 text-zinc-600">
          <X className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>

    <Button 
      onClick={onSignup}
      variant={recommended ? 'primary' : 'outline'}
      fullWidth
    >
      {price === 'Free' ? 'Get Started' : 'Subscribe Now'}
    </Button>
  </div>
);

export const Pricing: React.FC<PricingProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Choose the plan that fits your interview preparation needs. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Starter"
            price="Free"
            features={[
              "3 AI Interview Sessions / month",
              "Basic Performance Reports",
              "Standard Question Bank",
              "Community Support"
            ]}
            notIncluded={[
              "Advanced Analytics",
              "Custom Scenarios",
              "Unlimited History"
            ]}
            onSignup={() => onChangeView(AppView.SIGNUP)}
          />
          <PricingCard
            title="Pro"
            price="$19"
            recommended={true}
            features={[
              "Unlimited AI Sessions",
              "Detailed Voice & Tone Analysis",
              "Full Question Bank Access",
              "Priority Support",
              "Custom Interview Config",
              "PDF Report Exports"
            ]}
            onSignup={() => onChangeView(AppView.SIGNUP)}
          />
          <PricingCard
            title="Team"
            price="$49"
            features={[
              "Everything in Pro",
              "Team Dashboard",
              "Admin Controls",
              "Candidate Assessment Mode",
              "API Access",
              "Dedicated Account Manager"
            ]}
            onSignup={() => onChangeView(AppView.ENTERPRISE)}
          />
        </div>
      </div>
    </div>
  );
};