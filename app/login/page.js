'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Nav from '../../components/Nav'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <>
      <Nav />
      <div className="form-wrap">
        <h1>Welcome back</h1>
        <p style={{fontSize:'16px',color:'#666',marginBottom:'40px',lineHeight:'1.7'}}>Log in to your MEx. account.</p>

        {error && <div style={{background:'#fef2f2',border:'1px solid #fecaca',color:'#dc2626',padding:'12px 16px',borderRadius:'10px',fontSize:'14px',marginBottom:'20px'}}>{error}</div>}

        <div className="form-group">
          <label>Email address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>

        <button onClick={handleLogin} disabled={loading} className="submit-btn">
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p style={{fontSize:'13px',color:'#aaa',textAlign:'center',marginTop:'20px'}}>
          Don't have an account? <Link href="/signup" style={{color:'#1A35D4'}}>Sign up</Link>
        </p>
      </div>
    </>
  )
}
