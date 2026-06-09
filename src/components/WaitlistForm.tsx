'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface WaitlistFormProps {
  source?: string
  placeholder?: string
  className?: string
  buttonLabel?: string
  layout?: 'row' | 'stack'
}

export default function WaitlistForm({
  source = 'homepage',
  placeholder = 'Your email address',
  className = '',
  buttonLabel = 'Join the list',
  layout = 'row',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      router.push(`/survey?email=${encodeURIComponent(email.trim())}`)
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const isLoading = status === 'loading'

  if (layout === 'stack') {
    return (
      <form onSubmit={handleSubmit} className={`w-full ${className}`} noValidate>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            disabled={isLoading}
            className="input-luxury"
            aria-label="Email address"
            autoComplete="email"
          />
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="btn-gold w-full"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border border-background/40 border-t-background rounded-full animate-spin" />
                Joining…
              </span>
            ) : (
              buttonLabel
            )}
          </button>
        </div>
        {status === 'error' && (
          <p className="mt-3 text-sm text-red-400" role="alert">
            {errorMsg}
          </p>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={isLoading}
          className="input-luxury flex-1 min-w-0"
          aria-label="Email address"
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="btn-gold flex-shrink-0"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border border-background/40 border-t-background rounded-full animate-spin" />
              Joining…
            </span>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-400" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  )
}
