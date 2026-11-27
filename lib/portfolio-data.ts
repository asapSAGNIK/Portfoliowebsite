export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  shortPeriod: string;
  location?: string;
  summary: string;
  highlights: string[];
  link?: string;
  linkLabel?: string;
  stack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "ai" | "web" | "games";
  categoryLabel: string;
  year: string;
  description: string;
  architecture: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  stack: string[];
  featuredOnHome?: boolean;
}

export interface OffClockPad {
  id: string;
  label: string;
  caption: string;
  iconSrc: string;
  audioSrc: string;
  startAt?: number;
  durationMs?: number;
  keyHint: string;
}

export const SITE_URL = "https://sagnik-chowdhury.vercel.app";
export const OG_IMAGE = "/images/og-image.png";

export const PERSON = {
  name: "Sagnik Chowdhury",
  shortName: "Sagnik",
  role: "Full-Stack & AI Product Engineer",
  location: "Kolkata, India",
  timezone: "Asia/Kolkata",
  email: "sagnikwork20@gmail.com",
  phone: "+91 6290140165",
  github: "https://github.com/asapSAGNIK",
  githubHandle: "@asapSAGNIK",
  linkedin: "https://www.linkedin.com/in/sagnik-chowdhury-252035251/",
  linkedinHandle: "sagnik-chowdhury",
  resumePdf: "/resume.pdf",
  portrait: "/images/portrait.webp",
  education: {
    institution: "SRM University",
    degree: "Bachelor of Technology (B.Tech)",
    period: "2021 – 2025",
    gpa: "7.5 GPA",
  },
  resumeSummary:
    "Full-stack and AI engineer shipping web, mobile, and automation products used by 3,000+ active users. Comfortable owning features from UI and APIs to databases, AI pipelines, and deployment.",
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "uphook",
    company: "Uphook.ai",
    role: "Technical Intern",
    period: "Sep 2026 – Present",
    shortPeriod: "2026 – Now",
    summary:
      "Building n8n recruiting workflows and ATS job pipelines across 100+ companies alongside the founder.",
    highlights: [
      "Sourced job listings across 100+ companies from ATS platforms to expand job inventory on a platform scaling past 10,000+ users.",
      "Worked directly with the founder on core product features, backend services, and n8n recruiting workflows.",
    ],
    link: "https://uphook.ai/",
    linkLabel: "uphook.ai",
    stack: ["n8n", "Python", "TypeScript", "Next.js", "PostgreSQL"],
  },
  {
    id: "daga-groups",
    company: "Daga Groups",
    role: "Software Intern",
    period: "Feb 2026 – Jul 2026",
    shortPeriod: "2026",
    summary:
      "Built a Gemini Vision Telegram bot for textile invoices and prototyped a Twilio + Deepgram voice agent.",
    highlights: [
      "Built a Python Telegram bot using Google Gemini Vision to classify and log grey, yarn, finish, GRN, and ledger bills into Google Sheets.",
      "Prototyped a low-latency voice AI agent combining Twilio telephony, Deepgram STT, and ElevenLabs TTS.",
    ],
    link: "https://github.com/asapSAGNIK/daga",
    linkLabel: "github.com/asapSAGNIK/daga",
    stack: ["Python", "Gemini Vision AI", "Telegram API", "Google Sheets API", "Twilio", "Deepgram", "ElevenLabs"],
  },
  {
    id: "sunder-garments",
    company: "Sunder Garments",
    role: "Freelance",
    period: "Aug 2025 – Oct 2025",
    shortPeriod: "2025",
    summary:
      "Built and launched their web and mobile storefront solo, from product catalog to checkout.",
    highlights: [
      "Owned the full e-commerce stack solo: catalog management, bulk order flows, cart state, checkout, and payments.",
      "Shipped both web and mobile storefronts to production for live retail and wholesale orders.",
    ],
    link: "https://www.sundergarments.in/",
    linkLabel: "sundergarments.in",
    stack: ["Next.js", "React Native", "TypeScript", "Tailwind CSS", "Node.js"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "the-teatime",
    title: "The Teatime",
    tagline: "Editor-free AI newsroom that researches, verifies, and publishes live stories.",
    category: "ai",
    categoryLabel: "AI & Automation",
    year: "2025",
    description:
      "An automated news site run by an LLM agent pipeline that picks up global trends, checks sources, and publishes drafted stories without human editors.",
    architecture:
      "SQLite-backed ingestion loop with exact URL matching and semantic clustering to stop duplicate stories from going live.",
    liveUrl: "https://teatime-ivory.vercel.app/",
    githubUrl: "https://teatime-ivory.vercel.app/",
    image: "/images/projects/teatime.webp",
    stack: ["Python", "SQLite", "Next.js", "React"],
    featuredOnHome: true,
  },
  {
    id: "smart-playlist",
    title: "Smart Playlist",
    tagline: "Describe a mood in plain English and get a Spotify playlist you can save.",
    category: "ai",
    categoryLabel: "AI & Automation",
    year: "2025",
    description:
      "A music discovery app where you type a mood, setting, or vibe and get a tailored Spotify playlist you can tweak and save.",
    architecture:
      "Python prompt engine hooked into the Spotify Web API, with Supabase storing saved playlists and listening preferences.",
    liveUrl: "https://smartplaylist.software/",
    githubUrl: "https://github.com/srijantelang-work/Smartplaylist",
    image: "/images/projects/smartplaylist.webp",
    stack: ["React", "Python", "Tailwind CSS", "Supabase", "Spotify API"],
    featuredOnHome: true,
  },
  {
    id: "plate",
    title: "P.L.A.T.E",
    tagline: "Cook from whatever is in your fridge, with step-by-step recipe guidance.",
    category: "web",
    categoryLabel: "Full-Stack Web",
    year: "2025",
    description:
      "Suggests dishes from ingredients already in your kitchen via Fridge Mode, or helps you try new cuisines in Explore Mode.",
    architecture:
      "Next.js 15 and TypeScript frontend over Supabase, tracking user taste preferences and interactive cooking steps.",
    liveUrl: "https://plate-liard.vercel.app/",
    githubUrl: "https://github.com/asapSAGNIK/P.L.A.T.E",
    image: "/images/projects/plate.webp",
    stack: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    featuredOnHome: true,
  },
  {
    id: "sleepify",
    title: "Sleepify",
    tagline: "Keeps your laptop awake when you close the lid so the music never stops.",
    category: "games",
    categoryLabel: "Games & Utilities",
    year: "2026",
    description:
      "Built out of frustration because shutting my laptop mid-track kept killing the audio. One job: keep the machine awake while the set plays.",
    architecture:
      "Lightweight system utility with no setup required for late-night listening and DJ sessions.",
    githubUrl: "https://github.com/asapSAGNIK/Sleepify.git",
    stack: ["System Utility", "Audio"],
    featuredOnHome: true,
  },
  {
    id: "rocket-adventures",
    title: "Rocket Adventures 3D",
    tagline: "Physics-driven 3D rocket navigation game built in Unity and C#.",
    category: "games",
    categoryLabel: "Games & Utilities",
    year: "2024",
    description:
      "A 3D thruster game in Unity with custom physics controls, obstacle courses, dynamic camera follow, and particle effects.",
    architecture:
      "C# rigid-body thrust physics and collision state machines, exported to WebGL and hosted on Vercel.",
    liveUrl: "https://rocket-adventures.vercel.app/",
    githubUrl: "https://github.com/asapSAGNIK/Rocket-Adventures-3D-A-Unity-Game",
    image: "/images/projects/rocket.webp",
    stack: ["Unity", "C#"],
    featuredOnHome: true,
  },
  {
    id: "daga-bill-bot",
    title: "Bill Processor Bot",
    tagline: "Telegram + Gemini Vision bot that logs textile invoices into Google Sheets.",
    category: "ai",
    categoryLabel: "AI & Automation",
    year: "2026",
    description:
      "Client tool for Daga Groups that reads photographed textile invoices sent on Telegram, classifies bill types (grey, yarn, finish, GRN, ledger), and writes clean rows to Sheets.",
    architecture:
      "Python Telegram webhook calling Gemini Vision for structured extraction, validating fields before appending via Google Sheets API.",
    githubUrl: "https://github.com/asapSAGNIK/daga",
    stack: ["Python", "Gemini Vision AI", "Telegram Bot API", "Google Sheets"],
    featuredOnHome: false,
  },
  {
    id: "sunder-garments-store",
    title: "Sunder Garments Storefront",
    tagline: "Web and mobile apparel store supporting retail and bulk orders.",
    category: "web",
    categoryLabel: "Full-Stack Web",
    year: "2025",
    description:
      "Production storefront built solo for Sunder Garments, handling product catalogs, bulk order pricing, cart state, checkout, and payments.",
    architecture:
      "Shared storefront architecture across Next.js web and React Native mobile, from catalog search through checkout.",
    liveUrl: "https://www.sundergarments.in/",
    stack: ["Next.js", "React Native", "TypeScript", "Payments"],
    featuredOnHome: false,
  },
];

export const SKILL_GROUPS = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "PostgreSQL", "C#"],
  },
  {
    label: "Frameworks & UI",
    items: ["Next.js", "React", "React Native", "Tailwind CSS", "FastAPI", "Node.js", "Redux", "Flutter"],
  },
  {
    label: "Data, AI & Tooling",
    items: ["Supabase", "MongoDB", "Firebase", "n8n", "Docker", "GCP", "Vercel", "Playwright", "PyTest", "Unity", "GitHub"],
  },
];

export const OFF_CLOCK_PADS: OffClockPad[] = [
  {
    id: "rekordbox",
    label: "Rekordbox",
    caption: "DJing for myself, soon for an audience",
    iconSrc: "/icons/rekord.svg",
    audioSrc: "/audio/dj.m4a",
    durationMs: 2600,
    keyHint: "1",
  },
  {
    id: "cs2",
    label: "CS2",
    caption: "Queued up in Counter-Strike 2",
    iconSrc: "/icons/CSicon.svg",
    audioSrc: "/audio/cs.m4a",
    durationMs: 2000,
    keyHint: "2",
  },
  {
    id: "fifa",
    label: "FIFA",
    caption: "Thrashing people in FIFA",
    iconSrc: "/icons/FIFA.svg",
    audioSrc: "/audio/ea.m4a",
    durationMs: 2600,
    keyHint: "3",
  },
  {
    id: "football",
    label: "Football",
    caption: "Defending like my life depends on it",
    iconSrc: "/icons/soccer-ball.svg",
    audioSrc: "/audio/ankara.m4a",
    durationMs: 2600,
    keyHint: "4",
  },
  {
    id: "basketball",
    label: "Basketball",
    caption: "Hooping whenever there is a court nearby",
    iconSrc: "/icons/basketball.svg",
    audioSrc: "/audio/swish.m4a",
    durationMs: 1400,
    keyHint: "5",
  },
];
