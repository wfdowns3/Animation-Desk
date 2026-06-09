import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    // Basic validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Insert into waitlist (upsert to handle duplicate gracefully)
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .upsert(
        {
          email: normalizedEmail,
          source: source ?? 'unknown',
        },
        {
          onConflict: 'email',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single()

    if (error) {
      console.error('[waitlist] Supabase error:', error)
      // If it's a unique violation it means already signed up — still return success
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: 'Already on the list.' })
      }
      return NextResponse.json(
        { error: 'Could not save your email. Please try again.' },
        { status: 500 }
      )
    }

    // Send welcome email via Resend (non-blocking — don't fail signup if email fails)
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Animation Desk <hello@animationdesk.com>',
          to: normalizedEmail,
          subject: 'You\'re on the list — Animation Desk',
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the list — Animation Desk</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#141414;border:1px solid #2A2520;">
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px;border-bottom:1px solid #2A2520;">
              <p style="margin:0;color:#C8A96E;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">
                Animation Desk
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 24px;color:#F0EBE3;font-size:32px;font-weight:400;line-height:1.2;font-family:Georgia,serif;">
                You&rsquo;re on the list.
              </h1>
              <p style="margin:0 0 20px;color:#6B6259;font-size:16px;line-height:1.6;font-family:Arial,sans-serif;">
                Thank you for joining the Animation Desk waitlist. Your interest matters&nbsp;&mdash; it&rsquo;s what tells us this is worth building.
              </p>
              <p style="margin:0 0 20px;color:#6B6259;font-size:16px;line-height:1.6;font-family:Arial,sans-serif;">
                We are building a limited line of premium studio animation desks. Not replicas. Not lightboxes with tilts. The real thing&nbsp;&mdash; made from solid materials, engineered for the work, built to last.
              </p>
              <p style="margin:0 0 32px;color:#6B6259;font-size:16px;line-height:1.6;font-family:Arial,sans-serif;">
                We will email you before we open orders to the public. That email will be worth reading.
              </p>
              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://animationdesk.com'}/survey?email=${encodeURIComponent(normalizedEmail)}"
                       style="display:inline-block;background-color:#C8A96E;color:#0A0A0A;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;padding:16px 32px;">
                      Answer a few questions →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;color:#6B6259;font-size:13px;line-height:1.5;font-family:Arial,sans-serif;">
                Two minutes. Helps us decide what to build first.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #2A2520;">
              <p style="margin:0;color:#6B6259;font-size:11px;line-height:1.6;font-family:Arial,sans-serif;font-style:italic;">
                A note on honesty: these desks are in development. We have not built a production unit yet. Your interest on the waitlist costs nothing and helps us decide what to build.
              </p>
              <p style="margin:12px 0 0;color:#6B6259;font-size:11px;font-family:Arial,sans-serif;">
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
      }
    } catch (emailError) {
      console.error('[waitlist] Resend error (non-fatal):', emailError)
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[waitlist] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
