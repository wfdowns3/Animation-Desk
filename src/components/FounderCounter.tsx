'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const TOTAL_SPOTS = 10
const FALLBACK_RESERVED = 4

export default function FounderCounter() {
  const [reserved, setReserved] = useState<number>(FALLBACK_RESERVED)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function fetchCount() {
      try {
        const { count, error } = await supabase
          .from('deposits')
          .select('*', { count: 'exact', head: true })
          .in('status', ['authorized', 'captured'])

        if (!error && count !== null) {
          setReserved(Math.min(count, TOTAL_SPOTS))
        }
      } catch {
        // Fall back to hardcoded value on error
      } finally {
        setLoaded(true)
      }
    }

    fetchCount()
  }, [])

  const remaining = TOTAL_SPOTS - reserved
  const pct = (reserved / TOTAL_SPOTS) * 100

  return (
    <div className="w-full">
      {/* Counter display */}
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <span className="font-serif text-4xl md:text-5xl text-gold font-light">
            {remaining}
          </span>
          <span className="text-muted text-sm font-sans ml-2">
            of {TOTAL_SPOTS} numbers remaining
          </span>
        </div>
        <span
          className={`label-gold transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {reserved > 0 ? `${reserved} reserved` : 'Be first'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-px bg-border overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={reserved}
          aria-valuemin={0}
          aria-valuemax={TOTAL_SPOTS}
          aria-label={`${reserved} of ${TOTAL_SPOTS} Founder's Edition numbers reserved`}
        />
      </div>

      {remaining <= 3 && remaining > 0 && (
        <p className="mt-3 text-gold text-xs tracking-wider uppercase font-sans animate-pulse">
          Only {remaining} {remaining === 1 ? 'number' : 'numbers'} left
        </p>
      )}
      {remaining === 0 && (
        <p className="mt-3 text-muted text-xs tracking-wider uppercase font-sans">
          All numbers reserved — join the waitlist for the next edition
        </p>
      )}
    </div>
  )
}
