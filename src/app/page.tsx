import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WaitlistForm from '@/components/WaitlistForm'
import DeskCard from '@/components/DeskCard'

export const metadata: Metadata = {
  title: 'Animation Desk — The animation desk, reborn as an heirloom.',
  description:
    'A limited line of premium studio furniture for the artists, collectors, and studios keeping hand-drawn animation alive.',
}

const desks = [
  {
    name: 'Flagship Animator\'s Desk',
    tagline: 'The heirloom desk for those preserving hand-drawn storytelling.',
    priceRange: '$9,500 – $14,500',
    description:
      'Built to the proportions and mechanics of the golden-age studio desk. Rotating light disc, precision pegbar, adjustable surface, solid hardwood and steel construction.',
    ctaLabel: 'Join the list',
    ctaHref: '/#waitlist',
    accentLabel: 'The Standard',
    features: [
      'Rotating light disc with variable brightness',
      'Precision pegbar system (Acme standard)',
      'Adjustable surface angle 0–45°',
      'Solid hardwood and brushed steel',
    ],
    variant: 'default' as const,
  },
  {
    name: 'Story Artist Desk',
    tagline: 'A premium desk for storyboarding, writing, and visual development.',
    priceRange: '$5,500 – $8,500',
    description:
      'The creative development workspace. Optimized for the storyboard artist who moves between paper and screen without losing the tactile quality of the craft.',
    ctaLabel: 'Join the list',
    ctaHref: '/#waitlist',
    accentLabel: 'The Versatile',
    features: [
      'Wide surface for storyboard panels',
      'Integrated lighting system',
      'Cable management for hybrid workflows',
      'Multiple finish options',
    ],
    variant: 'default' as const,
  },
  {
    name: "Founder's Edition",
    tagline: 'Numbered, limited to 10. The first desks ever built.',
    priceRange: '$15,000 – $22,000',
    description:
      'Ten desks. Numbered. Reserve your number with a fully refundable deposit and help shape the final design. You will be part of the process from the first sketch.',
    ctaLabel: 'Reserve a number',
    ctaHref: '/founders-edition',
    accentLabel: 'Limited — 10 Only',
    features: [
      'Individually numbered and signed',
      'Input on final design and finish',
      'Build documentation and photography',
      'Fully refundable reservation deposit',
    ],
    variant: 'featured' as const,
  },
]

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main>
        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 60%, #1A1510 0%, #0A0A0A 65%)',
            }}
            aria-hidden="true"
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#C8A96E 1px, transparent 1px), linear-gradient(90deg, #C8A96E 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
            aria-hidden="true"
          />

          <div className="relative container-luxury pt-32 pb-20 text-center">
            <p className="label-gold mb-8 animate-fade-up">
              In development — join the waitlist
            </p>

            <h1
              className="font-serif font-light text-text mb-8 animate-fade-up"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                lineHeight: '1.05',
                letterSpacing: '-0.02em',
                animationDelay: '80ms',
              }}
            >
              The animation desk,
              <br />
              <em className="not-italic text-gold">reborn as an heirloom.</em>
            </h1>

            <p
              className="body-large max-w-2xl mx-auto mb-12 animate-fade-up"
              style={{ animationDelay: '160ms' }}
            >
              A limited line of premium studio furniture for the artists,
              collectors, and studios keeping hand-drawn animation alive.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
              style={{ animationDelay: '240ms' }}
            >
              <Link href="/#waitlist" className="btn-gold">
                Join the waitlist
              </Link>
              <Link href="/story" className="btn-ghost">
                Read the story
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/40">
              <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-muted/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* ── Manifesto Teaser ──────────────────────────────────── */}
        <section className="section-padding border-y border-border bg-surface">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-line mx-auto mb-10" />
              <blockquote>
                <p
                  className="font-serif font-light text-text leading-relaxed"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2.25rem)', lineHeight: '1.5' }}
                >
                  "Most animation moved to screens.{' '}
                  <span className="text-muted">The craft didn't.</span> We build
                  the desk that still believes in paper, pencil, pegbar, and
                  light."
                </p>
              </blockquote>
              <div className="gold-line mx-auto mt-10 mb-10" />
              <Link
                href="/story"
                className="text-gold text-xs tracking-widest uppercase font-sans hover:text-gold-light transition-colors duration-200 inline-flex items-center gap-3"
              >
                Read the full story
                <span className="w-8 h-px bg-gold" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── The Three Desks ───────────────────────────────────── */}
        <section id="desks" className="section-padding">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <p className="label-gold mb-4">Three models</p>
              <h2 className="heading-section text-balance">
                Made to order. Built to last.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {desks.map((desk) => (
                <DeskCard key={desk.name} {...desk} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/desks" className="btn-outline">
                Compare all models
              </Link>
            </div>
          </div>
        </section>

        {/* ── Craft Strip ───────────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: image placeholder */}
              <div
                className="img-placeholder w-full order-2 lg:order-1"
                style={{
                  aspectRatio: '3/2',
                  background:
                    'radial-gradient(ellipse at 60% 40%, #2A2218 0%, #1C1916 50%, #0F0D0B 100%)',
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-px bg-gold/20 mx-auto mb-3" />
                    <p className="text-muted/30 text-xs tracking-widest uppercase font-sans">
                      Process photography coming
                    </p>
                    <div className="w-12 h-px bg-gold/20 mx-auto mt-3" />
                  </div>
                </div>
              </div>

              {/* Right: copy */}
              <div className="order-1 lg:order-2">
                <p className="label-gold mb-6">Materials & craft</p>
                <h2 className="heading-section mb-6 text-balance">
                  Made from material that
                  <em className="not-italic text-gold"> earns its place.</em>
                </h2>
                <p className="body-large mb-8">
                  Every desk is made to order using solid hardwoods, machined
                  steel, and optical-grade diffusion glass. No veneer. No
                  shortcuts. Each piece is numbered, signed, and arrives with a
                  certificate of provenance.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    'Solid white oak or walnut — no veneer',
                    'Precision-machined steel hardware',
                    'Optical diffusion glass for the light disc',
                    'Numbered brass plaque with build date',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                      <p className="text-muted text-sm font-sans">{item}</p>
                    </div>
                  ))}
                </div>
                <Link href="/craft" className="btn-outline">
                  Explore the craft
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing section ───────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center">
              <p className="label-gold mb-6">Pricing</p>
              <h2 className="heading-section mb-8">
                Priced for the serious, not the speculative.
              </h2>
              <p className="body-large mb-6">
                Each desk is made to order. Pricing runs roughly{' '}
                <span className="text-text">$5,000 to $20,000+</span> by model
                and finish. The first edition is in development — your interest
                helps decide what we build first.
              </p>
              <p className="text-muted text-sm font-sans leading-relaxed mb-10 max-w-xl mx-auto">
                No payment is collected at signup. The Founder&apos;s Edition
                deposit is fully refundable. We are building these in order of
                confirmed interest, and we will not start production until we
                have the process right.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/desks" className="btn-outline">
                  See all models
                </Link>
                <Link href="/founders-edition" className="btn-gold">
                  Founder&apos;s Edition — Reserve
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Waitlist CTA ──────────────────────────────────────── */}
        <section
          id="waitlist"
          className="section-padding bg-surface border-y border-border"
        >
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto text-center">
              <p className="label-gold mb-6">Join the waitlist</p>
              <h2 className="heading-section mb-6 text-balance">
                Be among the first to know.
              </h2>
              <p className="body-large mb-10">
                No spam, no marketing cadence. We will email you when we have
                something real to show — and before we open orders to the
                public.
              </p>

              <WaitlistForm
                source="homepage-waitlist"
                layout="row"
                className="max-w-lg mx-auto"
              />

              <p className="mt-6 text-muted text-xs font-sans">
                Takes 10 seconds. No payment required. Unsubscribe any time.
              </p>
            </div>
          </div>
        </section>

        {/* ── Origin teaser ─────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="label-gold mb-6">The origin</p>
                <h2 className="heading-section mb-6 text-balance">
                  It started with a Disney desk
                  <em className="not-italic text-gold"> that nobody built anymore.</em>
                </h2>
                <p className="body-large mb-6">
                  The founder spent years looking for a proper animation desk.
                  Not a tilt-top table. Not a lightbox. The real thing — with a
                  rotating disc, a pegbar, and the weight that tells you
                  it&apos;s built to last.
                </p>
                <p className="body-base mb-10">
                  It didn&apos;t exist. So we decided to build it — not as a
                  nostalgic prop, but as a serious tool for the people still
                  doing serious work by hand.
                </p>
                <Link href="/about" className="btn-ghost">
                  Meet the founder
                </Link>
              </div>

              {/* Image placeholder */}
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
                      Founder photography coming
                    </p>
                    <div className="w-12 h-px bg-gold/20 mx-auto mt-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
