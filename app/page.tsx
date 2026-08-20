"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useAudio } from "../contexts/AudioContext";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, Phone, Clock, Code } from "lucide-react";
import BackgroundParticles from "@/components/BackgroundParticles";
import ParticleTunnel from "@/components/ParticleTunnel";
import ResumeDialog from "@/components/ResumeDialog";
import TechIcon from "@/components/TechIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ParallaxBackground = dynamic(
  () => import("@/components/background/ParallaxBackground"),
  { ssr: false }
);

export default function Home() {
  const [time, setTime] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Safety net: the photo must always end up sharp, even if onLoad is missed
  useEffect(() => {
    const t = window.setTimeout(() => setImageLoaded(true), 1800);
    return () => window.clearTimeout(t);
  }, []);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const { isPlaying, toggleAudio } = useAudio();
  const swishhh = useRef<HTMLAudioElement | null>(null);
  const cs = useRef<HTMLAudioElement | null>(null);
  const ea = useRef<HTMLAudioElement | null>(null);
  const dj = useRef<HTMLAudioElement | null>(null);
  const ankara = useRef<HTMLAudioElement | null>(null);
  const ankaraTimer = useRef<number | null>(null);

  const workExperience = [
    {
      title: "Bill Processor Bot (@ Daga Groups)",
      company: "Bill Processor Bot (@ Daga Groups)",
      type: "Freelance",
      date: "February 2026",
      description:
        "A Telegram bot that extracts structured data from bill and invoice images using Google Gemini Vision AI, classifies them by entry type, and saves the results to Google Sheets. Built for the textile industry, handling grey purchase, yarn purchase, finish purchase, GRN, and ledger documents.",
      website: "https://github.com/asapSAGNIK/daga",
    },
    {
      title: "Sunder Garments",
      company: "Sunder Garments",
      type: "Freelance",
      date: "August 2025",
      description:
        "An end-to-end e-commerce platform supporting web and mobile storefronts with cart, checkout, and order management. I engineered the full workflow from product listing to secure transactions and deployment.",
      website: "https://www.sundergarments.in/",
    },
  ];

  const projects = [
    {
      title: "The Teatime",
      description:
        "The Teatime is an experimental, autonomous news service that eliminates human editors. It uses a high-intelligence AI pipeline to discover, research, write, and verify news stories in real-time based on global social and search trends.",
      github: "https://teatime-ivory.vercel.app/",
      website: "https://teatime-ivory.vercel.app/",
      isDeployed: true,
      image: "/teatimeicon.png",
      tech: ["Python", "SQLite", "Next.js", "React"],
      subtext: "An autonomous news service with no human editors",
    },
    {
      title: "Smart Playlist",
      description:
        "An AI-powered music discovery platform that creates personalized playlists from natural language prompts. Simply describe your mood or desired vibe, and get curated music recommendations tailored to your preferences.",
      github: "https://github.com/srijantelang-work/Smartplaylist",
      website: "https://smartplaylist.software/",
      isDeployed: true,
      image: "/smartplaylisticon.png",
      tech: ["React", "Python", "Tailwind", "Supabase", "Spotify"],
      subtext: "AI music discovery from a simple mood prompt",
    },
    {
      title: "P.L.A.T.E",
      description:
        "An AI-powered recipe recommendation platform that helps you discover new dishes based on your preferences. Features include Fridge Mode for recipes using available ingredients and Explore Mode for discovering new cuisines and cooking styles tailored to your taste profile.",
      github: "https://github.com/asapSAGNIK/P.L.A.T.E",
      website: "https://plate-liard.vercel.app/",
      isDeployed: true,
      image: "/Plateicon.png",
      tech: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Supabase"],
      subtext: "AI recipe recommendations tailored to your taste",
    },
    {
      title: "Rocket Adventures, A Unity Game",
      description:
        "A 3D rocket navigation game developed in Unity using C#, featuring physics-based controls, level progression, and dynamic camera movement with immersive particle effects.",
      github: "https://github.com/asapSAGNIK/Rocket-Adventures-3D-A-Unity-Game",
      website: "https://rocket-adventures.vercel.app/",
      isDeployed: true,
      image: "/rocketicon.png",
      tech: ["Unity", "C#"],
      subtext: "A 3D rocket navigation game built in Unity",
    },
  ];

  // Initialize hover sound effects (client-only)
  useEffect(() => {
    swishhh.current = new Audio("/swishhhh.mp3");
    cs.current = new Audio("/CS.mpeg");
    ea.current = new Audio("/ea.mp3");
    dj.current = new Audio("/dj.mp3");
    ankara.current = new Audio("/ankara.mp3");
    [swishhh.current, cs.current, ea.current, dj.current, ankara.current].forEach(
      (audio) => {
        if (audio) audio.volume = 0.4;
      }
    );
  }, []);

  // Unlock hover sounds: "mouseenter" is not a user-activation event, so Chrome
  // blocks play(). Warm up the audio elements on the first real gesture instead.
  useEffect(() => {
    const unlock = () => {
      [swishhh.current, cs.current, ea.current, dj.current, ankara.current].forEach(
        (audio) => {
          if (!audio) return;
          audio.muted = true;
          audio
            .play()
            .then(() => {
              audio.pause();
              audio.currentTime = 0;
              audio.muted = false;
            })
            .catch(() => {});
        }
      );
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const fullText = "SAGNIK CHOWDHURY";
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, 95); // Adjust typing speed here
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
      setShowCursor((prev) => !prev);
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
    <React.Fragment>
      <BackgroundParticles visible={isPlaying} />
      <div
        className="fixed inset-0 -z-10 w-full h-full"
        style={{ backgroundColor: "#000000" }}
      />
      <ParticleTunnel
        x={50}
        y={35}
        radius={120}
        density={26}
        gap={30}
        particleSize={5.2}
        direction="inside"
        speed={1}
        colors={["#A7D129"]}
        className="fixed inset-0 -z-[4] w-full h-full pointer-events-none"
      />
      <ParallaxBackground />
      <div
        id="scroll-container"
        className="min-h-screen overflow-y-auto overflow-x-clip bg-transparent"
      >
        {/* Main Content — Single Column, Centered */}
        <main className="w-full pt-6 md:pt-10 pb-4">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            {/* ===== HERO SECTION — IMAGE LEFT, TEXT RIGHT ===== */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 md:mb-10">
              {/* Profile Image - 0.75:1 Aspect Ratio */}
              <div className="flex-shrink-0">
                <div
                  className="relative rounded-2xl overflow-hidden border-2 shadow-2xl group"
                  style={{
                    borderColor: "#3E432E",
                    boxShadow: "0 25px 50px -12px rgba(167, 209, 41, 0.15), 0 0 0 1px rgba(62, 67, 46, 0.5)",
                    width: "270px",
                    height: "360px", // 270 / 0.75 = 360
                  }}
                >
                  <Image
                    src="/prf@3x.jpg"
                    alt="Sagnik Chowdhury"
                    fill
                    sizes="270px"
                    unoptimized
                    priority
                    className={`object-cover transition-[filter,transform] duration-[1400ms] ease-out ${imageLoaded ? "blur-0 scale-100" : "blur-[12px] scale-110"}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>

              {/* Title & Summary */}
              <div className="flex flex-col flex-1">
                {/* Title */}
                <div className="mb-4 text-left">
                  <h1
                    className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap tracking-tight"
                    style={{
                      fontFamily: "Hoover, sans-serif",
                      color: "#A7D129",
                    }}
                  >
                    {typedText}
                    <span
                      style={{
                        opacity: showCursor ? 1 : 0,
                        transition: "opacity 0.1s",
                      }}
                    >
                      |
                    </span>
                  </h1>
                </div>

                {/* Info Block */}
                <div className="mt-4 flex flex-col gap-y-4 text-sm text-[#A7D129] py-2" style={{ fontFamily: "Satoshi Medium, sans-serif" }}>
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-[#3E432E] rounded-full border border-[#616F39]">
                      <Code className="w-4 h-4 text-[#A7D129]" />
                    </div>
                    <a href="https://github.com/asapSAGNIK" target="_blank" className="relative inline-block after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#A7D129] hover:after:w-full after:transition-all after:duration-300">GitHub @asapSAGNIK</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-[#3E432E] rounded-full border border-[#616F39]">
                      <Linkedin className="w-4 h-4 text-[#A7D129]" />
                    </div>
                    <a href="https://www.linkedin.com/in/sagnik-chowdhury-252035251/" target="_blank" className="relative inline-block after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#A7D129] hover:after:w-full after:transition-all after:duration-300">LinkedIn @sagnik-chowdhury</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-[#3E432E] rounded-full border border-[#616F39]">
                      <MapPin className="w-4 h-4 text-[#A7D129]" />
                    </div>
                    <span>India</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-[#3E432E] rounded-full border border-[#616F39]">
                      <Clock className="w-4 h-4 text-[#A7D129]" />
                    </div>
                    <a href="/resume.pdf" target="_blank" className="relative inline-block after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#A7D129] hover:after:w-full after:transition-all after:duration-300">Resume</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-[#3E432E] rounded-full border border-[#616F39]">
                      <Mail className="w-4 h-4 text-[#A7D129]" />
                    </div>
                    <a href="mailto:sagnikwork20@gmail.com" className="relative inline-block after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#A7D129] hover:after:w-full after:transition-all after:duration-300">sagnikwork20@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-[#3E432E] rounded-full border border-[#616F39]">
                      <Phone className="w-4 h-4 text-[#A7D129]" />
                    </div>
                    <span>+91 6290140165</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== SUMMARY SECTION (Moved below Hero) ===== */}
            <div
              className="space-y-1.5 text-sm text-left mb-8 md:mb-10 text-[#616F39]"
              style={{
                fontFamily: "Satoshi Medium, sans-serif",
                color: "#616F39",
              }}
            >
                <p className="flex items-start gap-2">
                  <span
                    className="inline-block w-2 text-center flex-shrink-0 text-[#A7D129]"
                  >
                    •
                  </span>
                  <span>I'm a 23 y/o Full-Stack Developer from India</span>
                </p>
                <p className="flex items-start gap-2">
                  <span
                    className="inline-block w-2 text-center flex-shrink-0 text-[#A7D129]"
                  >
                    •
                  </span>
                  <span>
                    Crafting intuitive, responsive web and mobile apps with a
                    focus on clean design and seamless UI/UX.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span
                    className="inline-block w-2 text-center flex-shrink-0 text-[#A7D129]"
                  >
                    •
                  </span>
                  <span>
                    I have experience of working with clients and have
                    provided solutions, over multiple domains, to their
                    problems.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span
                    className="inline-block w-2 text-center flex-shrink-0 text-[#A7D129]"
                  >
                    •
                  </span>
                  <span>
                    {" "}
                    I am actively developing automation bots (Telegram) and
                    Voice Calling Agents for{" "}
                    <Link
                      href="https://www.dagagroups.com/"
                      target="_blank"
                      className="inline-block cursor-pointer"
                    >
                      <strong
                        className={`bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] ${isPlaying ? "bg-gradient-to-r from-[#616F39] via-[#A7D129] to-[#616F39]" : "bg-gradient-to-r from-[#616F39] via-[#A7D129] to-[#616F39]"}`}
                      >
                        Daga Groups, Surat, India
                      </strong>
                    </Link>
                    .
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span
                    className="inline-block w-2 text-center flex-shrink-0 text-[#A7D129]"
                  >
                    •
                  </span>
                  <span>
                    I am actively developing{" "}
                    <Link
                      href="https://plate-liard.vercel.app/"
                      target="_blank"
                      className="inline-block cursor-pointer"
                    >
                      <strong
                        className={`bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] ${isPlaying ? "bg-gradient-to-r from-[#616F39] via-[#A7D129] to-[#616F39]" : "bg-gradient-to-r from-[#616F39] via-[#A7D129] to-[#616F39]"}`}
                      >
                        P.L.A.T.E
                      </strong>
                    </Link>{" "}
                    (Personalized learning and Assistance for Taste
                    Enhancement)
                  </span>
                </p>
                {/* ===== HOBBIES SECTION ===== */}
            <div className="mb-8 md:mb-10 text-center">
              <h2
                className="text-2xl font-bold mb-2 text-[#A7D129]"
                style={{ fontFamily: "Hoover, sans-serif" }}
              >
                Off The Clock
              </h2>
              <div className="flex items-center justify-center -space-x-[14px] pt-3">
                {/* Basketball */}
                <div
                  className="group relative z-[1] p-2 rounded-full border-2 border-[#3E432E] bg-[#000000] cursor-pointer transition-all duration-300 hover:border-[#A7D129] hover:scale-110 hover:z-20 hover:shadow-[0_0_25px_rgba(167,209,41,0.45)]"
                  onMouseEnter={() => {
                    if (swishhh.current) {
                      swishhh.current.currentTime = 0;
                      swishhh.current.play().catch(() => {});
                    }
                  }}
                  onMouseLeave={() => {}}
                >
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span
                      className="block whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full border border-[#A7D129] bg-[#000000] text-[#A7D129] shadow-[0_0_15px_rgba(167,209,41,0.35)]"
                      style={{ fontFamily: "Satoshi Medium, sans-serif" }}
                    >
                      Hooping
                    </span>
                    <span className="block mx-auto -mt-[3px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#A7D129]" />
                  </span>
                  <span className="absolute inset-0 rounded-full border border-[#A7D129] opacity-0 group-hover:opacity-100 group-hover:animate-[pulse-ring_1.4s_ease-out_infinite] pointer-events-none" />
                  <Image
                    src="/icons/basketball.svg"
                    alt="Basketball"
                    width={48}
                    height={48}
                    className="drop-shadow-sm relative z-[1] group-hover:animate-[icon-pop_0.5s_ease]"
                  />
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.15s]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.3s]" />
                  </span>
                </div>
                {/* Football */}
                <div
                  className="group relative z-[1] p-2 rounded-full border-2 border-[#3E432E] bg-[#000000] cursor-pointer transition-all duration-300 hover:border-[#A7D129] hover:scale-110 hover:z-20 hover:shadow-[0_0_25px_rgba(167,209,41,0.45)]"
                  onMouseEnter={() => {
                    if (ankara.current) {
                      if (ankaraTimer.current !== null) {
                        window.clearTimeout(ankaraTimer.current);
                        ankaraTimer.current = null;
                      }
                      ankara.current.currentTime = 6;
                      ankara.current.play().catch(() => {});
                    }
                  }}
                  onMouseLeave={() => {
                    if (ankara.current && ankaraTimer.current === null) {
                      ankaraTimer.current = window.setTimeout(() => {
                        ankara.current?.pause();
                        ankaraTimer.current = null;
                      }, 2000);
                    }
                  }}
                >
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span
                      className="block whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full border border-[#A7D129] bg-[#000000] text-[#A7D129] shadow-[0_0_15px_rgba(167,209,41,0.35)]"
                      style={{ fontFamily: "Satoshi Medium, sans-serif" }}
                    >
                      Defending like my life depends on it
                    </span>
                    <span className="block mx-auto -mt-[3px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#A7D129]" />
                  </span>
                  <span className="absolute inset-0 rounded-full border border-[#A7D129] opacity-0 group-hover:opacity-100 group-hover:animate-[pulse-ring_1.4s_ease-out_infinite] pointer-events-none" />
                  <Image
                    src="/icons/soccer-ball.svg"
                    alt="Football"
                    width={48}
                    height={48}
                    className="drop-shadow-sm relative z-[1] group-hover:animate-[icon-pop_0.5s_ease]"
                  />
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.15s]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.3s]" />
                  </span>
                </div>
                {/* Rekordbox */}
                <div
                  className="group relative z-[1] p-2 rounded-full border-2 border-[#3E432E] bg-[#000000] cursor-pointer transition-all duration-300 hover:border-[#A7D129] hover:scale-110 hover:z-20 hover:shadow-[0_0_25px_rgba(167,209,41,0.45)]"
                  onMouseEnter={() => {
                    dj.current?.play().catch(() => {});
                  }}
                  onMouseLeave={() => {}}
                >
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span
                      className="block whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full border border-[#A7D129] bg-[#000000] text-[#A7D129] shadow-[0_0_15px_rgba(167,209,41,0.35)]"
                      style={{ fontFamily: "Satoshi Medium, sans-serif" }}
                    >
                      Djing for myself, soon for an audience
                    </span>
                    <span className="block mx-auto -mt-[3px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#A7D129]" />
                  </span>
                  <span className="absolute inset-0 rounded-full border border-[#A7D129] opacity-0 group-hover:opacity-100 group-hover:animate-[pulse-ring_1.4s_ease-out_infinite] pointer-events-none" />
                  <Image
                    src="/icons/rekord.svg"
                    alt="Rekordbox"
                    width={48}
                    height={48}
                    className="drop-shadow-sm relative z-[1] group-hover:animate-[icon-pop_0.5s_ease]"
                  />
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.15s]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.3s]" />
                  </span>
                </div>
                {/* CS2 */}
                <div
                  className="group relative z-[1] p-2 rounded-full border-2 border-[#3E432E] bg-[#000000] cursor-pointer transition-all duration-300 hover:border-[#A7D129] hover:scale-110 hover:z-20 hover:shadow-[0_0_25px_rgba(167,209,41,0.45)]"
                  onMouseEnter={() => {
                    cs.current?.play().catch(() => {});
                  }}
                  onMouseLeave={() => {}}
                >
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span
                      className="block whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full border border-[#A7D129] bg-[#000000] text-[#A7D129] shadow-[0_0_15px_rgba(167,209,41,0.35)]"
                      style={{ fontFamily: "Satoshi Medium, sans-serif" }}
                    >
                      Queued up in CS2
                    </span>
                    <span className="block mx-auto -mt-[3px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#A7D129]" />
                  </span>
                  <span className="absolute inset-0 rounded-full border border-[#A7D129] opacity-0 group-hover:opacity-100 group-hover:animate-[pulse-ring_1.4s_ease-out_infinite] pointer-events-none" />
                  <Image
                    src="/icons/CSicon.svg"
                    alt="CS2"
                    width={48}
                    height={48}
                    className="drop-shadow-sm relative z-[1] group-hover:animate-[icon-pop_0.5s_ease]"
                  />
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.15s]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.3s]" />
                  </span>
                </div>
                {/* FIFA */}
                <div
                  className="group relative z-[1] p-2 rounded-full border-2 border-[#3E432E] bg-[#000000] cursor-pointer transition-all duration-300 hover:border-[#A7D129] hover:scale-110 hover:z-20 hover:shadow-[0_0_25px_rgba(167,209,41,0.45)]"
                  onMouseEnter={() => {
                    ea.current?.play().catch(() => {});
                  }}
                  onMouseLeave={() => {}}
                >
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span
                      className="block whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full border border-[#A7D129] bg-[#000000] text-[#A7D129] shadow-[0_0_15px_rgba(167,209,41,0.35)]"
                      style={{ fontFamily: "Satoshi Medium, sans-serif" }}
                    >
                      Thrashing people in FIFA
                    </span>
                    <span className="block mx-auto -mt-[3px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#A7D129]" />
                  </span>
                  <span className="absolute inset-0 rounded-full border border-[#A7D129] opacity-0 group-hover:opacity-100 group-hover:animate-[pulse-ring_1.4s_ease-out_infinite] pointer-events-none" />
                  <Image
                    src="/icons/FIFA.svg"
                    alt="FIFA"
                    width={48}
                    height={48}
                    className="drop-shadow-sm relative z-[1] group-hover:animate-[icon-pop_0.5s_ease]"
                  />
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.15s]" />
                    <span className="w-[3px] h-3 rounded-full bg-[#A7D129] origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite] [animation-delay:0.3s]" />
                  </span>
                </div>
              </div>
            </div>
            </div>

            {/* ===== WORK EXPERIENCE SECTION ===== */}
            <div className="mb-8 md:mb-10 text-center">
              <h2
                className="text-2xl font-bold mb-3 text-[#A7D129]"
                style={{ fontFamily: "Hoover, sans-serif" }}
              >
                WorkEx
              </h2>
              <div className="flex flex-col gap-2 pl-1 text-left max-w-2xl mx-auto">
                {workExperience.map((work, index) => (
                  <div
                    key={index}
                    className="group flex flex-col cursor-pointer transition-all duration-200 hover:translate-x-1 p-4 rounded-xl border border-transparent hover:border-[#616F39] hover:bg-[#3E432E]"
                    onClick={() => window.open(work.website, "_blank")}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-bold transition-colors text-[#A7D129] group-hover:text-[#616F39]"
                        style={{ fontFamily: "Hoover, sans-serif" }}
                      >
                        {work.title}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 transition-all opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A7D129]"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                      <span
                        className="text-xs ml-auto text-[#616F39]"
                        style={{ color: "#616F39" }}
                      >
                        {work.date}
                      </span>
                    </div>
                    <p
                      className="text-sm mt-1 leading-relaxed text-[#A7D129]"
                      style={{
                        fontFamily: "Satoshi Medium, sans-serif",
                        color: "#616F39",
                      }}
                    >
                      {work.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== PROJECTS SECTION — INLINE ===== */}
            <div className="mb-8 md:mb-10 text-center">
              <h2
                className="text-2xl font-bold mb-3 text-[#A7D129]"
                style={{ fontFamily: "Hoover, sans-serif" }}
              >
                Projects
              </h2>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl p-4 cursor-pointer border transition-all duration-300 border-[#3E432E] hover:border-[#616F39] bg-[#000000] hover:bg-[#3E432E]"
                    onClick={() =>
                      window.open(
                        project.website || project.github,
                        "_blank"
                      )
                    }
                  >
                    {/* Hover preview — pops out into the padding space */}
                    {project.image && (
                      <div
                        className={`pointer-events-none absolute top-0 z-20 hidden sm:block w-48 transition-all duration-300 ${
                          index % 2 === 0
                            ? "right-full mr-4 -translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            : "left-full ml-4 translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      >
                        <div
                          className={`rounded-lg overflow-hidden border border-[#3E432E] ${project.title === "Smart Playlist" ? "bg-[#0c0c0e]" : "bg-[#000000]"}`}
                        >
                          <div className="relative h-24 w-full">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className={`${project.title === "Smart Playlist" ? "object-contain" : "object-cover"}`}
                              sizes="192px"
                            />
                          </div>
                          <div className="flex flex-wrap gap-1.5 p-2">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-[#616F39] text-[#A7D129]"
                                style={{ fontFamily: "Satoshi Medium, sans-serif" }}
                              >
                                <TechIcon name={tech} size={10} />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Title with underline animation from the left */}
                    <h3
                      className="relative inline-block text-lg font-bold leading-snub text-[#A7D129]"
                      style={{ fontFamily: "Hoover, sans-serif" }}
                    >
                      {project.title}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#A7D129] transition-all duration-300 group-hover:w-full" />
                    </h3>

                    {/* One-line subtext */}
                    <p
                      className="mt-3 text-sm leading-relaxed text-[#616F39]"
                      style={{ fontFamily: "Satoshi Medium, sans-serif" }}
                    >
                      {project.subtext}
                    </p>
                  </div>
                ))}
              </div>

              {/* GitHub Note */}
              <p
                className="text-center text-sm mt-6 text-[#616F39]"
                style={{
                  fontFamily: "Satoshi Medium, sans-serif",
                  color: "#616F39",
                }}
              >
                Feel free to visit my{" "}
                <Link
                  href="https://github.com/asapSAGNIK"
                  target="_blank"
                  className="underline underline-offset-2 text-[#A7D129] hover:text-[#616F39]"
                >
                  github
                </Link>{" "}
                for more open source projects
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full pt-2 pb-2 border-t border-[#3E432E]">
          <div
            className={`max-w-4xl mx-auto px-6 md:px-8 lg:px-10 flex justify-between text-sm ${isPlaying ? "text-muted-foreground" : ""}`}
            style={{
              fontFamily: "Satoshi Medium, sans-serif",
              color: "#616F39",
            }}
          >
            <span>© 2025 Sagnik Chowdhury</span>
            <span>Kolkata | {time}</span>
          </div>
        </footer>
      </div>

      {/* ===== SOUND / THEME TOGGLE — FIXED BOTTOM-RIGHT ===== */}
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={toggleAudio}
              >
                <div className="relative">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 128 128"
                    className={`border-2 rounded-full shadow-md border-zinc-400 transition-all duration-300 ${isPlaying ? "animate-spin-slow" : ""}`}
                  >
                    <rect width="128" height="128" fill="black"></rect>
                    <circle cx="30" cy="20" r="2" fill="white"></circle>
                    <circle cx="50" cy="30" r="2" fill="white"></circle>
                    <circle cx="60" cy="10" r="2" fill="white"></circle>
                    <circle cx="80" cy="40" r="2" fill="white"></circle>
                    <circle cx="100" cy="20" r="2" fill="white"></circle>
                    <circle cx="120" cy="50" r="2" fill="white"></circle>
                    <circle
                      cx="90"
                      cy="30"
                      r="10"
                      fill="white"
                      fillOpacity="0.5"
                    ></circle>
                    <circle cx="90" cy="30" r="8" fill="white"></circle>
                    <path
                      d="M0 128 Q32 64 64 128 T128 128"
                      fill="purple"
                      stroke="black"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M0 128 Q32 48 64 128 T128 128"
                      fill="mediumpurple"
                      stroke="black"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M0 128 Q32 32 64 128 T128 128"
                      fill="rebeccapurple"
                      stroke="black"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M0 128 Q16 64 32 128 T64 128"
                      fill="purple"
                      stroke="black"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M64 128 Q80 64 96 128 T128 128"
                      fill="mediumpurple"
                      stroke="black"
                      strokeWidth="1"
                    ></path>
                  </svg>
                  <div className="absolute top-6 left-6 w-4 h-4 bg-white border-2 rounded-full shadow-sm border-zinc-400"></div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" sideOffset={8}>
              <p>Sure!! Why not</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </React.Fragment>
  );
}
