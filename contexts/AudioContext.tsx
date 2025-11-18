"use client";

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('musicState');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      const audio = new Audio('/gtatheme.mp3');
      audio.loop = true;
      audio.preload = 'none';
      audioRef.current = audio;

      // Set initial state
      if (isPlaying) {
        audio.currentTime = 5;
        audio.play().catch(() => {
          // Handle autoplay restrictions
        });
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('musicState', JSON.stringify(isPlaying));
    }
  }, [isPlaying]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.currentTime = 5; // Start from 7th second
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 7; // Reset to 7th second when stopped
      }
    }
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying(prev => !prev);
  };

  const value: AudioContextType = {
    isPlaying,
    toggleAudio,
    audioRef,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
