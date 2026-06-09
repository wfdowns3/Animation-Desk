'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FounderCounter from '@/components/FounderCounter'

export default function FoundersEditionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [depositAmount, setDepositAmount] = useState<1000 | 2500>(1000)
  const [error, setError] = useState('')

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), amount: depositAmount }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setIsLoading(false)
        return
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch {
      setError('Network error. Please check your connection and try again.')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navigation />

      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, #2A1F0A 0%, #1A1408 30%, #0A0A0A 70%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#C8A96E 1px, transparent 1px), linear-gradient(90deg, #C8A96E 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
            aria-hidden="true"
          />
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="relative container-luxury pt-36 pb-20">
            <p className="label-gold mb-8">Limited to 10</p>
            <h1
              className="font-serif font-light text-text max-w-4xl text-balance mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                lineHeight: '1.05',
                letterSpacing: '-0.02em',
              }}
            >
              Ten desks.{' '}
              <em className="not-italic text-gold">Numbered.</em>
              <br />
              The first we will ever build.
            </h1>
            <p className="body-large max-w-xl">
              Reserve your number with a fully refundable deposit. You will
              help shape the final design. No risk to be early — only the
              reward of being first.
            </p>
          </div>
        </section>

        {/* ── Counter ───────────────────────────────────────────── */}
        <section className="py-16 bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="max-w-md">
              <p className="label-gold mb-6">Availability</p>
              <FounderCounter />
            </div>
          </div>
        </section>

        {/* ── The offer in full ─────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="label-gold mb-6">The offer</p>
                <h2 className="heading-section mb-8 text-balance">
                  What it means to reserve
                  <em className="not-italic text-gold"> a number.</em>
                </h2>
                <div className="space-y-5 text-muted font-sans text-base leading-relaxed">
                  <p>
                    A Founder&apos;s Edition reservation is not a pre-order
                    for a finished product. It is an invitation to be part of
                    creating it.
                  </p>
                  <p>
                    You reserve your number — one through ten — with a
                    refundable deposit. From that point, you are involved. You
                    will receive design updates, respond to questions about your
                    preferences, and choose your finish when the time comes.
                  </p>
                  <p>
                    Your desk will be built and photographed. You will receive
                    those photographs. Your build number will appear on a brass
                    plaque on the desk itself, along with the year it was made.
                  </p>
                  <p className="text-text">
                    Your reservation is refundable until you tell us to build.
                    At that point, a 50% production deposit secures your build
                    slot. The remaining 50% is due before delivery.
                  </p>
                </div>
              </div>

              {/* Image placeholder */}
              <div
                className="img-placeholder w-full"
                style={{
                  aspectRatio: '3/4',
                  background:
                    'radial-gradient(ellipse at 40% 30%, #2A2218 0%, #1A1510 50%, #0A0A0A 100%)',
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                  <div className="border border-gold/20 px-8 py-6 text-center">
                    <p className="label-gold mb-2">No. — of 10</p>
                    <p className="font-serif text-3xl text-gold font-light">
                      Founder&apos;s Edition
                    </p>
                    <p className="text-muted text-xs font-sans mt-2">
                      Animation Desk — MMXXV
                    </p>
                  </div>
                  <p className="text-muted/30 text-xs tracking-widest uppercase font-sans mt-4">
                    Plaque photography coming
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Payment milestones ────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <p className="label-gold mb-12 text-center">Payment structure</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Reservation deposit',
                  amount: '$1,000 – $2,500',
                  timing: 'Today — fully refundable',
                  description:
                    'Secures your number. Refundable any time before you confirm production. No obligation beyond holding your place.',
                },
                {
                  step: '02',
                  title: 'Production deposit',
                  amount: '50% of desk price',
                  timing: 'When design is finalized',
                  description:
                    'Due when you confirm the build — finish, specifications, delivery details. This is when we begin your desk.',
                },
                {
                  step: '03',
                  title: 'Final balance',
                  amount: 'Remaining 50%',
                  timing: 'Before delivery',
                  description:
                    'Due before your desk ships. We will give you thirty days notice before delivery is scheduled.',
                },
              ].map(({ step, title, amount, timing, description }, i) => (
                <div
                  key={step}
                  className={`p-8 border border-border ${i > 0 ? 'border-l-0 md:border-l border-t-0 md:border-t border-border' : ''}`}
                >
                  <p className="label-gold mb-4">{step}</p>
                  <h3 className="font-serif text-xl text-text font-light mb-2">{title}</h3>
                  <p className="text-gold font-serif text-lg font-light mb-1">{amount}</p>
                  <p className="text-muted text-xs font-sans uppercase tracking-wider mb-4">{timing}</p>
                  <p className="text-muted text-sm font-sans leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What you get ──────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <p className="label-gold mb-8 text-center">Founder&apos;s Edition includes</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  'Individually numbered — No. 1 through No. 10',
                  'Your input on finish selection and hardware details',
                  'Build photography — your desk from first cut to final',
                  'Certificate of provenance signed by the maker',
                  'High-CRI variable color temperature light system',
                  'Custom pegbar — brass or steel to your specification',
                  'Bookmatched solid walnut or white oak surface',
                  'White glove delivery — threshold placement',
                  'Access to future Animation Desk releases first',
                  'Priority service for the life of the desk',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="w-4 h-px bg-gold mt-3 flex-shrink-0" />
                    <p className="text-muted text-sm font-sans leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Reservation form ──────────────────────────────────── */}
        <section
          id="reserve"
          className="section-padding bg-surface border-y border-border"
        >
          <div className="container-luxury">
            <div className="max-w-lg mx-auto">
              <p className="label-gold mb-6 text-center">Reserve your number</p>
              <h2 className="heading-section mb-4 text-center text-balance">
                Secure your place.
              </h2>
              <p className="body-base text-center mb-10">
                A fully refundable deposit holds your number. No obligation
                until you confirm production.
              </p>

              <form onSubmit={handleCheckout} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="founder-name"
                    className="block text-xs tracking-widest uppercase font-sans text-muted mb-2"
                  >
                    Your name
                  </label>
                  <input
                    id="founder-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    disabled={isLoading}
                    className="input-luxury"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="founder-email"
                    className="block text-xs tracking-widest uppercase font-sans text-muted mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="founder-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                    className="input-luxury"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans text-muted mb-3">
                    Deposit amount
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {([1000, 2500] as const).map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDepositAmount(amount)}
                        className={`border px-4 py-5 text-left transition-all duration-200 ${
                          depositAmount === amount
                            ? 'border-gold bg-gold/5'
                            : 'border-border hover:border-gold/40'
                        }`}
                      >
                        <p
                          className={`font-serif text-2xl font-light mb-1 ${
                            depositAmount === amount ? 'text-gold' : 'text-text'
                          }`}
                        >
                          ${amount.toLocaleString()}
                        </p>
                        <p className="text-muted text-xs font-sans">
                          {amount === 1000 ? 'Standard hold' : 'Priority hold'}
                        </p>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-muted text-xs font-sans">
                    Both amounts are fully refundable. The higher deposit
                    secures earlier position in the build queue.
                  </p>
                </div>

                {error && (
                  <p className="text-red-400 text-sm font-sans" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !name.trim() || !email.trim()}
                  className="btn-gold w-full mt-2"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border border-background/40 border-t-background rounded-full animate-spin" />
                      Preparing checkout…
                    </span>
                  ) : (
                    `Reserve with $${depositAmount.toLocaleString()} — fully refundable`
                  )}
                </button>

                <p className="text-muted text-xs font-sans text-center leading-relaxed">
                  You will be redirected to Stripe&apos;s secure checkout.
                  Your card is authorized but not charged — the hold is
                  released if you cancel. SSL encrypted. We do not store card
                  details.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto">
              <p className="label-gold mb-10 text-center">Questions</p>
              <div className="space-y-8 divide-y divide-border">
                {[
                  {
                    q: 'What does "fully refundable" actually mean?',
                    a: 'Your reservation deposit is authorized on your card as a hold — similar to a hotel reservation. The hold can be released at any time before you confirm production. At that point, it is cancelled and the funds are never captured. You will never be charged without an explicit confirmation from you.',
                  },
                  {
                    q: 'When will the desks be built?',
                    a: "We are in the final design phase. Founder's Edition build slots will be offered in order of reservation date, once the design is finalized. We will give you at least 60 days notice before asking for the production deposit confirmation.",
                  },
                  {
                    q: 'Can I choose my wood and finish?',
                    a: "Yes. Finish selection happens during the design confirmation phase — before we ask for the production deposit. You'll receive swatches and samples, and you will make the final decision.",
                  },
                  {
                    q: 'What if the desk is not what I expected?',
                    a: 'Your reservation deposit is refundable before production confirmation. After production begins, the standard terms apply — detailed in the purchase agreement you will sign before the production deposit. We build to the specifications confirmed, and we stand behind the work.',
                  },
                  {
                    q: 'Is this a new company? Can I trust you?',
                    a: "Yes, this is a new company. We are transparent about that. We have not built a production unit yet. The Founder's Edition is how we get there — with ten people who want to be part of that process. If that is not right for you, the regular waitlist has no financial commitment at all.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="pt-8 first:pt-0">
                    <h3 className="font-serif text-lg md:text-xl text-text font-light mb-4">
                      {q}
                    </h3>
                    <p className="text-muted text-sm font-sans leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Alternate CTA ─────────────────────────────────────── */}
        <section className="py-16 bg-surface border-t border-border">
          <div className="container-luxury">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="label-gold mb-2">Not ready to commit?</p>
                <p className="font-serif text-2xl text-text font-light">
                  The waitlist costs nothing.
                </p>
              </div>
              <Link href="/#waitlist" className="btn-outline flex-shrink-0">
                Join the free waitlist
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
