"use client";
import Link from 'next/link'
import { Music } from 'lucide-react'

export default function TermsOfService() {
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
            <h1 className="text-3xl font-bold gradient-text mb-8">Terms of Service</h1>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">1. Acceptance of Terms</h2>
              <p className="text-blue-200">
  By accessing or using MusicGuru&apos;s services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">2. Description of Service</h2>
              <p className="text-blue-200">
                MusicGuru provides a platform for music streaming and playlist collaboration. We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">3. User Accounts</h2>
              <ul className="list-disc list-inside text-blue-300 space-y-2">
                <li>You must be 13 years or older to use this service.</li>
                <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                <li>You agree to accept responsibility for all activities that occur under your account.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">4. User Content</h2>
              <p className="text-blue-200">
                You retain all rights to any content you submit, post or display on or through the service. By submitting, posting or displaying content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">5. Intellectual Property</h2>
              <p className="text-blue-200">
                The service and its original content, features, and functionality are owned by MusicGuru and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">6. Termination</h2>
              <p className="text-blue-200">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">7. Limitation of Liability</h2>
              <p className="text-blue-200">
                In no event shall MusicGuru, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">8. Governing Law</h2>
              <p className="text-blue-200">
                These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">9. Changes to Terms</h2>
              <p className="text-blue-200">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-100">10. Contact Us</h2>
              <p className="text-blue-200">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-blue-300">legal@musicguru.com</p>
            </section>

            <p className="text-blue-300 mt-8">
              Last updated: December 28, 2024
            </p>
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

