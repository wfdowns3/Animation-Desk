import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      desk_interest,
      budget_range,
      buyer_type,
      deposit_willing,
      interview_willing,
      open_text,
    } = body

    // Email is strongly encouraged but not strictly required
    const normalizedEmail =
      email && typeof email === 'string' ? email.trim().toLowerCase() : null

    // Insert survey response
    const { data, error } = await supabaseAdmin
      .from('survey_responses')
      .insert({
        email: normalizedEmail,
        desk_interest: desk_interest ?? null,
        budget_range: budget_range ?? null,
        buyer_type: buyer_type ?? null,
        deposit_willing: deposit_willing ?? null,
        interview_willing:
          interview_willing === true || interview_willing === 'true' ? true : false,
        open_text: open_text?.trim() ?? null,
      })
      .select()
      .single()

    if (error) {
      console.error('[survey] Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Could not save your response. Please try again.' },
        { status: 500 }
      )
    }

    // Mark survey_completed = true on the waitlist entry (if email exists)
    if (normalizedEmail) {
      const { error: updateError } = await supabaseAdmin
        .from('waitlist')
        .update({ survey_completed: true })
        .eq('email', normalizedEmail)

      if (updateError) {
        // Non-fatal — survey was saved, just flag update failed
        console.error('[survey] Could not update survey_completed flag:', updateError)
      }
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[survey] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
