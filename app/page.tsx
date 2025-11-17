"use client"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import BackgroundParticles from "@/components/BackgroundParticles"
import ResumeDialog from "@/components/ResumeDialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Home() {
  const [time, setTime] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDiscSpinning, setIsDiscSpinning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isDiscSpinning) {
        audioRef.current.currentTime = 5; // Start from 7th second
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 7; // Reset to 7th second when stopped
      }
    }
  }, [isDiscSpinning]);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BackgroundParticles />
      <div className="min-h-screen bg-transparent">
        {/* Header Navigation */}
        <header className="w-full p-6 md:p-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-4xl font-bold" style={{ fontFamily: 'Urbanosta, sans-serif', color: ' #fde047' }}>
              Sagnik Chowdhury
            </Link>
            <nav className="flex items-center gap-3">
              <Link href="/projects">
                <button className="ui-btn">
                  <span>Work Life</span>
                </button>
              </Link>
              <ResumeDialog>
                <button className="ui-btn">
                  <span>Resume</span>
                </button>
              </ResumeDialog>
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div className="ml-4 cursor-pointer" onClick={() => setIsDiscSpinning(!isDiscSpinning)}>
                      <div className="relative">
                        <svg
                          width="64"
                          height="64"
                          viewBox="0 0 128 128"
                          className={`border-2 rounded-full shadow-md border-zinc-400 transition-all duration-300 ${isDiscSpinning ? 'animate-spin-slow' : ''}`}
                        >
                          <rect width="128" height="128" fill="black"></rect>
                          <circle cx="30" cy="20" r="2" fill="white"></circle>
                          <circle cx="50" cy="30" r="2" fill="white"></circle>
                          <circle cx="60" cy="10" r="2" fill="white"></circle>
                          <circle cx="80" cy="40" r="2" fill="white"></circle>
                          <circle cx="100" cy="20" r="2" fill="white"></circle>
                          <circle cx="120" cy="50" r="2" fill="white"></circle>
                          <circle cx="90" cy="30" r="10" fill="white" fillOpacity="0.5"></circle>
                          <circle cx="90" cy="30" r="8" fill="white"></circle>
                          <path d="M0 128 Q32 64 64 128 T128 128" fill="purple" stroke="black" strokeWidth="1"></path>
                          <path d="M0 128 Q32 48 64 128 T128 128" fill="mediumpurple" stroke="black" strokeWidth="1"></path>
                          <path d="M0 128 Q32 32 64 128 T128 128" fill="rebeccapurple" stroke="black" strokeWidth="1"></path>
                          <path d="M0 128 Q16 64 32 128 T64 128" fill="purple" stroke="black" strokeWidth="1"></path>
                          <path d="M64 128 Q80 64 96 128 T128 128" fill="mediumpurple" stroke="black" strokeWidth="1"></path>
                        </svg>
                        <div className="absolute top-6 left-6 w-4 h-4 bg-white border-2 rounded-full shadow-sm border-zinc-400"></div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sure!! Why not</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 md:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div>
                
              </div>

              <div className="space-y-3 text-white text-xl" style={{ fontFamily: 'Satoshi Medium, sans-serif' }}>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>I'm a <strong className="text-white">23 y/o Full-Stack Developer</strong> from Kolkata, India</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Crafting intuitive, responsive web and mobile apps with a focus on clean design and seamless UX.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>I have experience of working with clients and have provided solutions to their problems.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>I am actively developing <Link href="https://plate-liard.vercel.app/" target="_blank" className="inline-block cursor-pointer"><strong className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">P.L.A.T.E</strong></Link> (Personalized learning and Assistance for Taste Enhancement)</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span className="flex items-center gap-2 flex-wrap">
                    <span>When I'm not building products, you'll usually find me:</span>
                    <TooltipProvider>
                      <div className="flex items-center -space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="hover:scale-110 transition-transform duration-200 z-[1] relative">
                              <Image 
                                src="/icons/basketball.svg" 
                                alt="Basketball" 
                                width={28} 
                                height={28}
                                className="drop-shadow-sm"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Hooping </p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="hover:scale-110 transition-transform duration-200 z-[2] relative">
                              <Image 
                                src="/icons/soccer-ball.svg" 
                                alt="Football" 
                                width={28} 
                                height={28}
                                className="drop-shadow-sm"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p> Defending like my life depends on it</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="hover:scale-110 transition-transform duration-200 z-[3] relative">
                              <Image 
                                src="/icons/rekord.svg" 
                                alt="Rekordbox" 
                                width={28} 
                                height={28}
                                className="drop-shadow-sm"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Learning to DJ on Rekordbox</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="hover:scale-110 transition-transform duration-200 z-[4] relative">
                              <Image 
                                src="/icons/CSicon.svg" 
                                alt="CS2" 
                                width={28} 
                                height={28}
                                className="drop-shadow-sm"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Queued up in CS2</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="hover:scale-110 transition-transform duration-200 z-[5] relative">
                              <Image 
                                src="/icons/FIFA.svg" 
                                alt="FIFA" 
                                width={28} 
                                height={28}
                                className="drop-shadow-sm"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Thrashing people in FIFA</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                    
                  </span>
                </p>
                
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Link href="/projects">
                  <button className="btn-shake btn-shine">
                    <span>VIEW PROJECTS</span>
                  </button>
                </Link>
                <a href="/resume.pdf" download="Sagnik_Chowdhury_Resume.pdf">
                  <button className="btn-shake btn-shine">
                    <span>DOWNLOAD</span>
                  </button>
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 pt-2">
                <Link href="https://www.linkedin.com/in/sagnik-chowdhury-252035251/" target="_blank" className="social-button" aria-label="LinkedIn">
                  <div className="button-box">
                    <div className="button-elem">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="button-elem">
                      <Linkedin className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
                <Link href="https://github.com/asapSAGNIK" target="_blank" className="social-button" aria-label="GitHub">
                  <div className="button-box">
                    <div className="button-elem">
                      <Github className="w-5 h-5" />
                    </div>
                    <div className="button-elem">
                      <Github className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
                <a href="mailto:sagnikwork20@gmail.com" className="social-button" aria-label="Email">
                  <div className="button-box">
                    <div className="button-elem">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="button-elem">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column - Profile Picture */}
            <div className="flex justify-center lg:justify-end">
              <div 
                className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-2xl shadow-green-500/20 group"
              >
                <Image
                  src="/prf.jpg"
                  alt="Sagnik Chowdhury"
                  fill
                  className="object-cover image-reveal group-hover:scale-105"
                  priority
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-6 md:px-8 py-4 border-t border-border/40">
          <div className="max-w-7xl mx-auto flex justify-between text-sm text-muted-foreground" style={{ fontFamily: 'Satoshi Medium, sans-serif' }}>
            <span>© 2025 Sagnik Chowdhury</span>
            <span>Kolkata | {time}</span>
          </div>
        </footer>

        {/* Hidden audio element for music playback */}
        <audio
          ref={audioRef}
          src="/gtatheme.mp3"
          loop
          preload="none"
        />
      </div>
    </>
  )
}
