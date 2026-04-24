'use client'
import { useState } from 'react'
import Nav from '../../components/Nav'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return
    await supabase.from('contact_messages').insert([form])
    setSent(true)
  }

  return (
    <>
      <Nav />
      <div className="page-hero">
        <h1>Get in touch</h1>
        <p>Questions about MEx.? We're here to help.</p>
      </div>

      <div className="form-wrap">
        {sent ? (
          <div style={{textAlign:'center',padding:'40px 0'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>✓</div>
            <h2 style={{fontSize:'24px',fontWeight:600,marginBottom:'8px'}}>Message sent</h2>
            <p style={{color:'#666'}}>We'll get back to you within 1–2 business days.</p>
          </div>
        ) : (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                <option value="">Select a topic</option>
                <option value="general">General enquiry</option>
                <option value="listing">Listing my factory</option>
                <option value="finding">Finding a manufacturer</option>
                <option value="billing">Billing</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="How can we help?" />
            </div>
            <button onClick={handleSubmit} className="submit-btn">Send message</button>
          </>
        )}
      </div>

      <footer style={{borderTop:'1px solid #f0f0f0',padding:'48px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
        <span style={{fontSize:'13px',color:'#aaa'}}>© 2025 MEx. The Manufacturing Exchange</span>
        <div style={{display:'flex',gap:'24px'}}>
          <Link href="/about" style={{fontSize:'13px',color:'#aaa'}}>About</Link>
          <Link href="/faq" style={{fontSize:'13px',color:'#aaa'}}>FAQ</Link>
        </div>
      </footer>
    </>
  )
}
