import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const { error } = await supabase.from('contact_messages').insert([{
    name,
    email,
    subject,
    message,
    status: 'new',
    created_at: new Date().toISOString()
  }])

  if (error) return res.status(500).json({ error: error.message })

  return res.status(200).json({ success: true })
}
