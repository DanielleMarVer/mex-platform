import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, name, company, type } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: { full_name: name, company, account_type: type }
  })

  if (error) return res.status(400).json({ error: error.message })

  return res.status(200).json({ success: true, user: data.user })
}
