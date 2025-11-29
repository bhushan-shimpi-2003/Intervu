import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '../components/Button';
import { AppView } from './types';
import { MOCK_INTERVIEW_QUESTIONS } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

// Fix: Cast motion.div to any to avoid type errors
const MotionDiv = motion.div as any;

interface ActiveSessionProps {
  onChangeView: (view: AppView) => void;
}

const VoiceVisualizer: React.FC<{ isRecording: boolean }> = ({ isRecording }) => {
  const [frequencyData, setFrequencyData] = useState<number[]>(new Array(40).fill(5));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        // Create AudioContext
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass();
        audioContextRef.current = audioContext;
        
        // Create Analyser
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // 128 bins
        analyser.smoothingTimeConstant = 0.5;
        analyserRef.current = analyser;
        
        // Create Source
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        sourceRef.current = source;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const update = () => {
          if (!analyserRef.current) return;
          
          analyserRef.current.getByteFrequencyData(dataArray);
          
          // We'll take the first 40 bins which cover the most relevant voice frequencies
          // and spread them out visually.
          const relevantData = Array.from(dataArray).slice(0, 40);
          
          // Map 0-255 range to pixel height (min 5px, max ~64px)
          const scaledData = relevantData.map(val => {
            const normalized = val / 255;
            // Apply a curve to make quieter sounds more visible
            const curved = Math.pow(normalized, 0.8);
            return Math.max(5, curved * 80);
          });
          
          setFrequencyData(scaledData);
          rafIdRef.current = requestAnimationFrame(update);
        };
        
        update();
      } catch (err) {
        console.error("Error accessing microphone:", err);
        // Fallback or error state could be handled here
      }
    };

    const stopAudio = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      
      if (analyserRef.current) {
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Reset visuals
      setFrequencyData(new Array(40).fill(5));
    };

    if (isRecording) {
      startAudio();
    } else {
      stopAudio();
    }

    return () => {
      stopAudio();
    };
  }, [isRecording]);

  return (
    <div className="flex items-center justify-center gap-1 h-32 w-full max-w-2xl mx-auto px-4 overflow-hidden">
      {frequencyData.map((height, i) => (
        <MotionDiv
          key={i}
          animate={{ height }}
          transition={{ 
            type: 'tween', 
            ease: 'linear', 
            duration: 0.05 // Fast updates for responsiveness
          }}
          className={`w-1.5 rounded-full ${isRecording ? 'bg-primary' : 'bg-zinc-800'}`}
          style={{ minHeight: '4px' }}
        />
      ))}
    </div>
  );
};

export const ActiveSession: React.FC<ActiveSessionProps> = ({ onChangeView }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  const totalQuestions = MOCK_INTERVIEW_QUESTIONS.length;
  // Fix: Use any for timer ref to handle platform differences and avoid NodeJS namespace errors
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setHasAnswered(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setHasAnswered(false);
      setElapsedTime(0);
    } else {
      onChangeView(AppView.SUMMARY);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header / Progress */}
      <header className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Fullstack Interview</h2>
          <p className="text-sm text-text-muted">Part 1: Technical Knowledge</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-primary mb-2">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <MotionDiv 
              className="h-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <MotionDiv
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white leading-tight mb-8">
              {MOCK_INTERVIEW_QUESTIONS[currentQuestionIndex]}
            </h1>
          </MotionDiv>
        </AnimatePresence>

        {/* Visualizer */}
        <div className="w-full mb-12">
          <VoiceVisualizer isRecording={isRecording} />
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 text-xl font-mono mb-8 transition-colors duration-300 ${isRecording ? 'text-red-400' : 'text-zinc-500'}`}>
          <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-400 animate-pulse' : 'bg-zinc-700'}`}></div>
          {formatTime(elapsedTime)}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {!hasAnswered ? (
             <button
               onClick={toggleRecording}
               className={`
                 relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300
                 ${isRecording 
                   ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 ring-2 ring-red-500 ring-offset-4 ring-offset-background-dark' 
                   : 'bg-primary text-background-dark hover:scale-105 shadow-lg shadow-primary/30'}
               `}
             >
               {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
             </button>
          ) : (
            <div className="flex gap-4">
               <Button 
                  onClick={() => { setHasAnswered(false); setElapsedTime(0); }} 
                  variant="secondary" 
                  icon={<RefreshCw className="w-4 h-4" />}
               >
                 Re-record
               </Button>
               <Button 
                  onClick={handleNext} 
                  variant="primary" 
                  icon={<ChevronRight className="w-4 h-4" />}
               >
                 {currentQuestionIndex === totalQuestions - 1 ? 'Finish Interview' : 'Next Question'}
               </Button>
            </div>
          )}
        </div>
        
        <p className="mt-8 text-sm text-text-muted">
          {isRecording ? "Listening... Speak clearly into your microphone." : "Click the microphone to start your answer."}
        </p>

      </div>
    </div>
  );
};