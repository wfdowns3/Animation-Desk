import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Materials & Craft',
  description:
    'How Animation Desks are built — the materials, the makers, the methods, and why every decision traces back to the work.',
}

export default function CraftPage() {
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
            <p className="label-gold mb-6">Materials & craft</p>
            <h1
              className="font-serif font-light text-text max-w-3xl text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 5rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
              }}
            >
              Everything in the desk
              <em className="not-italic text-gold"> earns its place.</em>
            </h1>
            <p className="body-large mt-6 max-w-xl">
              We chose every material for a reason. Here is what goes into
              each desk, and why.
            </p>
          </div>
        </section>

        {/* ── Hero image placeholder ─────────────────────────────── */}
        <section className="pb-20 md:pb-28">
          <div
            className="img-placeholder w-full"
            style={{
              aspectRatio: '21/8',
              background:
                'radial-gradient(ellipse at 50% 60%, #2A2218 0%, #1A1814 40%, #0A0A0A 100%)',
            }}
            aria-hidden="true"
          >
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-20 h-px bg-gold/20" />
              <p className="text-muted/30 text-xs tracking-widest uppercase font-sans">
                Material photography coming
              </p>
              <div className="w-20 h-px bg-gold/20" />
            </div>
          </div>
        </section>

        {/* ── Philosophy ────────────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <div className="gold-line mb-10" />
              <p
                className="font-serif font-light text-text leading-relaxed text-balance"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: '1.5' }}
              >
                We are not building furniture. We are building instruments. The
                distinction matters: an instrument is designed around the
                performance it enables. Every dimension, material, and
                mechanism in an Animation Desk traces back to a specific
                requirement of the work.
              </p>
              <div className="gold-line mt-10" />
            </div>
          </div>
        </section>

        {/* ── Wood ──────────────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="label-gold mb-6">The wood</p>
                <h2 className="heading-section mb-8 text-balance">
                  Solid. No veneer.{' '}
                  <span className="text-muted">No exceptions.</span>
                </h2>
                <div className="space-y-5 text-muted font-sans text-base leading-relaxed">
                  <p>
                    Every surface in an Animation Desk is solid hardwood. We
                    use white oak and walnut — both selected for stability,
                    workability, and the way they age. Solid wood moves with
                    humidity and temperature. It can be refinished. It lasts
                    longer than the person who makes it.
                  </p>
                  <p>
                    Veneer looks like wood. It is not. After twenty years of
                    use — after it has been scratched, cleaned, and leaned on
                    — veneer tells the truth about itself. Solid wood tells a
                    different story.
                  </p>
                  <p>
                    MDF is cheaper and more dimensionally stable. We do not
                    use it. A desk that weighs nothing communicates nothing. The
                    mass of the wood is part of what it means to sit at the desk.
                  </p>
                </div>

                <div className="mt-10 space-y-4">
                  {[
                    {
                      species: 'White oak',
                      notes:
                        'Open grain, warm honey tone. Accepts oil finishes beautifully. Our most requested option.',
                    },
                    {
                      species: 'Walnut',
                      notes:
                        'Closed grain, deep brown-chocolate. Richens and darkens with age. The desk that says it has been somewhere.',
                    },
                  ].map(({ species, notes }) => (
                    <div key={species} className="border border-border p-6">
                      <h3 className="font-serif text-lg text-gold font-light mb-2">
                        {species}
                      </h3>
                      <p className="text-muted text-sm font-sans leading-relaxed">{notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wood image placeholder */}
              <div className="space-y-4">
                <div
                  className="img-placeholder w-full"
                  style={{
                    aspectRatio: '4/3',
                    background:
                      'radial-gradient(ellipse at 45% 40%, #2A2010 0%, #1C1610 50%, #0A0A0A 100%)',
                  }}
                  aria-hidden="true"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-muted/30 text-xs tracking-widest uppercase font-sans">
                      Wood photography coming
                    </p>
                  </div>
                </div>
                <p className="text-muted text-xs font-sans text-center italic">
                  Bookmatched white oak — Founder&apos;s Edition surface detail
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Steel ─────────────────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Steel image placeholder */}
              <div className="order-2 lg:order-1">
                <div
                  className="img-placeholder w-full"
                  style={{
                    aspectRatio: '4/3',
                    background:
                      'radial-gradient(ellipse at 55% 40%, #1E1E20 0%, #141416 50%, #0A0A0A 100%)',
                  }}
                  aria-hidden="true"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-muted/30 text-xs tracking-widest uppercase font-sans">
                      Hardware photography coming
                    </p>
                  </div>
                </div>
                <p className="text-muted text-xs font-sans text-center italic mt-4">
                  Machined steel hardware — disc bearing assembly
                </p>
              </div>

              <div className="order-1 lg:order-2">
                <p className="label-gold mb-6">The steel</p>
                <h2 className="heading-section mb-8 text-balance">
                  Machined, not cast.
                  <em className="not-italic text-gold"> Tolerances that matter.</em>
                </h2>
                <div className="space-y-5 text-muted font-sans text-base leading-relaxed">
                  <p>
                    All hardware in an Animation Desk is machined steel. No
                    cast zinc, no pot metal, no plastic. The bearing that
                    supports the rotating light disc is the same grade used in
                    precision instruments.
                  </p>
                  <p>
                    The reason is tactile. A heavy, precisely made mechanism
                    feels different than a light, close-enough one. When you
                    rotate the disc and it moves with the weight it should and
                    stops where you want it to, that feeling is the result of
                    tolerances. We machine to tolerances. We do not stamp and
                    hope.
                  </p>
                  <p>
                    The finish is brushed — not polished. Polished steel shows
                    every fingerprint and every mark. Brushed steel improves
                    with use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── The glass ─────────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <p className="label-gold mb-6 text-center">The glass</p>
              <h2 className="heading-section mb-8 text-center text-balance">
                Optical diffusion.
                <em className="not-italic text-gold"> Not frosted window glass.</em>
              </h2>
              <div className="space-y-5 text-muted font-sans text-base leading-relaxed">
                <p>
                  The light disc uses optical-grade diffusion glass — the same
                  type used in professional photography and cinema lighting
                  equipment. The difference from standard frosted glass is in
                  the uniformity of diffusion and the absence of hot spots.
                </p>
                <p>
                  When you lay a drawing on the disc and light your paper from
                  below, you need the illumination to be even across the full
                  surface. Uneven lighting creates shadows at the edge of the
                  disc that make it harder to see the drawing below. Optical
                  diffusion glass eliminates this.
                </p>
                <p>
                  The light source itself is high-CRI — meaning it renders
                  color accurately rather than washing it out. This matters when
                  you are using colored pencils or checking registration on
                  colored cells.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── The plaque ────────────────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="label-gold mb-6">The plaque</p>
                <h2 className="heading-section mb-8 text-balance">
                  Every desk carries
                  <em className="not-italic text-gold"> its number.</em>
                </h2>
                <div className="space-y-5 text-muted font-sans text-base leading-relaxed">
                  <p>
                    Each desk is numbered. The number is machined into a solid
                    brass plaque, along with the build year and the maker&apos;s
                    signature. It is installed on the desk and does not come off.
                  </p>
                  <p>
                    Numbering is not marketing. It is the record that this
                    object exists as a particular thing, made at a particular
                    time. Fifty years from now, someone will be able to trace
                    the provenance of their desk back to its origin.
                  </p>
                  <p>
                    Every desk also ships with a paper certificate of
                    provenance — a formal document, printed and signed. This
                    is the equivalent of the certificate that comes with a fine
                    watch or a numbered print.
                  </p>
                </div>
              </div>

              {/* Plaque image placeholder */}
              <div
                className="img-placeholder w-full"
                style={{
                  aspectRatio: '1/1',
                  maxWidth: '400px',
                  margin: '0 auto',
                  background:
                    'radial-gradient(ellipse at 50% 40%, #2A2210 0%, #1A1608 50%, #0A0A0A 100%)',
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="border border-gold/30 px-10 py-8 text-center">
                    <div className="w-8 h-px bg-gold/40 mx-auto mb-4" />
                    <p className="text-gold/60 font-serif text-sm tracking-widest">
                      Animation Desk
                    </p>
                    <p className="text-gold font-serif text-2xl font-light my-3">
                      No. — / —
                    </p>
                    <p className="text-muted/60 text-xs font-sans tracking-wider">
                      MMXXV
                    </p>
                    <div className="w-8 h-px bg-gold/40 mx-auto mt-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <p className="label-gold mb-12 text-center">The process</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Material selection',
                  body: 'Each build starts with wood selection. We source boards personally, looking for figure, consistency, and the character that will read across a large surface.',
                },
                {
                  step: '02',
                  title: 'Milling & drying',
                  body: 'Selected lumber is milled to rough dimension and allowed to acclimate and settle. Rushing this step is how you get a desk that moves after delivery.',
                },
                {
                  step: '03',
                  title: 'Joinery & machining',
                  body: 'The wooden elements are jointed, planed, and brought to final dimension. Hardware elements are machined to specification in a separate shop.',
                },
                {
                  step: '04',
                  title: 'Assembly & finish',
                  body: 'The desk is assembled, fitted, and adjusted before finishing. The finish is applied in multiple thin coats, sanded between each, and buffed to a smooth surface.',
                },
              ].map(({ step, title, body }) => (
                <div key={step}>
                  <p className="label-gold mb-4">{step}</p>
                  <h3 className="font-serif text-xl text-text font-light mb-4">{title}</h3>
                  <p className="text-muted text-sm font-sans leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="section-padding bg-surface border-t border-border">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="heading-section mb-6 text-balance">
                Built to be your last desk.
              </h2>
              <p className="body-large mb-10">
                If this is the kind of object you want in your studio, join
                the list. No payment, no pressure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#waitlist" className="btn-gold">
                  Join the waitlist
                </Link>
                <Link href="/desks" className="btn-outline">
                  See the models
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
