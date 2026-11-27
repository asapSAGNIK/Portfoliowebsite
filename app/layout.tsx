import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AudioProvider } from "@/contexts/AudioContext";
import DotGridBackdrop from "@/components/DotGridBackdrop";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyMobileCta from "@/components/StickyMobileCta";
import { OG_IMAGE, PERSON, SITE_URL, SKILL_GROUPS } from "@/lib/portfolio-data";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0e10" },
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sagnik Chowdhury — Full-Stack & AI Engineer",
    template: "%s | Sagnik Chowdhury",
  },
  description:
    "Full-stack and AI engineer in Kolkata building recruiting automation at Uphook.ai, Gemini Vision bots, voice AI prototypes, and web and mobile products.",
  keywords: [
    "Sagnik Chowdhury",
    "Full-Stack Engineer",
    "AI Product Engineer",
    "Founding Engineer",
    "Next.js",
    "TypeScript",
    "Python",
    "Uphook.ai",
    "Kolkata",
  ],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: PERSON.name,
    title: "Sagnik Chowdhury — Full-Stack & AI Engineer",
    description:
      "Full-stack and AI engineer in Kolkata building recruiting automation at Uphook.ai, Gemini Vision bots, voice AI prototypes, and web and mobile products.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sagnik Chowdhury — Full-Stack & AI Engineer portfolio card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagnik Chowdhury — Full-Stack & AI Engineer",
    description:
      "Full-stack and AI engineer building recruiting automation at Uphook.ai, AI tools, and web and mobile products.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var param = new URLSearchParams(window.location.search).get('theme');
    var saved = localStorage.getItem('sagnik-theme');
    var mode = (param === 'light' || param === 'dark') ? param : (saved === 'light' ? 'light' : 'dark');
    document.documentElement.dataset.theme = mode;
    if (mode === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`;

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      url: SITE_URL,
      image: `${SITE_URL}${PERSON.portrait}`,
      jobTitle: PERSON.role,
      email: `mailto:${PERSON.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressCountry: "IN",
      },
      worksFor: {
        "@type": "Organization",
        name: "Uphook.ai",
        url: "https://uphook.ai/",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: PERSON.education.institution,
      },
      sameAs: [PERSON.github, PERSON.linkedin],
      knowsAbout: SKILL_GROUPS.flatMap((g) => g.items),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: PERSON.name,
      description:
        "Portfolio, projects, and resume of Sagnik Chowdhury, Full-Stack & AI Product Engineer.",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`dark ${archivo.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <AudioProvider>
            <DotGridBackdrop />
            <div className="relative z-10 flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <StickyMobileCta />
            </div>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
