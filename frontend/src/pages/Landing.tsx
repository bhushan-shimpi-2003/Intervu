import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  BarChart2, 
  Cpu, 
  ArrowRight, 
  CheckCircle, 
  PlayCircle, 
  Users, 
  Shield 
} from 'lucide-react';
import { Button } from '../components/Button';
import { AppView } from './types';

// Fix: Cast motion.div to any to avoid type errors
const MotionDiv = motion.div as any;

interface LandingProps {
  onChangeView: (view: AppView) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; delay: number }> = ({ icon, title, description, delay }) => (
  <MotionDiv 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 rounded-2xl bg-background-card border border-zinc-800 hover:border-primary/50 transition-all duration-300 group"
  >
    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <div className="text-primary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2 font-display">{title}</h3>
    <p className="text-text-muted leading-relaxed">{description}</p>
  </MotionDiv>
);

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex items-start gap-4 relative z-10">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-primary font-display">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ quote: string; author: string; role: string; i: number }> = ({ quote, author, role, i }) => (
  <MotionDiv 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: i * 0.1 }}
    className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
  >
    <div className="flex items-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-text-muted mb-6 leading-relaxed italic">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} />
      </div>
      <div>
        <div className="font-bold text-white text-sm">{author}</div>
        <div className="text-xs text-text-muted">{role}</div>
      </div>
    </div>
  </MotionDiv>
);

export const Landing: React.FC<LandingProps> = ({ onChangeView }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-text-main font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <span className="text-xl font-bold font-display text-white">InterVu AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-text-muted hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-text-muted hover:text-white transition-colors">How it Works</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-text-muted hover:text-white transition-colors">Testimonials</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onChangeView(AppView.LOGIN)}
              className="text-sm font-medium text-white hover:text-primary transition-colors hidden sm:block"
            >
              Log In
            </button>
            <Button 
              onClick={() => onChangeView(AppView.SIGNUP)}
              variant="primary" 
              className="py-2 px-4 h-10 text-sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <MotionDiv 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Interview Coach
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
              Master Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Tech Interview</span>
            </h1>
            <p className="text-lg text-text-muted mb-8 max-w-xl leading-relaxed">
              Practice real technical interviews with voice analysis, instant feedback, and personalized improvement plans generated by our advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => onChangeView(AppView.SIGNUP)} className="h-14 px-8 text-lg" icon={<ArrowRight className="w-5 h-5" />}>
                Start Practicing Free
              </Button>
              <Button onClick={() => {}} variant="secondary" className="h-14 px-8 text-lg" icon={<PlayCircle className="w-5 h-5" />}>
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-text-muted">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-background-dark flex items-center justify-center text-xs overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ developers</p>
            </div>
          </MotionDiv>

          <MotionDiv 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-background-card border border-zinc-800 p-2 shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2940" 
                alt="Dashboard Preview" 
                className="rounded-xl border border-zinc-800/50 w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Floating Cards */}
              <MotionDiv 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 top-10 bg-background-surface border border-zinc-700 p-4 rounded-xl shadow-xl max-w-[200px] hidden md:block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Confidence Score</div>
                    <div className="font-bold text-white">92%</div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[92%]"></div>
                </div>
              </MotionDiv>

              <MotionDiv 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 bottom-10 bg-background-surface border border-zinc-700 p-4 rounded-xl shadow-xl max-w-[200px] hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Status</div>
                    <div className="font-bold text-white">Passed</div>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-zinc-800 bg-background-card/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white font-display mb-1">50k+</div>
            <div className="text-sm text-text-muted">Interviews Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white font-display mb-1">120+</div>
            <div className="text-sm text-text-muted">Tech Roles Supported</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white font-display mb-1">95%</div>
            <div className="text-sm text-text-muted">User Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white font-display mb-1">24/7</div>
            <div className="text-sm text-text-muted">AI Availability</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">Why Choose InterVu AI?</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">We combine advanced large language models with speech analysis to provide the most realistic interview experience possible.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Mic />}
              title="Voice-Based Interactions"
              description="Speak naturally just like in a real interview. Our AI analyzes your tone, pace, and clarity in real-time."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Cpu />}
              title="Technical Depth"
              description="From System Design to Algorithms, get challenged with role-specific questions curated from top tech companies."
              delay={0.2}
            />
            <FeatureCard 
              icon={<BarChart2 />}
              title="Actionable Feedback"
              description="Receive detailed performance reports highlighting your strengths and areas for improvement instantly."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Users />}
              title="Role Customization"
              description="Tailor your practice for specific roles like Backend, Frontend, DevOps, or Fullstack Engineering."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Shield />}
              title="Private & Secure"
              description="Your practice sessions are private. We prioritize your data security and privacy above all."
              delay={0.5}
            />
            <FeatureCard 
              icon={<CheckCircle />}
              title="Progress Tracking"
              description="Monitor your improvement over time with comprehensive dashboards and history tracking."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 bg-background-card border-y border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-6">Your Path to Interview Success</h2>
            <div className="space-y-8 relative">
              <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-zinc-800 -z-0"></div>
              <StepCard 
                number="1" 
                title="Configure Your Session" 
                description="Select your target role, difficulty level, and specific topics you want to practice." 
              />
              <StepCard 
                number="2" 
                title="Answer in Real-time" 
                description="Respond to AI-generated questions using your voice. Treat it like the real thing." 
              />
              <StepCard 
                number="3" 
                title="Get Instant Analysis" 
                description="Review your transcript, listen to playback, and analyze detailed scores on your performance." 
              />
            </div>
            <div className="mt-10">
              <Button onClick={() => onChangeView(AppView.SIGNUP)} icon={<ArrowRight className="w-4 h-4" />}>
                Start Your First Session
              </Button>
            </div>
          </div>
          <div className="relative h-[500px] bg-zinc-900 rounded-2xl border border-zinc-800 p-4 shadow-2xl flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,194,186,0.1),transparent_50%)]"></div>
            {/* Abstract visual representing the AI process */}
             <div className="relative w-64 h-64">
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border-2 border-primary/40 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                <div className="absolute inset-8 border-2 border-primary/60 rounded-full animate-[spin_6s_linear_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Mic className="w-16 h-16 text-primary animate-pulse" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-background-dark relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">Loved by Developers</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">See what our community has to say about their experience with InterVu AI.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
             <TestimonialCard 
               quote="This tool completely changed how I prep. The voice analysis picked up on nervous ticks I didn't know I had."
               author="Sarah Chen"
               role="Senior Frontend Dev @ Google"
               i={1}
             />
             <TestimonialCard 
               quote="The technical questions are spot on. It felt exactly like my actual interview at Amazon. Highly recommend!"
               author="Michael Ross"
               role="Backend Engineer @ Amazon"
               i={2}
             />
             <TestimonialCard 
               quote="I used to freeze up during system design rounds. InterVu gave me the confidence to structure my thoughts clearly."
               author="David Kim"
               role="Fullstack Developer @ Startup"
               i={3}
             />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
            Join thousands of engineers who are landing their dream jobs with InterVu AI. Start practicing today for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button onClick={() => onChangeView(AppView.SIGNUP)} className="h-14 px-10 text-lg shadow-xl shadow-primary/20">
               Get Started for Free
             </Button>
          </div>
          <p className="mt-6 text-sm text-text-muted">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* Redesigned Footer matching QLOAX reference style */}
      <footer className="bg-black pt-20 pb-10 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Newsletter - Spans 5 columns to push others right */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-4xl font-bold font-display text-white tracking-widest">INTERVU<span className="text-primary font-light">AI</span></span>
            </div>
            <p className="text-zinc-400 mb-8 max-w-sm leading-relaxed text-sm">
              The unseen intelligence that powers the future of interview preparation and career growth.
            </p>

            <div className="w-full max-w-sm">
              <label className="text-xs font-bold text-white uppercase tracking-widest mb-4 block">
                Subscribe to our newsletter
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-4 pl-6 pr-14 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all text-sm"
                />
                <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-background-dark hover:brightness-110 transition-transform">
                   <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Company - Spans 2 columns, starting at 8 */}
          <div className="lg:col-span-2 lg:col-start-8">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Company</h3>
             <ul className="space-y-4 text-zinc-400 text-sm">
                <li><button onClick={() => onChangeView(AppView.ABOUT)} className="hover:text-white transition-colors text-left">About InterVu</button></li>
                <li><button onClick={() => onChangeView(AppView.ABOUT)} className="hover:text-white transition-colors text-left">Vision & Philosophy</button></li>
                <li><button onClick={() => onChangeView(AppView.BLOG)} className="hover:text-white transition-colors text-left">Blog</button></li>
                <li><button onClick={() => onChangeView(AppView.CONTACT)} className="hover:text-white transition-colors text-left">Contact</button></li>
             </ul>
          </div>

          {/* Global Presence - Spans 3 columns, starting at 10 */}
          <div className="lg:col-span-3 lg:col-start-10">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Global Presence</h3>
              <div className="text-zinc-400 text-sm space-y-4 leading-relaxed">
                 <p>
                   <strong className="text-white block mb-1">San Francisco (HQ):</strong>
                   InterVu AI Labs, 101 Tech Plaza, Suite 400, <br /> San Francisco, CA 94105.
                 </p>
                 <p>
                   <strong className="text-white">Phone:</strong> +1 (555) 123-4567
                 </p>
              </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
            <p>© 2024 InterVu AI. All rights reserved.</p>
            <div className="flex gap-8">
              <button onClick={() => onChangeView(AppView.PRIVACY)} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => onChangeView(AppView.TERMS)} className="hover:text-white transition-colors">Terms of Service</button>
            </div>
        </div>
      </footer>
    </div>
  );
};