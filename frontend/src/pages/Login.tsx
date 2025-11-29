import React from 'react';
import { Mail, Lock, Eye, EyeOff, Github, Linkedin, Chrome } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AppView } from './types';

interface LoginProps {
  onChangeView: (view: AppView) => void;
}

export const Login: React.FC<LoginProps> = ({ onChangeView }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeView(AppView.DASHBOARD);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 relative bg-background-dark">
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 h-full w-full bg-background-dark bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      {/* Radial Gradient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="bg-background-card/50 backdrop-blur-xl border border-zinc-800 p-8 sm:p-10 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-display text-white mb-2">InterVu AI</h1>
            <h2 className="text-xl font-bold text-white mb-1">Welcome Back</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address" 
              placeholder="Enter your email address" 
              type="email" 
              className="bg-zinc-900/50"
            />
            <Input 
              label="Password" 
              placeholder="Enter your password" 
              type={showPassword ? "text" : "password"} 
              className="bg-zinc-900/50"
              rightElement={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-text-muted hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />
            
            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary hover:text-primary-hover hover:underline transition-colors">
                Forgot password?
              </button>
            </div>

            <Button type="submit" fullWidth className="h-12 text-lg font-bold">
              Log In
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-text-muted">or continue with</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 group">
                <Chrome className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 group">
                <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 group">
                <Github className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-text-muted">
            Don't have an account?{' '}
            <button onClick={() => onChangeView(AppView.SIGNUP)} className="font-medium text-primary hover:underline hover:text-primary-hover">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};