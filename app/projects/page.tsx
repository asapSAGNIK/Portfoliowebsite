"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Briefcase, FolderOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"
import React from "react"
import BackgroundParticles from "@/components/BackgroundParticles"

export default function ProjectsPage() {
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
  ]

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
      title: "Snake Game",
      description: "A classic Snake game created with Python and Pygame, featuring modern visuals, multiple difficulty modes with high score tracking, and comprehensive game controls.",
      github: "https://github.com/asapSAGNIK/Snake_Game",
    },
  ]

  return (
    <>
      <BackgroundParticles />
      <div className="min-h-screen bg-transparent p-4 md:p-8">
        {/* Header Navigation */}
        <header className="w-full mb-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            
            <nav className="flex items-center gap-6">
              <Link 
                href="/" 
                className="text-sm hover:text-green-500 transition-colors flex items-center gap-2"
                style={{ fontFamily: 'Potlab, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </Link>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <a 
                    href="mailto:sagnikwork20@gmail.com" 
                    className="inline-flex items-center"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://github.com/asapSAGNIK" target="_blank">
                    <Github className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://www.linkedin.com/in/sagnik-chowdhury-252035251/" target="_blank">
                    <Linkedin className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Work Experience */}
          <div className="space-y-6">
            <Card className="border-0">
              <CardHeader>
                <CardTitle className="flex items-center" style={{ fontFamily: 'Potlab, sans-serif', fontWeight: 800 }}>
                  <Briefcase className="w-5 h-5 mr-2" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workExperience.map((work, index) => (
                    <Card 
                      key={index} 
                      className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-transparent via-gray-800/50 to-transparent cursor-pointer" 
                      onClick={() => window.open(work.website, '_blank')}
                    >
                      <CardContent>
                        <div className="py-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-lg font-semibold" style={{ fontFamily: 'Potlab, sans-serif' }}>
                              {work.title}
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {work.type}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {work.date}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3" style={{ fontFamily: 'Potlab, sans-serif' }}>
                            {work.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Projects */}
          <div className="space-y-6">
            <Card className="border-0">
              <CardHeader>
                <CardTitle className="flex items-center" style={{ fontFamily: 'Potlab, sans-serif', fontWeight: 800 }}>
                  <FolderOpen className="w-5 h-5 mr-2" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <Card 
                      key={index} 
                      className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-transparent via-gray-800/50 to-transparent cursor-pointer" 
                      onClick={() => window.open(project.website || project.github, '_blank')}
                    >
                      <CardContent>
                        <div className="py-2">
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold" style={{ fontFamily: 'Potlab, sans-serif' }}>
                              {project.title}
                            </div>
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                              <Button asChild variant="ghost" className="px-3 py-2 h-8">
                                <Link href={project.github} target="_blank">
                                  <Github className="w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3" style={{ fontFamily: 'Potlab, sans-serif' }}>
                            {project.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* GitHub Note */}
                <p className="text-center text-sm text-muted-foreground mt-4" style={{ fontFamily: 'Potlab, sans-serif' }}>
                  Feel free to visit my github for more open source projects
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}


