import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WaitlistForm from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'The Desks',
  description:
    'Three models. Made to order. The Flagship Animator\'s Desk, Story Artist Desk, and Founder\'s Edition — each built for a different kind of serious.',
}

const desks = [
  {
    id: 'flagship',
    number: '01',
    name: "Flagship Animator's Desk",
    label: 'The Standard',
    tagline: 'The heirloom desk for those preserving hand-drawn storytelling.',
    priceRange: '$9,500 – $14,500',
    cta: { label: 'Join the waitlist', href: '/#waitlist', variant: 'outline' },
    description: [
      'The full-size professional animation desk, built to the ergonomic and mechanical standards of the golden-age studio environment. This is the desk you use when paper animation is your primary practice — designed to be at the center of your workspace for decades.',
      'Every dimension and mechanism reflects how animators have worked since the medium was invented. The rotating light disc, precision pegbar system, adjustable surface angle, and the mass of solid hardwood and machined steel all exist for reasons that were worked out over generations of use.',
    ],
    specs: [
      { label: 'Surface', value: '34" × 26" — adjustable 0–45°' },
      { label: 'Light disc', value: '12" diameter — variable brightness, 5000K daylight' },
      { label: 'Pegbar', value: 'Acme standard — removable, repositionable' },
      { label: 'Materials', value: 'Solid white oak or walnut, brushed steel, optical glass' },
      { label: 'Finish options', value: 'Natural oiled, darkened oil, ebonized' },
      { label: 'Hardware', value: 'All machined steel — no plastic components' },
      { label: 'Dimensions', value: '52"W × 36"D × 36–44"H (adjustable)' },
      { label: 'Weight', value: 'Approx. 180 lbs assembled' },
    ],
    features: [
      'Rotating light disc with precision bearing — smooth rotation under any load',
      'Acme-standard pegbar system — compatible with standard animation paper',
      'Adjustable surface height — works seated or standing',
      'Full surface adjustment to 45° — erect for lightbox mode',
      'Integrated power management for light system',
      'Solid hardwood construction — no veneers, no MDF',
      'Removable crossbar storage rail for paper and reference',
      'Numbered brass plaque — signed by maker',
    ],
  },
  {
    id: 'story-artist',
    number: '02',
    name: 'Story Artist Desk',
    label: 'The Versatile',
    tagline: 'A premium desk for storyboarding, writing, and visual development.',
    priceRange: '$5,500 – $8,500',
    cta: { label: 'Join the waitlist', href: '/#waitlist', variant: 'outline' },
    description: [
      'The story artist does not live at the animation desk — they move between it and the writing room, the room where ideas become sequences, and the room where sequences become boards. This desk is designed for that kind of work.',
      "It carries the same material quality and construction philosophy as the Flagship, but with a wider, shallower surface optimized for storyboard panels and visual development work. The light system is there when you need it. When you don't, it disappears.",
    ],
    specs: [
      { label: 'Surface', value: '40" × 28" — wide format for storyboard panels' },
      { label: 'Light disc', value: '10" diameter — recessed flush with surface' },
      { label: 'Pegbar', value: 'Optional — top-mounted or removable' },
      { label: 'Materials', value: 'Solid white oak or walnut, brushed steel' },
      { label: 'Finish options', value: 'Natural oiled, darkened oil' },
      { label: 'Cable management', value: 'Integrated — for hybrid digital/paper workflows' },
      { label: 'Dimensions', value: '56"W × 34"D × 34–44"H (adjustable)' },
      { label: 'Weight', value: 'Approx. 150 lbs assembled' },
    ],
    features: [
      'Wide surface for multi-panel storyboard spreads',
      'Flush-mounted light disc — unobtrusive when not in use',
      'Integrated cable management for monitor and tablet',
      'Optional pegbar — top or bottom mount',
      'Adjustable height for seated and standing work',
      'Open shelf below surface for reference materials',
      'Same material standards as the Flagship',
      'Numbered and signed',
    ],
  },
  {
    id: 'founders-edition',
    number: '03',
    name: "Founder's Edition",
    label: 'Limited — 10 Only',
    tagline: 'Numbered, limited to 10. The first desks ever built.',
    priceRange: '$15,000 – $22,000',
    cta: { label: 'Reserve a number', href: '/founders-edition', variant: 'gold' },
    description: [
      'Ten desks. Numbered one through ten. The first Animation Desks ever built. Each Founder\'s Edition owner will be involved in the final design process — choosing their finish, providing input on details, and receiving build documentation as their desk is made.',
      'The Founder\'s Edition is not an upgrade to the Flagship — it is a different object. It reflects the best materials we can source and the most considered execution we can deliver on a first build. It is for the person who wants to be part of what this becomes, not just a customer of it.',
    ],
    specs: [
      { label: 'Surface', value: '36" × 28" — adjustable 0–50°' },
      { label: 'Light disc', value: '14" diameter — high-CRI, variable color temperature' },
      { label: 'Pegbar', value: 'Custom machined — brass or steel — your choice' },
      { label: 'Materials', value: 'Bookmatched solid walnut or white oak, polished steel' },
      { label: 'Finish options', value: 'Bespoke — decided with owner' },
      { label: 'Engraving', value: 'Numbered brass plaque — "No. X of 10" — build year' },
      { label: 'Certification', value: 'Certificate of provenance, signed' },
      { label: 'Delivery', value: 'White glove — threshold delivery and placement' },
    ],
    features: [
      'Individually numbered and signed — No. 1 through No. 10',
      'Owner input on finish, hardware finish, and details',
      'Build photography — your desk documented from first cut',
      'Certificate of provenance with maker signature',
      'High-CRI variable color temperature light system',
      'Custom pegbar — brass or steel to your specification',
      'White glove delivery — threshold placement',
      'Fully refundable reservation deposit until production confirmed',
    ],
  },
]

export default function DesksPage() {
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
            <p className="label-gold mb-6">Three models</p>
            <h1
              className="font-serif font-light text-text max-w-3xl text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 5rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
              }}
            >
              Each desk is made to order.{' '}
              <em className="not-italic text-gold">None are in stock.</em>
            </h1>
            <p className="body-large mt-6 max-w-xl">
              We build after you order. That is how you get a desk that is
              right, not a desk that is ready.
            </p>
          </div>
        </section>

        {/* ── Desk sections ─────────────────────────────────────── */}
        {desks.map((desk, idx) => (
          <section
            key={desk.id}
            id={desk.id}
            className={`section-padding ${idx % 2 === 1 ? 'bg-surface' : ''} border-t border-border`}
          >
            <div className="container-luxury">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <p className="label-gold mb-3">
                    {desk.number} — {desk.label}
                  </p>
                  <h2
                    className="font-serif font-light text-text text-balance"
                    style={{
                      fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                      lineHeight: '1.1',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {desk.name}
                  </h2>
                  <p className="text-muted text-base italic font-sans mt-3">
                    {desk.tagline}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-gold font-serif text-3xl font-light mb-4">
                    {desk.priceRange}
                  </p>
                  <Link
                    href={desk.cta.href}
                    className={desk.cta.variant === 'gold' ? 'btn-gold' : 'btn-outline'}
                  >
                    {desk.cta.label}
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left: image placeholder */}
                <div
                  className="img-placeholder w-full"
                  style={{
                    aspectRatio: '4/3',
                    background:
                      idx === 2
                        ? 'radial-gradient(ellipse at 40% 35%, #2A2218 0%, #1C1916 50%, #0A0A0A 100%)'
                        : 'radial-gradient(ellipse at 45% 35%, #1E1C1A 0%, #141414 55%, #0A0A0A 100%)',
                  }}
                  aria-hidden="true"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-px bg-gold/20 mx-auto mb-4" />
                      <p className="text-muted/30 text-xs tracking-widest uppercase font-sans">
                        Photography coming
                      </p>
                      <div className="w-16 h-px bg-gold/20 mx-auto mt-4" />
                    </div>
                  </div>
                </div>

                {/* Right: description + features */}
                <div>
                  <div className="space-y-5 mb-10">
                    {desk.description.map((p, i) => (
                      <p key={i} className="text-muted text-base font-sans leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  <h3 className="label-gold mb-5">What it includes</h3>
                  <ul className="space-y-3 mb-10">
                    {desk.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                        <span className="text-muted text-sm font-sans leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Specs table */}
                  <h3 className="label-gold mb-5">Specifications</h3>
                  <div className="border border-border divide-y divide-border">
                    {desk.specs.map(({ label, value }) => (
                      <div key={label} className="flex gap-4 px-5 py-3">
                        <span className="text-muted text-xs font-sans uppercase tracking-wider w-32 flex-shrink-0 pt-0.5">
                          {label}
                        </span>
                        <span className="text-text text-sm font-sans">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-12 pt-10 border-t border-border flex flex-col sm:flex-row gap-4">
                <Link
                  href={desk.cta.href}
                  className={desk.cta.variant === 'gold' ? 'btn-gold' : 'btn-outline'}
                >
                  {desk.cta.label}
                </Link>
                <Link href="/craft" className="btn-ghost">
                  See how it&apos;s built
                </Link>
              </div>
            </div>
          </section>
        ))}

        {/* ── Comparison note ───────────────────────────────────── */}
        <section className="section-padding border-t border-border">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto text-center">
              <p className="label-gold mb-6">A note on pricing</p>
              <h2 className="heading-section mb-6 text-balance">
                Each desk is made to order.
              </h2>
              <p className="body-large mb-6">
                Pricing ranges reflect different finish selections and
                configuration options. Every desk starts as a made-to-order
                piece. We do not carry inventory.
              </p>
              <p className="text-muted text-sm font-sans leading-relaxed mb-10 max-w-xl mx-auto">
                For institutional pricing on multiple units, use the quote
                request form. For custom specifications outside the ranges
                listed here, email us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#waitlist" className="btn-gold">
                  Join the waitlist
                </Link>
                <Link href="/institutions" className="btn-outline">
                  Request institutional quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Waitlist ──────────────────────────────────────────── */}
        <section className="section-padding bg-surface border-t border-border">
          <div className="container-luxury">
            <div className="max-w-lg mx-auto text-center">
              <p className="label-gold mb-4">Stay informed</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-text mb-6">
                We&apos;ll tell you first.
              </h2>
              <p className="body-base mb-8">
                Join the list and we will email you before we open orders to
                the public.
              </p>
              <WaitlistForm source="desks-page" layout="stack" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
