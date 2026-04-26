import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { factory_id, factory_name, factory_email, sender_name, sender_email, company, message } = req.body

  if (!sender_name || !sender_email || !message || !factory_name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // 1. Save enquiry to database
  const { error: dbError } = await supabase.from('enquiries').insert([{
    factory_id: factory_id || null,
    factory_name,
    sender_name,
    sender_email,
    company,
    message,
    status: 'new',
    created_at: new Date().toISOString()
  }])

  if (dbError) {
    console.error('DB error:', dbError)
    return res.status(500).json({ error: 'Failed to save enquiry' })
  }

  // 2. Send email notification via Resend
  // Works once RESEND_API_KEY is added to Vercel environment variables
  if (process.env.RESEND_API_KEY) {
    try {
      const toEmail = factory_email || 'contact@themanufacturingexchange.com'
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'MEx. <contact@themanufacturingexchange.com>',
          to: [toEmail],
          reply_to: sender_email,
          subject: `New enquiry from ${company || sender_name} via MEx.`,
          html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
            <h2 style="color:#111;">You have a new enquiry on MEx.</h2>
            <div style="background:#f5f7ff;border-radius:12px;padding:24px;margin:24px 0;">
              <p><strong>From:</strong> ${sender_name} ${company ? '(' + company + ')' : ''}</p>
              <p><strong>Email:</strong> <a href="mailto:${sender_email}">${sender_email}</a></p>
              <p><strong>Message:</strong></p>
              <p style="color:#333;">${message}</p>
            </div>
            <a href="mailto:${sender_email}" style="background:#1A35D4;color:#fff;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:500;">Reply to enquiry</a>
            <p style="color:#aaa;font-size:12px;margin-top:32px;">Sent via <a href="https://themanufacturingexchange.com" style="color:#1A35D4;">MEx. The Manufacturing Exchange</a></p>
          </div>`
        })
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
    }
  }

  return res.status(200).json({ success: true })
}
