import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WaitlistForm from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The founder behind Animation Desk — why a combat veteran with a vintage Disney desk decided to build the tool that nobody else was making.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative pt-40 pb-24 md:pt-48 md:pb-32">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 30%, #1A1510 0%, #0A0A0A 70%)',
            }}
            aria-hidden="true"
          />
          <div className="relative container-luxury">
            <p className="label-gold mb-6">About</p>
            <h1
              className="font-serif font-light text-text max-w-3xl text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 5rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
              }}
            >
              One person who could not
              <em className="not-italic text-gold"> find the desk.</em>
            </h1>
          </div>
        </section>

        {/* ── Founder story ─────────────────────────────────────── */}
        <section className="pb-20 md:pb-28">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Founder image placeholder */}
              <div
                className="img-placeholder w-full"
                style={{
                  aspectRatio: '3/4',
                  background:
                    'radial-gradient(ellipse at 40% 30%, #1E1C1A 0%, #141414 60%, #0A0A0A 100%)',
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-px bg-gold/20 mx-auto mb-3" />
                    <p className="text-muted/30 text-xs tracking-widest uppercase font-sans">
                      Founder portrait coming
                    </p>
                    <div className="w-12 h-px bg-gold/20 mx-auto mt-3" />
                  </div>
                </div>
              </div>

              <div>
                <div className="gold-line mb-10" />
                <div className="space-y-6 text-muted font-sans text-base leading-relaxed">
                  <p className="text-text text-xl font-light leading-relaxed">
                    The origin of Animation Desk is straightforward: someone
                    wanted a proper animation desk and could not find one.
                  </p>
                  <p>
                    The founder spent years in the military, came back, and
                    started learning traditional animation — seriously, the way
                    the craft was designed to be learned. With paper, pegbars,
                    and the discipline of drawing through rather than around.
                  </p>
                  <p>
                    The problem was the desk. Every option available was a
                    compromise: a lightbox disguised as a desk, a tilt-top table
                    with a pegbar bolted on, or an antique that needed
                    restoration before it was usable. The real thing —
                    engineered for the work, built to last — simply was not
                    being made.
                  </p>
                  <p>
                    The closest thing was a vintage Disney studio desk that
                    came up at auction. It was everything a proper animation
                    desk should be: the right height, the right mass, the right
                    mechanism. And it cost more to restore than most people
                    spend on a car.
                  </p>
                  <p>
                    That experience made clear what the problem actually was.
                    It was not that animators did not want proper desks. It was
                    that no one was making them. So that became the project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── The mission ───────────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <p className="label-gold mb-8 text-center">The mission</p>
              <div className="space-y-8">
                {[
                  {
                    title: 'We build tools, not props.',
                    body: 'An Animation Desk is not a decorative object or a conversation piece. It is a precision instrument for serious work. Everything we build is designed to be used, not displayed.',
                  },
                  {
                    title: 'We are transparent about where we are.',
                    body: 'We have not built a production unit yet. The waitlist and the Founder\'s Edition are how we get there. We say this clearly on every page because the people who belong on this list are the ones who respect honesty about what is real and what is coming.',
                  },
                  {
                    title: 'We build for the long term.',
                    body: 'Every desk is designed to last a century of daily use. The materials, construction methods, and mechanical systems reflect that. This is not a product line that will be revised annually. These desks will still be in studios fifty years from now.',
                  },
                  {
                    title: 'We keep it small on purpose.',
                    body: 'We are not building a factory. We are building a small number of exceptional objects. That is the only way to maintain the standards the work deserves. Scale is not the goal. Quality is the goal.',
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="border-l-2 border-border pl-8">
                    <h3 className="font-serif text-xl md:text-2xl text-gold font-light mb-4">
                      {title}
                    </h3>
                    <p className="text-muted text-base font-sans leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Calendly booking ──────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto text-center">
              <p className="label-gold mb-6">Talk to us</p>
              <h2 className="heading-section mb-6 text-balance">
                We talk to every serious buyer.
              </h2>
              <p className="body-large mb-6">
                If you are considering a desk — for yourself, for your studio,
                or for your program — we want to talk. Not to sell you
                anything, but to understand what you actually need and whether
                we are the right fit.
              </p>
              <p className="text-muted text-sm font-sans leading-relaxed mb-10 max-w-lg mx-auto">
                These conversations also help us build better. Every person we
                talk to teaches us something about the work and the people doing
                it.
              </p>

              {/* Calendly embed placeholder */}
              <div className="border border-border p-12 mb-8 text-center">
                <p className="label-gold mb-4">Schedule a call</p>
                <p className="text-muted text-sm font-sans mb-6">
                  30 minutes. No pitch. Just conversation.
                </p>
                {/* Replace the href below with your actual Calendly link */}
                <a
                  href="https://calendly.com/animationdesk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Book a 30-minute call
                </a>
                <p className="mt-4 text-muted text-xs font-sans">
                  Opens Calendly in a new tab
                </p>
              </div>

              <p className="text-muted text-sm font-sans">
                Prefer email?{' '}
                <a
                  href="mailto:hello@animationdesk.com"
                  className="text-gold hover:text-gold-light transition-colors duration-200"
                >
                  hello@animationdesk.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── Values strip ──────────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {[
                {
                  label: 'What we are',
                  value: 'A small independent maker building precision studio furniture for traditional animation.',
                },
                {
                  label: 'What we are not',
                  value: 'A venture-backed startup. A mass manufacturer. A furniture company that pivoted to animation.',
                },
                {
                  label: 'What we believe',
                  value: 'That hand-drawn animation is not dead. That the craft deserves proper tools. That objects made with care are worth the price of care.',
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="label-gold mb-4">{label}</p>
                  <p className="text-muted text-sm font-sans leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Waitlist ──────────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="max-w-lg mx-auto text-center">
              <p className="label-gold mb-4">Stay informed</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-text mb-6">
                Follow the build.
              </h2>
              <p className="body-base mb-8">
                Join the list for updates as we move from here to the first
                finished desk.
              </p>
              <WaitlistForm source="about-page" layout="stack" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
