'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const DESK_OPTIONS = [
  { value: 'flagship', label: "Flagship Animator's Desk — $9,500–$14,500" },
  { value: 'story-artist', label: 'Story Artist Desk — $5,500–$8,500' },
  { value: 'founders-edition', label: "Founder's Edition — $15,000–$22,000" },
  { value: 'undecided', label: 'Not sure yet — exploring options' },
]

const BUDGET_OPTIONS = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 – $10,000' },
  { value: '10k-15k', label: '$10,000 – $15,000' },
  { value: '15k-20k', label: '$15,000 – $20,000' },
  { value: '20k-plus', label: '$20,000+' },
  { value: 'depends', label: 'Depends on the right product' },
]

const BUYER_OPTIONS = [
  { value: 'individual-animator', label: 'Individual animator — for my own studio' },
  { value: 'individual-collector', label: 'Collector — as an heirloom piece' },
  { value: 'school', label: 'Animation school or program' },
  { value: 'professional-studio', label: 'Professional animation studio' },
  { value: 'gift', label: 'As a gift' },
  { value: 'other', label: 'Other' },
]

const DEPOSIT_OPTIONS = [
  { value: 'yes-now', label: "Yes — I'd reserve a Founder's Edition number today" },
  { value: 'yes-later', label: 'Yes — once the design is finalized' },
  { value: 'maybe', label: "Maybe — depends on what I see" },
  { value: 'no', label: "No — I'll join the free waitlist" },
]

type AnswerMap = { [key: string]: string | boolean }

function SurveyForm() {
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') ?? ''

  const [answers, setAnswers] = useState<AnswerMap>({
    desk_interest: '',
    budget_range: '',
    buyer_type: '',
    deposit_willing: '',
    interview_willing: '',
    open_text: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function setAnswer(key: string, value: string | boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailParam,
          ...answers,
          interview_willing: answers.interview_willing === 'true',
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

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <div className="gold-line mx-auto mb-8" />
        <h2 className="font-serif text-4xl md:text-5xl font-light text-text mb-6">
          Thank you.
        </h2>
        <p className="text-muted text-base font-sans leading-relaxed mb-4">
          Your answers have been saved. They will help us build the desk that
          is right — for you and for the people who will use it.
        </p>
        <p className="text-muted text-sm font-sans leading-relaxed mb-10">
          We will be in touch when we have something real to show. That email
          will be worth opening.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/desks" className="btn-outline">
            Explore the desks
          </Link>
          <Link href="/founders-edition" className="btn-gold">
            Learn about Founder&apos;s Edition
          </Link>
        </div>
        <div className="gold-line mx-auto mt-10" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" noValidate>
      {/* Email confirmation */}
      {emailParam && (
        <div className="border border-border p-5 mb-10">
          <p className="text-muted text-xs font-sans uppercase tracking-wider mb-1">
            Answering as
          </p>
          <p className="text-text font-sans text-sm">{emailParam}</p>
        </div>
      )}

      {/* Q1 */}
      <div className="mb-12">
        <div className="mb-6">
          <p className="label-gold mb-2">Question 1 of 6</p>
          <h2 className="font-serif text-2xl md:text-3xl text-text font-light leading-tight">
            Which desk interests you most?
          </h2>
        </div>
        <div className="space-y-3">
          {DESK_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className={`flex items-center gap-4 border p-5 cursor-pointer transition-all duration-200 ${
                answers.desk_interest === value
                  ? 'border-gold bg-gold/5'
                  : 'border-border hover:border-gold/40'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  answers.desk_interest === value
                    ? 'border-gold bg-gold'
                    : 'border-border'
                }`}
              >
                {answers.desk_interest === value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-background" />
                )}
              </span>
              <input
                type="radio"
                name="desk_interest"
                value={value}
                checked={answers.desk_interest === value}
                onChange={() => setAnswer('desk_interest', value)}
                className="sr-only"
              />
              <span className="text-text text-sm font-sans">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q2 */}
      <div className="mb-12">
        <div className="mb-6">
          <p className="label-gold mb-2">Question 2 of 6</p>
          <h2 className="font-serif text-2xl md:text-3xl text-text font-light leading-tight">
            What is your budget range?
          </h2>
        </div>
        <div className="space-y-3">
          {BUDGET_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className={`flex items-center gap-4 border p-5 cursor-pointer transition-all duration-200 ${
                answers.budget_range === value
                  ? 'border-gold bg-gold/5'
                  : 'border-border hover:border-gold/40'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  answers.budget_range === value
                    ? 'border-gold bg-gold'
                    : 'border-border'
                }`}
              >
                {answers.budget_range === value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-background" />
                )}
              </span>
              <input
                type="radio"
                name="budget_range"
                value={value}
                checked={answers.budget_range === value}
                onChange={() => setAnswer('budget_range', value)}
                className="sr-only"
              />
              <span className="text-text text-sm font-sans">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q3 */}
      <div className="mb-12">
        <div className="mb-6">
          <p className="label-gold mb-2">Question 3 of 6</p>
          <h2 className="font-serif text-2xl md:text-3xl text-text font-light leading-tight">
            Who are you buying for?
          </h2>
        </div>
        <div className="space-y-3">
          {BUYER_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className={`flex items-center gap-4 border p-5 cursor-pointer transition-all duration-200 ${
                answers.buyer_type === value
                  ? 'border-gold bg-gold/5'
                  : 'border-border hover:border-gold/40'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  answers.buyer_type === value
                    ? 'border-gold bg-gold'
                    : 'border-border'
                }`}
              >
                {answers.buyer_type === value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-background" />
                )}
              </span>
              <input
                type="radio"
                name="buyer_type"
                value={value}
                checked={answers.buyer_type === value}
                onChange={() => setAnswer('buyer_type', value)}
                className="sr-only"
              />
              <span className="text-text text-sm font-sans">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q4 */}
      <div className="mb-12">
        <div className="mb-6">
          <p className="label-gold mb-2">Question 4 of 6</p>
          <h2 className="font-serif text-2xl md:text-3xl text-text font-light leading-tight">
            Would you place a refundable deposit to hold a Founder&apos;s Edition number?
          </h2>
          <p className="text-muted text-sm font-sans mt-3">
            $1,000–$2,500 — fully refundable until you confirm production.
          </p>
        </div>
        <div className="space-y-3">
          {DEPOSIT_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className={`flex items-center gap-4 border p-5 cursor-pointer transition-all duration-200 ${
                answers.deposit_willing === value
                  ? 'border-gold bg-gold/5'
                  : 'border-border hover:border-gold/40'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  answers.deposit_willing === value
                    ? 'border-gold bg-gold'
                    : 'border-border'
                }`}
              >
                {answers.deposit_willing === value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-background" />
                )}
              </span>
              <input
                type="radio"
                name="deposit_willing"
                value={value}
                checked={answers.deposit_willing === value}
                onChange={() => setAnswer('deposit_willing', value)}
                className="sr-only"
              />
              <span className="text-text text-sm font-sans">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q5 */}
      <div className="mb-12">
        <div className="mb-6">
          <p className="label-gold mb-2">Question 5 of 6</p>
          <h2 className="font-serif text-2xl md:text-3xl text-text font-light leading-tight">
            Would you be open to a short call with the founder?
          </h2>
          <p className="text-muted text-sm font-sans mt-3">
            30 minutes — to talk about what you need and how we can build it right.
          </p>
        </div>
        <div className="flex gap-4">
          {[
            { value: 'true', label: 'Yes, I would' },
            { value: 'false', label: 'Not right now' },
          ].map(({ value, label }) => (
            <label
              key={value}
              className={`flex-1 flex items-center justify-center gap-3 border p-5 cursor-pointer transition-all duration-200 ${
                answers.interview_willing === value
                  ? 'border-gold bg-gold/5'
                  : 'border-border hover:border-gold/40'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  answers.interview_willing === value
                    ? 'border-gold bg-gold'
                    : 'border-border'
                }`}
              >
                {answers.interview_willing === value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-background" />
                )}
              </span>
              <input
                type="radio"
                name="interview_willing"
                value={value}
                checked={answers.interview_willing === value}
                onChange={() => setAnswer('interview_willing', value)}
                className="sr-only"
              />
              <span className="text-text text-sm font-sans">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q6 */}
      <div className="mb-12">
        <div className="mb-6">
          <p className="label-gold mb-2">Question 6 of 6</p>
          <h2 className="font-serif text-2xl md:text-3xl text-text font-light leading-tight">
            Anything else we should know?
          </h2>
          <p className="text-muted text-sm font-sans mt-3">
            Your use case, your current setup, what made you sign up, what you
            are hoping for. Completely optional.
          </p>
        </div>
        <textarea
          rows={6}
          value={answers.open_text as string}
          onChange={(e) => setAnswer('open_text', e.target.value)}
          placeholder="Tell us whatever feels relevant…"
          className="textarea-luxury"
        />
      </div>

      {status === 'error' && (
        <p className="mb-6 text-red-400 text-sm font-sans" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gold w-full"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border border-background/40 border-t-background rounded-full animate-spin" />
            Saving your answers…
          </span>
        ) : (
          'Submit — complete my signup'
        )}
      </button>

      <p className="mt-6 text-muted text-xs font-sans text-center">
        All questions are optional. Submitting without answering is fine — we
        just appreciate any signal you can give us.
      </p>
    </form>
  )
}

export default function SurveyPage() {
  return (
    <>
      <Navigation />

      <main className="pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Header */}
        <div className="container-luxury mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="label-gold mb-6">Quick survey</p>
            <h1
              className="font-serif font-light text-text text-balance mb-6"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
              }}
            >
              Help us build the right desk.
            </h1>
            <p className="body-large">
              Six questions. Two minutes. Your answers shape what we build
              first and how we build it.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="container-luxury">
          <Suspense fallback={
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-6 h-6 border border-gold/40 border-t-gold rounded-full animate-spin mx-auto" />
            </div>
          }>
            <SurveyForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  )
}
