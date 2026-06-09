import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Validation Dashboard',
  description: 'Internal dashboard — Animation Desk funnel metrics.',
  robots: { index: false, follow: false },
}

// Revalidate every 60 seconds
export const revalidate = 60

interface Metrics {
  totalSignups: number
  surveyCompletions: number
  surveyRate: number
  deposits: { count: number; totalCents: number }
  quoteRequests: number
  recentSignups: { email: string; source: string | null; created_at: string }[]
  recentDeposits: { email: string | null; amount: number; status: string; created_at: string }[]
  deskInterestBreakdown: { desk_interest: string; count: number }[]
  buyerTypeBreakdown: { buyer_type: string; count: number }[]
}

async function getMetrics(): Promise<Metrics> {
  try {
    const [
      waitlistResult,
      surveyResult,
      depositResult,
      quoteResult,
      recentSignupsResult,
      recentDepositsResult,
      deskInterestResult,
      buyerTypeResult,
    ] = await Promise.all([
      supabaseAdmin.from('waitlist').select('*', { count: 'exact', head: true }),
      supabaseAdmin
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('survey_completed', true),
      supabaseAdmin
        .from('deposits')
        .select('amount, status')
        .in('status', ['authorized', 'captured']),
      supabaseAdmin.from('quote_requests').select('*', { count: 'exact', head: true }),
      supabaseAdmin
        .from('waitlist')
        .select('email, source, created_at')
        .order('created_at', { ascending: false })
        .limit(10),
      supabaseAdmin
        .from('deposits')
        .select('email, amount, status, created_at')
        .order('created_at', { ascending: false })
        .limit(10),
      supabaseAdmin
        .from('survey_responses')
        .select('desk_interest'),
      supabaseAdmin
        .from('survey_responses')
        .select('buyer_type'),
    ])

    const totalSignups = waitlistResult.count ?? 0
    const surveyCompletions = surveyResult.count ?? 0
    const surveyRate =
      totalSignups > 0 ? Math.round((surveyCompletions / totalSignups) * 100) : 0

    const depositRows = depositResult.data ?? []
    const depositCount = depositRows.length
    const depositTotal = depositRows.reduce((sum, d) => sum + (d.amount ?? 0), 0)

    // Build interest breakdown
    const interestMap: Record<string, number> = {}
    for (const row of deskInterestResult.data ?? []) {
      if (row.desk_interest) {
        interestMap[row.desk_interest] = (interestMap[row.desk_interest] ?? 0) + 1
      }
    }
    const deskInterestBreakdown = Object.entries(interestMap)
      .map(([desk_interest, count]) => ({ desk_interest, count }))
      .sort((a, b) => b.count - a.count)

    const buyerMap: Record<string, number> = {}
    for (const row of buyerTypeResult.data ?? []) {
      if (row.buyer_type) {
        buyerMap[row.buyer_type] = (buyerMap[row.buyer_type] ?? 0) + 1
      }
    }
    const buyerTypeBreakdown = Object.entries(buyerMap)
      .map(([buyer_type, count]) => ({ buyer_type, count }))
      .sort((a, b) => b.count - a.count)

    return {
      totalSignups,
      surveyCompletions,
      surveyRate,
      deposits: { count: depositCount, totalCents: depositTotal },
      quoteRequests: quoteResult.count ?? 0,
      recentSignups: recentSignupsResult.data ?? [],
      recentDeposits: recentDepositsResult.data ?? [],
      deskInterestBreakdown,
      buyerTypeBreakdown,
    }
  } catch {
    return {
      totalSignups: 0,
      surveyCompletions: 0,
      surveyRate: 0,
      deposits: { count: 0, totalCents: 0 },
      quoteRequests: 0,
      recentSignups: [],
      recentDeposits: [],
      deskInterestBreakdown: [],
      buyerTypeBreakdown: [],
    }
  }
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function DashboardPage() {
  const m = await getMetrics()

  const funnelSteps = [
    { label: 'Waitlist signups', value: m.totalSignups, pct: 100 },
    {
      label: 'Survey completed',
      value: m.surveyCompletions,
      pct: m.totalSignups > 0 ? Math.round((m.surveyCompletions / m.totalSignups) * 100) : 0,
    },
    {
      label: 'Deposit reserved',
      value: m.deposits.count,
      pct: m.totalSignups > 0 ? Math.round((m.deposits.count / m.totalSignups) * 100) : 0,
    },
  ]

  return (
    <>
      <Navigation />

      <main className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-luxury">
          <div className="mb-12">
            <p className="label-gold mb-3">Internal</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-text mb-3">
              Validation Dashboard
            </h1>
            <p className="text-muted text-sm font-sans">
              Funnel metrics — refreshes every 60 seconds. Not indexed by search engines.
            </p>
          </div>

          {/* ── Top metrics ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              {
                label: 'Total signups',
                value: m.totalSignups.toLocaleString(),
                sub: 'Waitlist entries',
              },
              {
                label: 'Survey rate',
                value: `${m.surveyRate}%`,
                sub: `${m.surveyCompletions} completed`,
              },
              {
                label: 'Deposits',
                value: m.deposits.count.toString(),
                sub: m.deposits.count > 0 ? formatCurrency(m.deposits.totalCents) + ' authorized' : '—',
              },
              {
                label: 'Quote requests',
                value: m.quoteRequests.toLocaleString(),
                sub: 'Institutional',
              },
            ].map(({ label, value, sub }) => (
              <div key={label} className="card-surface p-6">
                <p className="label-gold mb-3">{label}</p>
                <p className="font-serif text-3xl md:text-4xl text-gold font-light mb-1">
                  {value}
                </p>
                <p className="text-muted text-xs font-sans">{sub}</p>
              </div>
            ))}
          </div>

          {/* ── Funnel visualization ──────────────────────────────── */}
          <div className="card-surface p-8 mb-8">
            <h2 className="font-serif text-2xl text-text font-light mb-8">
              Funnel
            </h2>
            <div className="space-y-6">
              {funnelSteps.map(({ label, value, pct }, i) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-muted text-xs font-sans w-4">
                        {i + 1}
                      </span>
                      <span className="text-text text-sm font-sans">{label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gold font-serif text-lg font-light">
                        {value.toLocaleString()}
                      </span>
                      <span className="text-muted text-xs font-sans w-10 text-right">
                        {pct}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-border overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* ── Desk interest ─────────────────────────────────── */}
            <div className="card-surface p-8">
              <h2 className="font-serif text-xl text-text font-light mb-6">
                Desk interest (survey)
              </h2>
              {m.deskInterestBreakdown.length === 0 ? (
                <p className="text-muted text-sm font-sans">No survey data yet.</p>
              ) : (
                <div className="space-y-4">
                  {m.deskInterestBreakdown.map(({ desk_interest, count }) => {
                    const total = m.deskInterestBreakdown.reduce((s, r) => s + r.count, 0)
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0
                    return (
                      <div key={desk_interest}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-muted text-sm font-sans capitalize">
                            {desk_interest.replace(/-/g, ' ')}
                          </span>
                          <span className="text-gold text-sm font-sans">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-0.5 bg-border overflow-hidden">
                          <div
                            className="h-full bg-gold/60"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* ── Buyer type ────────────────────────────────────── */}
            <div className="card-surface p-8">
              <h2 className="font-serif text-xl text-text font-light mb-6">
                Buyer type (survey)
              </h2>
              {m.buyerTypeBreakdown.length === 0 ? (
                <p className="text-muted text-sm font-sans">No survey data yet.</p>
              ) : (
                <div className="space-y-4">
                  {m.buyerTypeBreakdown.map(({ buyer_type, count }) => {
                    const total = m.buyerTypeBreakdown.reduce((s, r) => s + r.count, 0)
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0
                    return (
                      <div key={buyer_type}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-muted text-sm font-sans capitalize">
                            {buyer_type.replace(/-/g, ' ')}
                          </span>
                          <span className="text-gold text-sm font-sans">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-0.5 bg-border overflow-hidden">
                          <div
                            className="h-full bg-gold/60"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ── Recent signups ────────────────────────────────── */}
            <div className="card-surface p-8">
              <h2 className="font-serif text-xl text-text font-light mb-6">
                Recent signups
              </h2>
              {m.recentSignups.length === 0 ? (
                <p className="text-muted text-sm font-sans">No signups yet.</p>
              ) : (
                <div className="divide-y divide-border">
                  {m.recentSignups.map((s, i) => (
                    <div key={i} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-text text-sm font-sans truncate">
                            {s.email}
                          </p>
                          {s.source && (
                            <p className="text-muted text-xs font-sans mt-0.5">
                              {s.source}
                            </p>
                          )}
                        </div>
                        <p className="text-muted text-xs font-sans flex-shrink-0 text-right">
                          {formatDate(s.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Recent deposits ───────────────────────────────── */}
            <div className="card-surface p-8">
              <h2 className="font-serif text-xl text-text font-light mb-6">
                Recent deposits
              </h2>
              {m.recentDeposits.length === 0 ? (
                <p className="text-muted text-sm font-sans">No deposits yet.</p>
              ) : (
                <div className="divide-y divide-border">
                  {m.recentDeposits.map((d, i) => (
                    <div key={i} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-text text-sm font-sans truncate">
                            {d.email ?? '—'}
                          </p>
                          <p className="text-muted text-xs font-sans mt-0.5">
                            {formatCurrency(d.amount)} ·{' '}
                            <span
                              className={
                                d.status === 'authorized' || d.status === 'captured'
                                  ? 'text-green-400'
                                  : 'text-muted'
                              }
                            >
                              {d.status}
                            </span>
                          </p>
                        </div>
                        <p className="text-muted text-xs font-sans flex-shrink-0 text-right">
                          {formatDate(d.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Footer note ───────────────────────────────────────── */}
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-muted text-xs font-sans">
              Data refreshes on page load (ISR: 60s). All timestamps UTC.
              This page is not indexed by search engines and not linked from
              the public site. Data reads use the service role key and bypass
              RLS.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
