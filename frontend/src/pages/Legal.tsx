import React from 'react';
import { AppView } from './types';

interface LegalProps {
  view: 'PRIVACY' | 'TERMS';
  onChangeView: (view: AppView) => void;
}

const PrivacyContent = () => (
  <div className="space-y-6 text-text-muted">
    <p>Last updated: October 26, 2023</p>
    <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
    
    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Collecting and Using Your Personal Data</h2>
    <h3 className="text-xl font-semibold text-white mb-2">Types of Data Collected</h3>
    <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Email address</li>
      <li>First name and last name</li>
      <li>Usage Data</li>
      <li>Voice Recordings (for analysis purposes only)</li>
    </ul>

    <h3 className="text-xl font-semibold text-white mt-6 mb-2">Voice Data Usage</h3>
    <p>We process your voice data solely for the purpose of generating interview performance analytics. Data is encrypted at rest and in transit. We do not sell your voice data to third parties.</p>
  </div>
);

const TermsContent = () => (
  <div className="space-y-6 text-text-muted">
    <p>Last updated: October 26, 2023</p>
    <p>Please read these terms and conditions carefully before using Our Service.</p>
    
    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Interpretation and Definitions</h2>
    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
    
    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Acknowledgment</h2>
    <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
    
    <h2 className="text-2xl font-bold text-white mt-8 mb-4">User Accounts</h2>
    <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>
    
    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Content</h2>
    <p>Our Service allows You to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that You post to the Service.</p>
  </div>
);

export const Legal: React.FC<LegalProps> = ({ view, onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-display text-white mb-8">
          {view === 'PRIVACY' ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <div className="bg-background-card border border-zinc-800 rounded-2xl p-8 md:p-12 leading-relaxed">
          {view === 'PRIVACY' ? <PrivacyContent /> : <TermsContent />}
        </div>
      </div>
    </div>
  );
};