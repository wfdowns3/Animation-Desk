import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Reservation Confirmed — Founder's Edition",
  description: "Your Founder's Edition number has been reserved.",
  robots: { index: false, follow: false },
}

export default function FoundersEditionSuccessPage() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center">
            <div className="gold-line mx-auto mb-10" />

            <p className="label-gold mb-6">Reservation confirmed</p>
            <h1
              className="font-serif font-light text-text mb-8 text-balance"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: '1.1',
              }}
            >
              Your number is reserved.
            </h1>

            <p className="body-large mb-6">
              Your deposit has been authorized. Your Founder&apos;s Edition
              number is secured.
            </p>

            <p className="text-muted text-sm font-sans leading-relaxed mb-6 max-w-lg mx-auto">
              Your card has been authorized but not charged. The hold is fully
              refundable at any time before you confirm production. You will
              receive a confirmation email shortly.
            </p>

            <p className="text-muted text-sm font-sans leading-relaxed mb-12 max-w-lg mx-auto italic">
              We will be in touch as the design progresses — with updates,
              questions about your preferences, and the moment when it is time
              to confirm your build.
            </p>

            <div className="border border-gold/30 bg-gold/5 p-8 mb-12 text-center">
              <p className="font-serif text-3xl text-gold font-light">
                Thank you for being first.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/story" className="btn-outline">
                Read the story
              </Link>
              <Link href="/craft" className="btn-ghost">
                See how it&apos;s built
              </Link>
            </div>

            <div className="gold-line mx-auto mt-12" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
