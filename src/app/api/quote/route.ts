import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { institution, contact_name, email, units, timeline, notes } = body

    // Validation
    if (!institution || typeof institution !== 'string') {
      return NextResponse.json(
        { error: 'Institution name is required.' },
        { status: 400 }
      )
    }
    if (!contact_name || typeof contact_name !== 'string') {
      return NextResponse.json(
        { error: 'Contact name is required.' },
        { status: 400 }
      )
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

    const unitsInt =
      units !== null && units !== undefined && units !== '' ? parseInt(units, 10) : null

    // Insert quote request
    const { data, error } = await supabaseAdmin
      .from('quote_requests')
      .insert({
        institution: institution.trim(),
        contact_name: contact_name.trim(),
        email: normalizedEmail,
        units: isNaN(unitsInt as number) ? null : unitsInt,
        timeline: timeline ?? null,
        notes: notes?.trim() ?? null,
      })
      .select()
      .single()

    if (error) {
      console.error('[quote] Supabase error:', error)
      return NextResponse.json(
        { error: 'Could not save your request. Please try again.' },
        { status: 500 }
      )
    }

    // Notify founder via Resend (non-blocking)
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Animation Desk <hello@animationdesk.com>',
          to: 'hello@animationdesk.com',
          replyTo: normalizedEmail,
          subject: `Quote request from ${institution.trim()}`,
          html: `
<p><strong>New institutional quote request</strong></p>
<table cellpadding="4">
  <tr><td><strong>Institution:</strong></td><td>${institution.trim()}</td></tr>
  <tr><td><strong>Contact:</strong></td><td>${contact_name.trim()}</td></tr>
  <tr><td><strong>Email:</strong></td><td>${normalizedEmail}</td></tr>
  <tr><td><strong>Units:</strong></td><td>${unitsInt ?? 'Not specified'}</td></tr>
  <tr><td><strong>Timeline:</strong></td><td>${timeline ?? 'Not specified'}</td></tr>
  <tr><td><strong>Notes:</strong></td><td>${notes?.trim() ?? '—'}</td></tr>
</table>
<p>Reply directly to this email to respond to ${contact_name.trim()}.</p>
          `.trim(),
        })

        // Send confirmation to requester
        await resend.emails.send({
          from: 'Animation Desk <hello@animationdesk.com>',
          to: normalizedEmail,
          subject: `Your quote request — Animation Desk`,
          html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Quote request received</title></head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#141414;border:1px solid #2A2520;">
          <tr>
            <td style="padding:40px 40px 20px;border-bottom:1px solid #2A2520;">
              <p style="margin:0;color:#C8A96E;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Animation Desk</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 24px;color:#F0EBE3;font-size:28px;font-weight:400;line-height:1.2;font-family:Georgia,serif;">
                Request received, ${contact_name.trim()}.
              </h1>
              <p style="margin:0 0 20px;color:#6B6259;font-size:16px;line-height:1.6;font-family:Arial,sans-serif;">
                We have received your quote request for ${institution.trim()}. We will respond within two business days with pricing, configuration options, and answers to your questions.
              </p>
              <p style="margin:0 0 0;color:#6B6259;font-size:13px;line-height:1.6;font-family:Arial,sans-serif;">
                If you have urgent questions, reply to this email or reach us at
                <a href="mailto:hello@animationdesk.com" style="color:#C8A96E;">hello@animationdesk.com</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #2A2520;">
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
      }
    } catch (emailError) {
      console.error('[quote] Resend error (non-fatal):', emailError)
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[quote] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
