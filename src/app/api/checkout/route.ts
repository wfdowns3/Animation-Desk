import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
  })
}

const VALID_AMOUNTS = [1000, 2500] // in USD dollars (not cents)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://animationdesk.com'

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  try {
    const body = await request.json()
    const { name, email, amount } = body

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }
    const normalizedEmail = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }
    if (!VALID_AMOUNTS.includes(amount)) {
      return NextResponse.json(
        { error: 'Invalid deposit amount. Must be $1,000 or $2,500.' },
        { status: 400 }
      )
    }

    // Check how many numbers are already reserved
    const { count, error: countError } = await supabaseAdmin
      .from('deposits')
      .select('*', { count: 'exact', head: true })
      .in('status', ['authorized', 'captured'])

    if (countError) {
      console.error('[checkout] Could not check availability:', countError)
      return NextResponse.json(
        { error: 'Could not check availability. Please try again.' },
        { status: 500 }
      )
    }

    if ((count ?? 0) >= 10) {
      return NextResponse.json(
        { error: "All Founder's Edition numbers have been reserved." },
        { status: 409 }
      )
    }

    const amountCents = amount * 100

    // Create Stripe Checkout Session
    // Using manual capture so the card is authorized but not charged —
    // this gives the refundable hold semantics described on the page.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: normalizedEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
            product_data: {
              name: "Founder's Edition Reservation Deposit",
              description: `Fully refundable reservation deposit for Animation Desk Founder's Edition — No. ${(count ?? 0) + 1} of 10`,
              metadata: {
                type: 'founders_edition_deposit',
                desk_number: String((count ?? 0) + 1),
              },
            },
          },
        },
      ],
      payment_intent_data: {
        capture_method: 'manual', // Authorize only — no charge until we confirm
        description: `Animation Desk Founder's Edition Reservation — ${name.trim()}`,
        metadata: {
          customer_name: name.trim(),
          customer_email: normalizedEmail,
          deposit_type: 'founders_edition_reservation',
          desk_number: String((count ?? 0) + 1),
        },
      },
      metadata: {
        customer_name: name.trim(),
        customer_email: normalizedEmail,
        deposit_type: 'founders_edition_reservation',
      },
      success_url: `${BASE_URL}/founders-edition?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/founders-edition?cancelled=1`,
    })

    // Pre-insert a pending deposit record
    const { error: dbError } = await supabaseAdmin.from('deposits').insert({
      email: normalizedEmail,
      name: name.trim(),
      desk_number: (count ?? 0) + 1,
      amount: amountCents,
      stripe_session_id: session.id,
      status: 'pending',
    })

    if (dbError) {
      console.error('[checkout] Failed to create pending deposit record:', dbError)
      // Non-fatal — webhook will upsert on success
    }

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    console.error('[checkout] Unexpected error:', err)
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Payment error: ${err.message}` },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
