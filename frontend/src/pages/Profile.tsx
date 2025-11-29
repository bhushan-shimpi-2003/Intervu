
import React, { useState, useRef } from 'react';
import { User, Mail, Briefcase, Camera, Save, Shield, Bell } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AppView } from './types';

interface ProfileProps {
  onChangeView: (view: AppView) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onChangeView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">Profile Settings</h1>
        <p className="text-text-muted">Manage your account information and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - User Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-background-card border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-blue-600/20"></div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />

            <div 
              className="relative mt-8 mb-4 group cursor-pointer"
              onClick={handleAvatarClick}
            >
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-background-card flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-zinc-500" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-1">Alex Thompson</h2>
            <p className="text-text-muted text-sm mb-4">Full Stack Developer</p>
            
            <div className="w-full pt-6 border-t border-zinc-800 grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-white font-display">24</div>
                <div className="text-xs text-text-muted uppercase tracking-wider">Interviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-display">86%</div>
                <div className="text-xs text-text-muted uppercase tracking-wider">Avg Score</div>
              </div>
            </div>
          </div>

          <div className="bg-background-card border border-zinc-800 rounded-2xl p-2">
            <nav className="flex flex-col">
              <button className="flex items-center gap-3 px-4 py-3 bg-zinc-800/50 rounded-lg text-white font-medium">
                <User className="w-4 h-4" /> Personal Info
              </button>
              <button className="flex items-center gap-3 px-4 py-3 text-text-muted hover:text-white hover:bg-zinc-800/30 rounded-lg transition-colors">
                <Bell className="w-4 h-4" /> Notifications
              </button>
              <button className="flex items-center gap-3 px-4 py-3 text-text-muted hover:text-white hover:bg-zinc-800/30 rounded-lg transition-colors">
                <Shield className="w-4 h-4" /> Security
              </button>
            </nav>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-8">
          <div className="bg-background-card border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input 
                label="First Name" 
                defaultValue="Alex"
                className="bg-zinc-900"
              />
              <Input 
                label="Last Name" 
                defaultValue="Thompson"
              />
            </div>

            <div className="mb-6">
              <Input 
                label="Email Address" 
                defaultValue="alex.thompson@example.com"
                icon={<Mail className="w-4 h-4" />}
                type="email"
              />
            </div>

            <div className="mb-8">
              <Input 
                label="Job Title" 
                defaultValue="Full Stack Developer"
                icon={<Briefcase className="w-4 h-4" />}
              />
            </div>

            <div className="mb-8">
               <label className="block text-sm font-medium text-text-muted mb-2">Bio</label>
               <textarea 
                  className="w-full bg-background-dark border border-zinc-800 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 min-h-[120px]"
                  defaultValue="Passionate developer looking to transition into a Senior role. Focusing on system design and leadership skills."
               />
            </div>

            <div className="pt-6 border-t border-zinc-800 flex justify-end">
              <Button onClick={handleSave} loading={isLoading} icon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          </div>

          <div className="mt-8 bg-background-card border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Preferences</h3>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-white">Email Notifications</h4>
                        <p className="text-sm text-text-muted">Receive weekly progress reports and tips.</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-primary cursor-pointer">
                        <span className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow"></span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-white">Public Profile</h4>
                        <p className="text-sm text-text-muted">Allow recruiters to see your achievements.</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-zinc-700 cursor-pointer">
                        <span className="absolute left-1 top-1 bg-zinc-400 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow"></span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
