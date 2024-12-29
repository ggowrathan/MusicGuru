"use client";
import Link from 'next/link'
import { Music } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
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
        <Link className="flex items-center justify-center" href="/">
          <Music className="h-6 w-6 mr-2 text-blue-300" />
          <span className="font-bold text-blue-100">MusicGuru</span>
        </Link>
      </header>

      <main className="flex-1 relative">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="glass-effect rounded-lg p-8 space-y-8">
            <h1 className="text-3xl font-bold gradient-text mb-8">Privacy Policy</h1>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">Introduction</h2>
              <p className="text-blue-200">
                At MusicGuru, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our music streaming platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">Information We Collect</h2>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-blue-200">Personal Information</h3>
                <ul className="list-disc list-inside text-blue-300 space-y-2">
                  <li>Email address and account credentials</li>
                  <li>Profile information and preferences</li>
                  <li>Payment information when subscribing to premium features</li>
                  <li>Playlist data and music preferences</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-blue-200">Usage Information</h3>
                <ul className="list-disc list-inside text-blue-300 space-y-2">
                  <li>Listening history and patterns</li>
                  <li>Interaction with other users and playlists</li>
                  <li>Device information and IP addresses</li>
                  <li>Time spent using our services</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-blue-300 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To personalize your music experience</li>
                <li>To process your transactions</li>
                <li>To communicate with you about updates and promotions</li>
                <li>To analyze and improve our platform</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>


            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">Contact Us</h2>
              <p className="text-blue-200">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-blue-300">privacy@musicguru.com</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">Updates to This Policy</h2>
              <p className="text-blue-200">
  At MusicGuru, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our music streaming platform, providing utmost transparency in our practices and &quot;guaranteeing&quot; your data&apos;s protection.
</p>
              <p className="text-blue-300">Last Updated: December 28, 2024</p>
            </section>
          </div>
        </div>
      </main>

      <footer className="relative flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-400/20 glass-effect">
        <p className="text-xs text-blue-300">© 2025 MusicGuru. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-blue-200 text-blue-300 transition-colors" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-blue-200 text-blue-300 transition-colors" href="/privacy">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
