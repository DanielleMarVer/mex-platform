import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  // Verify the token
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return res.status(401).json({ error: 'Invalid token' })

  // Get user's enquiries
  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('*')
    .eq('sender_email', user.email)
    .order('created_at', { ascending: false })
    .limit(20)

  return res.status(200).json({
    user: {
      email: user.email,
      name: user.user_metadata?.full_name,
      company: user.user_metadata?.company,
      type: user.user_metadata?.account_type
    },
    enquiries: enquiries || []
  })
}
