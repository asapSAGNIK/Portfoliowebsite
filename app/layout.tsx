import type { Metadata } from 'next'
import './globals.css'
import Head from "next/head"
import { AudioProvider } from '../contexts/AudioContext'

export const metadata: Metadata = {
  title: 'Sagnik Chowdhury',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  )
}
