import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AppView } from './types';

interface BlogProps {
  onChangeView: (view: AppView) => void;
}

const BlogPost: React.FC<{ title: string; excerpt: string; date: string; category: string; img: string }> = ({ title, excerpt, date, category, img }) => (
  <div className="group cursor-pointer flex flex-col h-full">
    <div className="rounded-xl overflow-hidden mb-4 border border-zinc-800">
      <img src={img} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="flex items-center gap-3 mb-2 text-xs">
      <span className="font-bold text-primary uppercase tracking-wide">{category}</span>
      <span className="text-zinc-600">•</span>
      <span className="text-text-muted">{date}</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">{excerpt}</p>
    <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
      Read Article <ArrowRight className="w-4 h-4" />
    </div>
  </div>
);

export const Blog: React.FC<BlogProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">InterVu Insights</h1>
          <p className="text-text-muted text-lg">Tips, trends, and guides for mastering your tech career.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <BlogPost 
            title="How to Ace the System Design Interview" 
            excerpt="Strategies for breaking down complex distributed system problems and communicating your thought process effectively."
            date="Oct 24, 2023"
            category="Interview Tips"
            img="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
          />
          <BlogPost 
            title="The STAR Method Explained" 
            excerpt="A comprehensive guide to structuring behavioral interview answers that hiring managers love."
            date="Oct 18, 2023"
            category="Soft Skills"
            img="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
          />
          <BlogPost 
            title="State of Tech Hiring 2024" 
            excerpt="We analyzed data from over 50,000 interviews to predict the most in-demand skills for next year."
            date="Sep 30, 2023"
            category="Industry Trends"
            img="https://images.unsplash.com/photo-1504384308090-c54be3852f92?auto=format&fit=crop&q=80&w=800"
          />
           <BlogPost 
            title="Mastering React Hooks" 
            excerpt="Deep dive into useEffect, useMemo, and creating custom hooks for cleaner frontend code."
            date="Sep 12, 2023"
            category="Engineering"
            img="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
          />
          <BlogPost 
            title="Negotiating Your Salary" 
            excerpt="Proven tactics to maximize your offer package without risking the relationship."
            date="Aug 28, 2023"
            category="Career Growth"
            img="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
          />
          <BlogPost 
            title="Overcoming Imposter Syndrome" 
            excerpt="Practical mental models to build confidence and perform at your best under pressure."
            date="Aug 15, 2023"
            category="Wellness"
            img="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800"
          />
        </div>
      </div>
    </div>
  );
};