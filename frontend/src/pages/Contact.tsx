import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AppView } from './types';

interface ContactProps {
  onChangeView: (view: AppView) => void;
}

export const Contact: React.FC<ContactProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Get in Touch</h1>
          <p className="text-lg text-text-muted mb-12">
            Have questions about InterVu AI? We're here to help. Our team typically responds within 24 hours.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                <p className="text-text-muted">support@intervu.ai</p>
                <p className="text-text-muted">partnerships@intervu.ai</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Office</h3>
                <p className="text-text-muted">101 Tech Plaza, Suite 400</p>
                <p className="text-text-muted">San Francisco, CA 94105</p>
              </div>
            </div>
            
             <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
                <p className="text-text-muted">+1 (555) 123-4567</p>
                <p className="text-text-muted">Mon-Fri from 9am to 6pm PST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background-card border border-zinc-800 rounded-2xl p-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <div className="grid grid-cols-2 gap-6">
              <Input label="First Name" placeholder="Jane" />
              <Input label="Last Name" placeholder="Doe" />
            </div>
            <Input label="Email" type="email" placeholder="jane@example.com" />
            <div className="space-y-2">
               <label className="block text-sm font-medium text-text-muted mb-2">Message</label>
               <textarea 
                  className="w-full bg-background-card border border-zinc-800 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 min-h-[160px]"
                  placeholder="How can we help you?"
               />
            </div>
            <Button type="submit" fullWidth icon={<Send className="w-4 h-4" />}>Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};