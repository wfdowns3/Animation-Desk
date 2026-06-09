import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const resend = new Resend(process.env.RESEND_API_KEY)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://animationdesk.com'

// Disable body parsing — Stripe requires the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'No Stripe signature found.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const rawBody = await request.text()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 })
  }

  console.log(`[webhook] Received event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        const email = session.metadata?.customer_email ?? session.customer_email ?? null
        const customerName = session.metadata?.customer_name ?? null
        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id ?? null

        // Update the deposit record to 'authorized' status
        if (session.id) {
          const { error: updateError } = await supabaseAdmin
            .from('deposits')
            .update({
              status: 'authorized',
              stripe_payment_intent: paymentIntentId,
            })
            .eq('stripe_session_id', session.id)

          if (updateError) {
            console.error('[webhook] Failed to update deposit record:', updateError)
          }
        }

        // If the deposit record doesn't exist yet (race condition), upsert it
        if (email) {
          const { data: existingDeposit } = await supabaseAdmin
            .from('deposits')
            .select('id')
            .eq('stripe_session_id', session.id)
            .single()

          if (!existingDeposit) {
            const amountCents = session.amount_total ?? 0
            const { error: insertError } = await supabaseAdmin
              .from('deposits')
              .insert({
                email,
                name: customerName,
                amount: amountCents,
                stripe_session_id: session.id,
                stripe_payment_intent: paymentIntentId,
                status: 'authorized',
              })
            if (insertError) {
              console.error('[webhook] Failed to insert deposit on fallback:', insertError)
            }
          }

          // Also ensure they are on the waitlist
          await supabaseAdmin
            .from('waitlist')
            .upsert(
              { email, source: 'founders-edition-deposit' },
              { onConflict: 'email', ignoreDuplicates: true }
            )

          // Send confirmation email to customer
          try {
            if (process.env.RESEND_API_KEY) {
              const amountDollars = (session.amount_total ?? 0) / 100

              await resend.emails.send({
                from: 'Animation Desk <hello@animationdesk.com>',
                to: email,
                subject: "Your Founder's Edition reservation — Animation Desk",
                html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Founder's Edition reservation confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#141414;border:1px solid #2A2520;">
          <tr>
            <td style="padding:40px 40px 20px;border-bottom:1px solid #C8A96E;">
              <p style="margin:0;color:#C8A96E;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Animation Desk</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 8px;color:#C8A96E;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Founder's Edition</p>
              <h1 style="margin:0 0 24px;color:#F0EBE3;font-size:32px;font-weight:400;line-height:1.2;font-family:Georgia,serif;">
                Your number is reserved${customerName ? `, ${customerName.split(' ')[0]}` : ''}.
              </h1>
              <p style="margin:0 0 20px;color:#6B6259;font-size:16px;line-height:1.6;font-family:Arial,sans-serif;">
                Your $${amountDollars.toLocaleString()} deposit has been authorized. Your Founder's Edition number is secured.
              </p>
              <p style="margin:0 0 20px;color:#6B6259;font-size:16px;line-height:1.6;font-family:Arial,sans-serif;">
                Your card has been authorized but not charged. The hold is fully refundable at any time before you confirm production.
              </p>
              <p style="margin:0 0 32px;color:#6B6259;font-size:16px;line-height:1.6;font-family:Arial,sans-serif;">
                We will be in touch as the design progresses — with updates, questions about your preferences, and the moment when it is time to confirm your build.
              </p>
              <p style="margin:0 0 0;color:#F0EBE3;font-size:14px;font-family:Arial,sans-serif;font-style:italic;">
                Thank you for being first.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #2A2520;">
              <p style="margin:0 0 8px;color:#6B6259;font-size:11px;font-family:Arial,sans-serif;font-style:italic;">
                Your deposit is refundable until you confirm production. If you have questions or want to cancel, reply to this email.
              </p>
              <p style="margin:0;color:#6B6259;font-size:11px;font-family:Arial,sans-serif;">
                &copy; ${new Date().getFullYear()} Animation Desk &bull;
                <a href="mailto:hello@animationdesk.com" style="color:#6B6259;">hello@animationdesk.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
                `.trim(),
              })

              // Notify founder
              await resend.emails.send({
                from: 'Animation Desk <hello@animationdesk.com>',
                to: 'hello@animationdesk.com',
                subject: `New Founder's Edition deposit — $${(session.amount_total ?? 0) / 100}`,
                html: `
<p><strong>New Founder's Edition deposit authorized.</strong></p>
<table cellpadding="4">
  <tr><td><strong>Name:</strong></td><td>${customerName ?? '—'}</td></tr>
  <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
  <tr><td><strong>Amount:</strong></td><td>$${(session.amount_total ?? 0) / 100}</td></tr>
  <tr><td><strong>Session ID:</strong></td><td>${session.id}</td></tr>
  <tr><td><strong>Payment Intent:</strong></td><td>${paymentIntentId ?? '—'}</td></tr>
</table>
<p>Card is authorized but not captured. Visit the <a href="${BASE_URL}/dashboard">dashboard</a> to review.</p>
                `.trim(),
              })
            }
          } catch (emailError) {
            console.error('[webhook] Resend error (non-fatal):', emailError)
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const email =
          paymentIntent.metadata?.customer_email ?? null

        // Update deposit status to cancelled on payment failure
        if (paymentIntent.id) {
          await supabaseAdmin
            .from('deposits')
            .update({ status: 'cancelled' })
            .eq('stripe_payment_intent', paymentIntent.id)
        }

        console.log(`[webhook] Payment failed for ${email ?? 'unknown'}`)
        break
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        if (paymentIntent.id) {
          await supabaseAdmin
            .from('deposits')
            .update({ status: 'cancelled' })
            .eq('stripe_payment_intent', paymentIntent.id)
        }
        break
      }

      default:
        console.log(`[webhook] Unhandled event type: ${event.type}`)
    }
  } catch (handlerError) {
    console.error('[webhook] Error handling event:', handlerError)
    // Return 200 to acknowledge receipt — don't let Stripe retry unnecessarily
  }

  return NextResponse.json({ received: true })
}
