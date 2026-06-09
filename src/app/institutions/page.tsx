'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function InstitutionsPage() {
  const [formData, setFormData] = useState({
    institution: '',
    contact_name: '',
    email: '',
    units: '',
    timeline: '',
    notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formData.institution || !formData.email || !formData.contact_name) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          units: formData.units ? parseInt(formData.units, 10) : null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

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
            <p className="label-gold mb-6">Schools & studios</p>
            <h1
              className="font-serif font-light text-text max-w-3xl text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 5rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
              }}
            >
              Build a program worth
              <em className="not-italic text-gold"> the name.</em>
            </h1>
            <p className="body-large mt-6 max-w-xl">
              For animation schools, film programs, and professional studios
              equipping their teams with tools that match their ambition.
            </p>
          </div>
        </section>

        {/* ── The case for institutions ─────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="label-gold mb-6">Why it matters</p>
                <h2 className="heading-section mb-8 text-balance">
                  The desk teaches before the instructor speaks.
                </h2>
                <div className="space-y-5 text-muted font-sans text-base leading-relaxed">
                  <p>
                    When a student sits at a proper animation desk for the
                    first time, they understand something about the craft that
                    no lecture can convey. The weight, the precision, the
                    relationship between hand and paper — these are transmitted
                    through the object itself.
                  </p>
                  <p>
                    Schools and studios that invest in proper equipment are
                    communicating their values before anyone opens their mouth.
                    That signal matters for recruiting students, retaining
                    faculty, and building a culture that produces serious work.
                  </p>
                  <p>
                    We offer institutional pricing for qualifying programs.
                    We also work with institutions on layout, workflow, and
                    configuration to ensure the desks serve the specific needs
                    of the studio environment.
                  </p>
                </div>
              </div>

              {/* Image placeholder */}
              <div
                className="img-placeholder w-full"
                style={{
                  aspectRatio: '4/3',
                  background:
                    'radial-gradient(ellipse at 40% 35%, #1E1C1A 0%, #141414 55%, #0A0A0A 100%)',
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-px bg-gold/20 mx-auto mb-4" />
                    <p className="text-muted/30 text-xs tracking-widest uppercase font-sans">
                      Studio photography coming
                    </p>
                    <div className="w-16 h-px bg-gold/20 mx-auto mt-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who we work with ──────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-luxury">
            <p className="label-gold mb-12 text-center">Who we work with</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Animation programs',
                  desc: 'University and college animation programs building or upgrading traditional animation facilities. We work with department heads on layout and equipment selection.',
                },
                {
                  title: 'Professional studios',
                  desc: 'Studios maintaining or expanding traditional animation production capacity. We configure for production workflows, not classroom use.',
                },
                {
                  title: 'Film schools',
                  desc: 'Film programs offering traditional animation courses as part of a broader curriculum. Single-room configurations or multi-station labs.',
                },
                {
                  title: 'Independent schools',
                  desc: 'K-12 programs with dedicated animation curriculum. We offer educational pricing and work with smaller budgets where the program is serious.',
                },
                {
                  title: 'Cultural institutions',
                  desc: 'Museums, archives, and restoration programs requiring proper equipment for research and demonstration.',
                },
                {
                  title: 'Corporate studios',
                  desc: 'Brand and marketing studios maintaining hand-drawn capability alongside digital production.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="card-surface p-8">
                  <h3 className="font-serif text-xl text-gold font-light mb-4">{title}</h3>
                  <p className="text-muted text-sm font-sans leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Specs for institutions ────────────────────────────── */}
        <section className="section-padding bg-surface border-y border-border">
          <div className="container-luxury">
            <div className="max-w-4xl mx-auto">
              <p className="label-gold mb-10 text-center">Institutional configuration</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    label: 'Minimum order',
                    value: '2 desks for institutional pricing',
                  },
                  {
                    label: 'Lead time',
                    value: '12–20 weeks per desk (parallel builds available)',
                  },
                  {
                    label: 'Delivery',
                    value: 'Freight delivery with threshold placement, assembly available',
                  },
                  {
                    label: 'Warranty',
                    value: '5 years structural / 2 years electrical',
                  },
                  {
                    label: 'Finish options',
                    value: 'All standard finishes — institutional grade surface protection available',
                  },
                  {
                    label: 'Service',
                    value: 'Annual service program available for institutional accounts',
                  },
                  {
                    label: 'Payment',
                    value: 'Purchase order accepted for qualifying institutions',
                  },
                  {
                    label: 'Custom',
                    value: 'Custom configurations available for specialized workflows',
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-1 h-1 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs tracking-widest uppercase font-sans text-muted mb-1">
                        {label}
                      </p>
                      <p className="text-text text-sm font-sans">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Quote form ────────────────────────────────────────── */}
        <section id="quote" className="section-padding">
          <div className="container-luxury">
            <div className="max-w-xl mx-auto">
              <p className="label-gold mb-6 text-center">Request a quote</p>
              <h2 className="heading-section mb-4 text-center text-balance">
                Tell us about your program.
              </h2>
              <p className="body-base text-center mb-10">
                We will respond within two business days with pricing,
                configuration options, and answers to your questions.
              </p>

              {status === 'success' ? (
                <div className="border border-gold/30 bg-gold/5 p-10 text-center">
                  <div className="gold-line mx-auto mb-6" />
                  <p className="font-serif text-2xl text-text font-light mb-4">
                    Request received.
                  </p>
                  <p className="text-muted text-sm font-sans leading-relaxed mb-6">
                    Thank you for your interest. We will be in touch within
                    two business days with a response tailored to your program.
                  </p>
                  <Link href="/desks" className="btn-outline">
                    Review the desk models
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor="institution"
                      className="block text-xs tracking-widest uppercase font-sans text-muted mb-2"
                    >
                      Institution / Organization *
                    </label>
                    <input
                      id="institution"
                      name="institution"
                      type="text"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="School or studio name"
                      required
                      disabled={status === 'loading'}
                      className="input-luxury"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact_name"
                      className="block text-xs tracking-widest uppercase font-sans text-muted mb-2"
                    >
                      Your name *
                    </label>
                    <input
                      id="contact_name"
                      name="contact_name"
                      type="text"
                      value={formData.contact_name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      disabled={status === 'loading'}
                      className="input-luxury"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs tracking-widest uppercase font-sans text-muted mb-2"
                    >
                      Email address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@institution.edu"
                      required
                      disabled={status === 'loading'}
                      className="input-luxury"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="units"
                      className="block text-xs tracking-widest uppercase font-sans text-muted mb-2"
                    >
                      Number of desks
                    </label>
                    <input
                      id="units"
                      name="units"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.units}
                      onChange={handleChange}
                      placeholder="e.g. 12"
                      disabled={status === 'loading'}
                      className="input-luxury"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-xs tracking-widest uppercase font-sans text-muted mb-2"
                    >
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="input-luxury"
                    >
                      <option value="">Select a timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="3-6mo">3–6 months</option>
                      <option value="6-12mo">6–12 months</option>
                      <option value="12mo+">12+ months / planning phase</option>
                      <option value="exploring">Just exploring options</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-xs tracking-widest uppercase font-sans text-muted mb-2"
                    >
                      Notes / questions
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about your program, your space, your students, your goals…"
                      disabled={status === 'loading'}
                      className="textarea-luxury"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm font-sans" role="alert">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      status === 'loading' ||
                      !formData.institution ||
                      !formData.email ||
                      !formData.contact_name
                    }
                    className="btn-gold w-full"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border border-background/40 border-t-background rounded-full animate-spin" />
                        Sending request…
                      </span>
                    ) : (
                      'Send quote request'
                    )}
                  </button>

                  <p className="text-muted text-xs font-sans text-center">
                    We respond to all institutional inquiries within two business days.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
