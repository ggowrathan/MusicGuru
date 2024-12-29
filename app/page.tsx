"use client";
import Head from 'next/head';
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"
import { Appbar } from "./components/Appbar";
import { Redirect } from "./components/Redirect";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Headphones } from 'lucide-react'

export default function LandingPage() {
  const session = useSession();
  return (
    <>
    <Head>
    <title>MusicGuru</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div className="flex flex-col min-h-screen relative overflow-hidden" style={{
      background: `
        radial-gradient(circle at 0% 0%, #1a365d 0%, transparent 50%),
        radial-gradient(circle at 100% 0%, #1e4784 0%, transparent 50%),
        radial-gradient(circle at 100% 100%, #1a365d 0%, transparent 50%),
        radial-gradient(circle at 0% 100%, #1e4784 0%, transparent 50%),
        linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #1e40af 75%, #1e3a8a 100%)
      `
    } as React.CSSProperties}>
      <style jsx global>{`
        :root {
          --color-blue-900: #1E3A8A;
          --color-blue-800: #1E40AF;
          --color-blue-700: #1D4ED8;
          --color-blue-600: #2563EB;
          --color-blue-500: #3B82F6;
          --color-blue-400: #60A5FA;
          --color-blue-300: #93C5FD;
          --color-blue-200: #BFDBFE;
          --color-blue-100: #DBEAFE;
        }
        
        .glass-effect {
          background: rgba(37, 99, 235, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(147, 197, 253, 0.2);
        }
        
        .gradient-text {
          background: linear-gradient(to right, #93C5FD, #DBEAFE);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.3),rgba(30,58,138,0)_50%)]" />
      <header className="relative px-4 lg:px-6 h-14 flex items-center glass-effect">
        
      </header>
      <main className="flex-1 relative">
      <Appbar/>
      <Redirect/>
     
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
          
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none gradient-text">
               Shape Your Sound
              </h1>
              <p className="mx-auto max-w-[600px] text-blue-200 md:text-xl">
                MusicGuru: Where you can create customized playlists,   <br />
                engage your audience and create music experiences together
              </p>
              {!session.data?.user && <Button className="bg-blue-400/90 text-blue-900 hover:bg-blue-300/90 transition-colors" onClick={() => signIn()}>
                Get Started
              </Button>}
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 gradient-text">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4 p-6 glass-effect rounded-lg">
                <Users className="h-12 w-12 text-blue-300" />
                <h3 className="text-xl font-bold text-center text-blue-200">Collaboration</h3>
                <p className="text-center text-blue-300">
                  Upvote and downvote songs on your playlists.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 glass-effect rounded-lg">
                <Headphones className="h-12 w-12 text-blue-300" />
                <h3 className="text-xl font-bold text-center text-blue-200">Live Sessions</h3>
                <p className="text-center text-blue-300">
                  Host live listening events with your peers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 glass-effect rounded-lg">
                <Music className="h-12 w-12 text-blue-300" />
                <h3 className="text-xl font-bold text-center text-blue-200">Playlist Insights</h3>
                <p className="text-center text-blue-300">
                  Record data on your music preferences.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                Ready to Amplify Your Connection?
              </h2>
              <p className="mx-auto max-w-[600px] text-blue-200 md:text-xl">
                Join MusicGuru today and start creating collaborative playlists with your fans.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-400/20 glass-effect">
        <p className="text-xs text-blue-300">© 2025 MusicGuru. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-blue-200 text-blue-300 transition-colors" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-blue-200 text-blue-300 transition-colors" href="/privacy">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
    </>
  );
}

