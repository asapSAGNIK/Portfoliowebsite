"use client"
import { Button } from "@/components/ui/button"
import { useAudio } from '../contexts/AudioContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import BackgroundParticles from "@/components/BackgroundParticles"
import ResumeDialog from "@/components/ResumeDialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Home() {
  const [time, setTime] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const { isPlaying, toggleAudio } = useAudio();

  const workExperience = [
    {
      title: "Skyline Properties",
      company: "Skyline Properties",
      type: "Freelance",
      date: "May 2025",
      description: "A fully responsive real estate website with dynamic property listings and search capability. I implemented the UI architecture, optimized load times, and ensured smooth navigation across devices.",
      website: "https://skyline-properties-portfolio.vercel.app/",
    },
    {
      title: "Sunder Garments",
      company: "Sunder Garments",
      type: "Freelance",
      date: "August 2025",
      description: "An end-to-end e-commerce platform supporting web and mobile storefronts with cart, checkout, and order management. I engineered the full workflow from product listing to secure transactions and deployment.",
      website: "https://www.sundergarments.in/",
    },
  ];
  
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


  // Typing animation effect
  useEffect(() => {
    const fullText = "Sagnik Chowdhury";
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, 100); // Adjust typing speed here
      }
    };

    // Start typing animation after a brief delay
    const startTyping = setTimeout(() => {
      typeText();
    }, 500);

    return () => clearTimeout(startTyping);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Blink every 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full" style={{ backgroundColor: isPlaying ? 'transparent' : '#FFF8DE' }} />
      <BackgroundParticles visible={isPlaying} />
      <div className="min-h-screen bg-transparent">
        {/* Header Navigation */}
        <header className="w-full pt-6 md:pt-8">
          <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
            <Link href="/" className="text-4xl font-bold" style={{ fontFamily: 'Hoover, sans-serif', color: isPlaying ? ' #fde047' : '#3A5FFF' }}>
              {typedText}
              <span style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
            </Link>
            <nav className="flex items-center gap-3">
              <Link href="/projects">
                <button className="ui-btn" style={{ '--default-btn-color': isPlaying ? '#fff' : '#3A5FFF', '--hover-btn-color': isPlaying ? '#FAC921' : '#3A5FFF' } as React.CSSProperties}>
                  <span>Projects</span>
                </button>
              </Link>
              <ResumeDialog>
                <button className="ui-btn" style={{ '--default-btn-color': isPlaying ? '#fff' : '#3A5FFF', '--hover-btn-color': isPlaying ? '#FAC921' : '#3A5FFF' } as React.CSSProperties}>
                  <span>Resume</span>
                </button>
              </ResumeDialog>
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div className="ml-4 cursor-pointer" onClick={toggleAudio}>
                      <div className="relative">
                        <svg
                          width="64"
                          height="64"
                          viewBox="0 0 128 128"
                          className={`border-2 rounded-full shadow-md border-zinc-400 transition-all duration-300 ${isPlaying ? 'animate-spin-slow' : ''}`}
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
        <main className="w-full pt-6 md:pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start min-h-[calc(100vh-300px)]">
            {/* Left Column - Text Content */}
            <div className="space-y-2">
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${isPlaying ? 'text-yellow-500' : ''}`} style={{ fontFamily: 'Hoover, sans-serif', color: isPlaying ? undefined : '#3A5FFF' }}>
                  Summary
                </h2>
              </div>

              <div className={`space-y-3 text-lg ${isPlaying ? 'text-white' : ''}`} style={{ fontFamily: 'Satoshi Medium, sans-serif', color: isPlaying ? undefined : '#6B8CE8' }}>
                <p className="flex items-start gap-2">
                  <span className={`inline-block w-2 text-center flex-shrink-0 ${isPlaying ? 'text-yellow-500' : ''}`} style={{ color: isPlaying ? undefined : '#3A5FFF' }}>•</span>
                  <span>I'm a 23 y/o Full-Stack Developer from Kolkata, India</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className={`inline-block w-2 text-center flex-shrink-0 ${isPlaying ? 'text-yellow-500' : ''}`} style={{ color: isPlaying ? undefined : '#3A5FFF' }}>•</span>
                  <span>Crafting intuitive, responsive web and mobile apps with a focus on clean design and seamless UX.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className={`inline-block w-2 text-center flex-shrink-0 ${isPlaying ? 'text-yellow-500' : ''}`} style={{ color: isPlaying ? undefined : '#3A5FFF' }}>•</span>
                  <span>I have experience of working with clients and have provided solutions to their problems.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className={`inline-block w-2 text-center flex-shrink-0 ${isPlaying ? 'text-yellow-500' : ''}`} style={{ color: isPlaying ? undefined : '#3A5FFF' }}>•</span>
                  <span>I am actively developing <Link href="https://plate-liard.vercel.app/" target="_blank" className="inline-block cursor-pointer"><strong className={`bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] ${isPlaying ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400' : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'}`}>P.L.A.T.E</strong></Link> (Personalized learning and Assistance for Taste Enhancement)</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className={`inline-block w-2 text-center flex-shrink-0 ${isPlaying ? 'text-yellow-500' : ''}`} style={{ color: isPlaying ? undefined : '#3A5FFF' }}>•</span>
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

              {/* Work Experience Section */}
              <div className="mt-8">
                <h2 className={`text-2xl font-bold mb-6 ${isPlaying ? 'text-yellow-500' : ''}`} style={{ fontFamily: 'Hoover, sans-serif', color: isPlaying ? undefined : '#3A5FFF' }}>
                  WorkEx
                </h2>
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {workExperience.map((work, index) => (
                        <Card
                          key={index}
                          className={`flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border ${isPlaying ? 'hover:bg-gradient-to-r from-transparent via-gray-800/50 to-transparent border-gray-700/50' : 'border-gray-300/50'}`}
                          style={{
                            backgroundColor: isPlaying ? 'transparent' : '#FFF8DE'
                          }}
                          onMouseEnter={(e) => {
                            if (!isPlaying) {
                              e.currentTarget.style.backgroundColor = '#FFF2C6';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isPlaying) {
                              e.currentTarget.style.backgroundColor = '#FFF8DE';
                            }
                          }}
                          onClick={() => window.open(work.website, '_blank')}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className={`flex items-center text-lg font-semibold ${isPlaying ? 'text-white' : ''}`} style={{ fontFamily: 'Hoover, sans-serif', color: isPlaying ? undefined : '#3A5FFF' }}>
                                {work.title}
                              </div>
                              <div className={`text-sm ${isPlaying ? 'text-muted-foreground' : ''}`} style={{ color: isPlaying ? undefined : '#6B8CE8' }}>
                                {work.date}
                              </div>
                            </div>
                            <p className={`text-sm mt-3 ${isPlaying ? 'text-gray-300' : ''}`} style={{ fontFamily: 'Satoshi Medium, sans-serif', color: isPlaying ? undefined : '#6B8CE8' }}>
                              {work.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>

            {/* Right Column - Profile Picture */}
            <div className="flex flex-col items-center lg:items-end space-y-2">
              <div
                className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-2xl shadow-green-500/20 group"
              >
                <Image
                  src="/prf.jpg"
                  alt="Sagnik Chowdhury"
                  fill
                  className="object-cover image-reveal"
                  priority
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 pt-2" style={{
                '--social-border-color': isPlaying ? '#f0eeef' : '#3A5FFF',
                '--social-icon-color': isPlaying ? '#f0eeef' : '#3A5FFF'
              } as React.CSSProperties}>
                <Link href="https://www.linkedin.com/in/sagnik-chowdhury-252035251/" target="_blank" className="social-button" aria-label="LinkedIn" style={{
                  '--social-border-color': isPlaying ? '#f0eeef' : '#3A5FFF',
                  '--social-icon-color': isPlaying ? '#f0eeef' : '#3A5FFF'
                } as React.CSSProperties}>
                  <div className="button-box">
                    <div className="button-elem">
                      <Linkedin className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
                <Link href="https://github.com/asapSAGNIK" target="_blank" className="social-button" aria-label="GitHub" style={{
                  '--social-border-color': isPlaying ? '#f0eeef' : '#3A5FFF',
                  '--social-icon-color': isPlaying ? '#f0eeef' : '#3A5FFF'
                } as React.CSSProperties}>
                  <div className="button-box">
                    <div className="button-elem">
                      <Github className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
                <a href="mailto:sagnikwork20@gmail.com" className="social-button" aria-label="Email" style={{
                  '--social-border-color': isPlaying ? '#f0eeef' : '#3A5FFF',
                  '--social-icon-color': isPlaying ? '#f0eeef' : '#3A5FFF'
                } as React.CSSProperties}>
                  <div className="button-box">
                    <div className="button-elem">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full pt-4 pb-4 border-t border-border/40">
          <div className={`max-w-7xl mx-auto px-6 md:px-8 flex justify-between text-sm ${isPlaying ? 'text-muted-foreground' : ''}`} style={{ fontFamily: 'Satoshi Medium, sans-serif', color: isPlaying ? undefined : '#6B8CE8' }}>
            <span>© 2025 Sagnik Chowdhury</span>
            <span>Kolkata | {time}</span>
          </div>
        </footer>

      </div>
    </>
  )
}
