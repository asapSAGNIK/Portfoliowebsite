"use client"
import { Button } from "@/components/ui/button"
import { useAudio } from '../../contexts/AudioContext'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import BackgroundParticles from "@/components/BackgroundParticles"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProjectsPage() {
  const { isPlaying, toggleAudio } = useAudio();

  const projects = [
    {
      title: "Rocket Adventures, A Unity Game",
      description: "A 3D rocket navigation game developed in Unity using C#, featuring physics-based controls, level progression, and dynamic camera movement with immersive particle effects.",
      github: "https://github.com/asapSAGNIK/Rocket-Adventures-3D-A-Unity-Game",
      website: "https://rocket-adventures.vercel.app/",
      isDeployed: true,
    },
    {
      title: "Smart Playlist",
      description: "An AI-powered music discovery platform that creates personalized playlists from natural language prompts. Simply describe your mood or desired vibe, and get curated music recommendations tailored to your preferences.",
      github: "https://github.com/srijantelang-work/Smartplaylist",
      website: "https://smartplaylist.software/",
      isDeployed: true,
    },
    {
      title: "P.L.A.T.E (Personalized learning and Assistance for Taste Enhancement)",
      description: "An AI-powered recipe recommendation platform that helps you discover new dishes based on your preferences. Features include Fridge Mode for recipes using available ingredients and Explore Mode for discovering new cuisines and cooking styles tailored to your taste profile.",
      github: "https://github.com/asapSAGNIK/P.L.A.T.E",
      website: "https://plate-liard.vercel.app/",
      isDeployed: true,
    },
    {
      title: "Mini Project Management System",
      description: " A full-stack project management tool built featuring organization-based multi-tenancy.",
      github: "https://github.com/asapSAGNIK/Mini-Project-Management-System",
    },
  ]


  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full" style={{ backgroundColor: isPlaying ? 'transparent' : '#FFF8DE' }} />
      <BackgroundParticles visible={isPlaying} />
      <div className="min-h-screen bg-transparent">
        {/* Header Navigation */}
        <header className="w-full pt-6 md:pt-8 mb-8">
          <div className="max-w-6xl mx-auto px-6 md:px-8 flex justify-between items-center">

            <Link
              href="/"
              className={`text-sm flex items-center gap-2 ${isPlaying ? 'text-white' : ''}`}
              style={{ fontFamily: 'Satoshi Medium, sans-serif', color: isPlaying ? undefined : '#3A5FFF' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>

            <nav className="flex items-center gap-3">
              <Link href="https://www.linkedin.com/in/sagnik-chowdhury-252035251/" target="_blank" className="social-button-small" aria-label="LinkedIn" style={{
                '--social-border-color': isPlaying ? '#f0eeef' : '#3A5FFF',
                '--social-icon-color': isPlaying ? '#f0eeef' : '#3A5FFF'
              } as React.CSSProperties}>
                <div className="button-box">
                  <div className="button-elem">
                    <Linkedin className="w-4 h-4" />
                  </div>
                </div>
              </Link>
              <Link href="https://github.com/asapSAGNIK" target="_blank" className="social-button-small" aria-label="GitHub" style={{
                '--social-border-color': isPlaying ? '#f0eeef' : '#3A5FFF',
                '--social-icon-color': isPlaying ? '#f0eeef' : '#3A5FFF'
              } as React.CSSProperties}>
                <div className="button-box">
                  <div className="button-elem">
                    <Github className="w-4 h-4" />
                  </div>
                </div>
              </Link>
              <a href="mailto:sagnikwork20@gmail.com" className="social-button-small" aria-label="Email" style={{
                '--social-border-color': isPlaying ? '#f0eeef' : '#3A5FFF',
                '--social-icon-color': isPlaying ? '#f0eeef' : '#3A5FFF'
              } as React.CSSProperties}>
                <div className="button-box">
                  <div className="button-elem">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </a>
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div className="cursor-pointer" onClick={toggleAudio}>
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

        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {/* Projects Section */}
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold mb-4 ${isPlaying ? 'text-yellow-500' : ''}`} style={{ fontFamily: 'Hoover, sans-serif', color: isPlaying ? undefined : '#3A5FFF' }}>
              Projects
            </h2>
            <div className="flex flex-col lg:flex-row gap-4">
                  {projects.map((project, index) => (
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
                      onClick={() => window.open(project.website || project.github, '_blank')}
                    >
                      <CardContent>
                        <div className="py-2">
                          <div className="flex items-center justify-between">
                            <div className={`text-lg font-semibold ${isPlaying ? '' : ''}`} style={{ fontFamily: 'Hoover, sans-serif', color: isPlaying ? undefined : '#3A5FFF' }}>
                              {project.title}
                            </div>
                          </div>
                          <p className={`text-sm mt-3 ${isPlaying ? 'text-gray-300' : ''}`} style={{ fontFamily: 'Satoshi Medium, sans-serif', color: isPlaying ? undefined : '#6B8CE8' }}>
                            {project.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

              {/* GitHub Note */}
              <p className={`text-center text-sm mt-4 ${isPlaying ? 'text-muted-foreground' : ''}`} style={{ fontFamily: 'Satoshi Medium, sans-serif', color: isPlaying ? undefined : '#6B8CE8' }}>
                Feel free to visit my github for more open source projects
              </p>
          </div>
        </div>

      </div>
    </>
  )
}



