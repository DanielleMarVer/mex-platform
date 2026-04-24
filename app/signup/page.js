'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Nav from '../../components/Nav'
import { supabase } from '../../lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '', name: '', company: '', type: 'brand' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSignup() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.name, company: form.company, account_type: form.type } }
    })
    if (error) { setError(error.message); setLoading(false) }
    else setDone(true)
  }

  if (done) return (
    <>
      <Nav />
      <div className="form-wrap" style={{textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>✉️</div>
        <h1>Check your email</h1>
        <p style={{fontSize:'16px',color:'#666',marginTop:'12px',lineHeight:'1.7'}}>
          We've sent a confirmation link to <strong>{form.email}</strong>. Click the link to activate your account.
        </p>
      </div>
    </>
  )

  return (
    <>
      <Nav />
      <div className="form-wrap">
        <h1>Create your account</h1>
        <p style={{fontSize:'16px',color:'#666',marginBottom:'40px',lineHeight:'1.7'}}>Join MEx. to connect with verified manufacturers worldwide.</p>

        {error && <div style={{background:'#fef2f2',border:'1px solid #fecaca',color:'#dc2626',padding:'12px 16px',borderRadius:'10px',fontSize:'14px',marginBottom:'20px'}}>{error}</div>}

        <div className="form-group">
          <label>I am a</label>
          <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            <option value="brand">Brand / Buyer</option>
            <option value="factory">Factory / Manufacturer</option>
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Full name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company name" />
          </div>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Min. 8 characters" />
        </div>

        <button onClick={handleSignup} disabled={loading} className="submit-btn">
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p style={{fontSize:'13px',color:'#aaa',textAlign:'center',marginTop:'20px'}}>
          Already have an account? <Link href="/login" style={{color:'#1A35D4'}}>Log in</Link>
        </p>
      </div>
    </>
  )
}
