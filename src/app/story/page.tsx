import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WaitlistForm from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'The Story',
  description:
    'Before the screens, there was a circle of light. The manifesto behind Animation Desk — and why hand-drawn animation still needs its furniture.',
}

export default function StoryPage() {
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
            <p className="label-gold mb-8">The story</p>
            <h1
              className="font-serif font-light text-text max-w-4xl text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 5rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
              }}
            >
              Before the screens, there was{' '}
              <em className="not-italic text-gold">a circle of light.</em>
            </h1>
          </div>
        </section>

        {/* ── Opening ───────────────────────────────────────────── */}
        <section className="pb-20 md:pb-28">
          <div className="container-luxury">
            <div className="max-w-2xl">
              <div className="gold-line mb-10" />
              <div className="space-y-7 font-sans text-base md:text-lg leading-relaxed text-muted">
                <p className="text-text text-xl md:text-2xl font-light leading-relaxed">
                  A sheet of paper pinned to a pegbar. A disc that turned under
                  your hand so the line always met you at the right angle. A
                  pencil, and the patience to draw the same character a thousand
                  times until it breathed.
                </p>
                <p>
                  That desk built the films we still quote. The ones that
                  defined what animation could be — not as a technology, but as
                  a medium for emotion, time, and human gesture.
                </p>
                <p>
                  Then the work moved to tablets, and the desks were wheeled
                  into storage — the way turntables once were. The craft
                  didn&apos;t leave. It just lost its furniture.
                </p>
                <p className="text-text">We&apos;re building it back.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Image placeholder: the golden age ─────────────────── */}
        <section className="mb-20 md:mb-28">
          <div className="container-luxury">
            <div
              className="img-placeholder w-full"
              style={{
                aspectRatio: '21/9',
                background:
                  'radial-gradient(ellipse at 50% 50%, #2A2218 0%, #1A1814 40%, #0A0A0A 100%)',
              }}
              aria-hidden="true"
            >
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-20 h-px bg-gold/20" />
                <p className="text-muted/30 text-xs tracking-widest uppercase font-sans">
                  Archive photography coming
                </p>
                <div className="w-20 h-px bg-gold/20" />
              </div>
            </div>
            <p className="mt-4 text-muted text-xs font-sans text-center italic">
              A golden-age animation studio. The desk at the center of every frame.
            </p>
          </div>
        </section>

        {/* ── The case for paper ────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="label-gold mb-6">The case for paper</p>
                <h2 className="heading-section mb-8 text-balance">
                  Digital is not better.{' '}
                  <span className="text-muted font-light">It is different.</span>
                </h2>
              </div>
              <div className="space-y-6 text-muted font-sans text-base leading-relaxed">
                <p>
                  The screen erased the physical relationship between the hand
                  and the image. Undo removed the consequence. Layers removed
                  the commitment. The work became safer — and the drawings
                  became more cautious.
                </p>
                <p>
                  Paper doesn&apos;t forgive. It records the thinking, not just
                  the finish. A line on paper carries the weight it was drawn
                  with. A line on a screen weighs nothing.
                </p>
                <p>
                  The artists who insist on paper are not being sentimental.
                  They are being precise. They know that the constraint is the
                  point.
                </p>
                <p className="text-text">
                  A proper desk is the instrument that makes that constraint
                  comfortable to inhabit for hours at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── The desk as instrument ────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto">
              <p className="label-gold mb-6 text-center">The instrument</p>
              <h2 className="heading-section mb-10 text-center text-balance">
                What a real animation desk actually does.
              </h2>

              <div className="space-y-12">
                {[
                  {
                    title: 'The pegbar',
                    body: 'Two pins. That&apos;s all it is. But those pins are how every frame of every hand-drawn animated film was ever registered. The pegbar holds your paper in precisely the same position, frame after frame, so that each drawing finds its ancestor exactly. Without registration, there is no animation — only a pile of drawings.',
                  },
                  {
                    title: 'The light disc',
                    body: 'A circle of light beneath frosted glass. You lay your previous drawing on it and see through to the paper above. The disc rotates so the light source stays where your eyes want it regardless of how the surface is tilted. It turns an act of technical precision into something that feels natural.',
                  },
                  {
                    title: 'The rotating surface',
                    body: 'Every animator rotates the paper. It is one of the fundamental gestures of the craft. The disc lets you rotate without lifting your elbow from the desk surface — which means your line stays controlled while your orientation changes. This is not a convenience. It is a biomechanical requirement for the quality of line.',
                  },
                  {
                    title: 'The mass',
                    body: 'A desk that does not move when you draw is a desk that lets you draw freely. The weight of a real animation desk — solid wood, solid steel — is part of what makes it work. A light desk is a nervous desk. A heavy desk is a confident one.',
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="border-l-2 border-border pl-8">
                    <h3 className="font-serif text-xl md:text-2xl text-gold font-light mb-4">
                      {title}
                    </h3>
                    <p
                      className="text-muted text-base font-sans leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Pull quote ────────────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-line mx-auto mb-10" />
              <blockquote>
                <p
                  className="font-serif font-light text-text leading-relaxed text-balance"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', lineHeight: '1.45' }}
                >
                  "The craft never left. It just lost its furniture. We are
                  building it back — not as a museum piece, but as a working
                  instrument for the people who never stopped believing in the
                  pencil."
                </p>
              </blockquote>
              <div className="gold-line mx-auto mt-10" />
            </div>
          </div>
        </section>

        {/* ── Who this is for ───────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <p className="label-gold mb-8 text-center">Who this is for</p>
            <h2 className="heading-section mb-16 text-center text-balance max-w-2xl mx-auto">
              Not everyone. The right people.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'The working animator',
                  body: 'You still draw on paper. You have always drawn on paper. You have been making do with equipment that was never designed for what you do, and you have been waiting for someone to take the work seriously.',
                },
                {
                  title: 'The animation educator',
                  body: 'You teach the craft as it was developed — with physical registration, real timing, and the discipline of drawing through rather than around. Your students need tools that teach the right habits.',
                },
                {
                  title: 'The serious collector',
                  body: 'You understand that an animation desk is a piece of film history — the same way a fine camera or a Steinway represents a tradition. You want the object that embodies that tradition, built to last another century.',
                },
                {
                  title: 'The studio building culture',
                  body: 'You are building a creative environment where the values are visible in the objects. A proper animation desk tells everyone who sees it what kind of work is done here.',
                },
                {
                  title: 'The returning animator',
                  body: 'You worked in the industry during the golden age, or trained during it. You have the skills and you have the instinct. You want the desk that matches what you know.',
                },
                {
                  title: 'The next generation',
                  body: 'You learned animation digitally. But you have seen the old films and wondered what the hands that made them were doing. You want to find out — properly equipped.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="card-surface p-8">
                  <h3 className="font-serif text-xl text-gold font-light mb-4">
                    {title}
                  </h3>
                  <p className="text-muted text-sm font-sans leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Waitlist CTA ──────────────────────────────────────── */}
        <section className="section-padding bg-surface border-t border-border">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto text-center">
              <p className="label-gold mb-6">Join the waitlist</p>
              <h2 className="heading-section mb-6">
                Stay with the craft.
              </h2>
              <p className="body-large mb-10">
                Join the list for updates as we move from development toward
                the first build. No payment required. No noise.
              </p>
              <WaitlistForm source="story-page" layout="row" className="max-w-lg mx-auto" />
            </div>
          </div>
        </section>

        {/* ── Navigation links ──────────────────────────────────── */}
        <section className="py-16 border-t border-border">
          <div className="container-luxury">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="label-gold mb-2">Next</p>
                <Link
                  href="/desks"
                  className="font-serif text-2xl text-text hover:text-gold transition-colors duration-200"
                >
                  The Desks →
                </Link>
              </div>
              <div className="text-right">
                <p className="label-gold mb-2">Also</p>
                <Link
                  href="/craft"
                  className="font-serif text-2xl text-text hover:text-gold transition-colors duration-200"
                >
                  Materials & Craft →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
