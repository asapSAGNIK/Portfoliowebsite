"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, GraduationCap, FolderOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import BackgroundParticles from "@/components/BackgroundParticles"
import ResumeDialog from "@/components/ResumeDialog"


export default function Portfolio() {
  const skills = [
    "JavaScript",
    "MERN Stack", 
    "TypeScript",
    "Python",
    "HTML/CSS",
    "Unity",
    "Supabase",
    "Tailwind CSS",
    "C",
    "SQL",
    "PostgreSQL",
    "C#",
    "React Native",
    "Next.js",
    "FastAPI",
    "Node.js",
    "Express.js",
    "Git",
    "GitHub",
    "Docker",
    "MongoDB",
    "MySQL",
    "Redux",
  ]

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
      description: "An AI-powered music discovery platform that creates personalized playlists from natural language promptsed. Simply describe your mood or desired vibe, and get curated music recommendations tailored to your preferences.",
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

  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 10); // update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BackgroundParticles />
      <div className="min-h-screen bg-transparent p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen lg:h-auto">
          {/* Left Column - About & Contact */}
          <div className="space-y-6">
            {/* Profile Section */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-60 h-60 mx-auto mb-4 overflow-hidden relative rounded-xl">
                  <Image
                    src="/prf.jpg"
                    alt="Sagnik Chowdhury"
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>
                <CardTitle className="text-3xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>SAGNIK CHOWDHURY</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• <strong>22-year-old Full-Stack Developer from Kolkata</strong></p>
                  <p>• <strong>Passionate about crafting scalable applications with React, Next.js, and modern web technologies</strong></p>
                  <p>• <strong>Built cross-platform e-commerce solutions and real estate portfolio platforms</strong></p>
                  <p>• <strong>Currently developing Android and iOS apps for Sundar Garments' e-commerce platform</strong></p>
                  <p>• <strong>Building cross-platform solutions with React Native</strong></p>
                  <p>• <strong>Seeking new challenges that push boundaries and drive personal growth in the tech world</strong></p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="mailto:sagnikwork20@gmail.com" 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://github.com/asapSAGNIK" target="_blank">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.linkedin.com/in/sagnik-chowdhury-252035251/" target="_blank">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Link>
                  </Button>
                </div>
                <div className="flex justify-center mt-4">
                  <ResumeDialog />
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle & Right Columns - Work Experience, Projects and Education/Experience */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Work Experience Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workExperience.map((work, index) => (
                    <Card key={index} className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-transparent via-gray-800/50 to-transparent cursor-pointer" onClick={() => window.open(work.website, '_blank')}>
                      <CardContent>
                        <div className="py-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-lg font-semibold">
                              {work.title}
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {work.type}
                              </Badge>
                              <Button asChild variant="ghost" className="ml-2 px-3 py-2 h-8" onClick={(e) => e.stopPropagation()}>
                                <Link href={work.website} target="_blank">
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {work.date}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">{work.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects, Education & Experience - All in one Card */}
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FolderOpen className="w-5 h-5 mr-2" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <Card key={index} className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-transparent via-gray-800/50 to-transparent cursor-pointer" onClick={() => window.open(project.website || project.github, '_blank')}>
                      <CardContent>
                        <div className="py-2">
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold">
                              {project.title}
                            </div>
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                              {project.isDeployed ? (
                                <>
                                  <Button asChild variant="ghost" className="px-3 py-2 h-8">
                                    <Link href={project.website} target="_blank">
                                      <ExternalLink className="w-4 h-4" />
                                    </Link>
                                  </Button>
                                  <Button asChild variant="ghost" className="px-3 py-2 h-8">
                                    <Link href={project.github} target="_blank">
                                      <Github className="w-4 h-4" />
                                    </Link>
                                  </Button>
                                </>
                              ) : (
                                <Button asChild variant="ghost" className="px-3 py-2 h-8">
                                  <Link href={project.github} target="_blank">
                                    <Github className="w-4 h-4" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">{project.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* GitHub Note */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Feel free to visit my github for more open source projects
                </p>

                {/* Education Section - Plain Content, No Box */}
                <div className="mt-8">
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    <span className="text-xl font-bold">Education</span>
                  </div>
                  <div className="space-y-2 ml-7">
                    <h4 className="font-medium">Bachelor of Computer Science</h4>
                    <p className="text-sm text-muted-foreground">SRM University, Delhi NCR, Sonepat, Haryana • 2021-2025</p>
                  </div>
                </div>
              </CardContent>
              {/* Footer */}
              <div className="border-t px-6 py-3 flex justify-between text-sm text-muted-foreground">
                <span>© 2025 Sagnik Chowdhury</span>
                <span>Kolkata | {time}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}