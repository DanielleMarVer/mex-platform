'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import { supabase } from '../../../lib/supabase'

export default function FactoryPage() {
  const { slug } = useParams()
  const [factory, setFactory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', agree: false })

  useEffect(() => {
    if (slug) loadFactory()
  }, [slug])

  async function loadFactory() {
    const { data } = await supabase
      .from('factories')
      .select('*')
      .eq('slug', slug)
      .single()
    setFactory(data)
    setLoading(false)
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message || !form.agree) return
    const { error } = await supabase.from('enquiries').insert([{
      factory_id: factory.id,
      factory_name: factory.name,
      sender_name: form.name,
      sender_email: form.email,
      company: form.company,
      message: form.message,
    }])
    if (!error) setSent(true)
  }

  if (loading) return <><Nav /><div style={{padding:'80px',textAlign:'center',color:'#aaa'}}>Loading...</div></>
  if (!factory) return <><Nav /><div style={{padding:'80px',textAlign:'center',color:'#aaa'}}>Factory not found.</div></>

  const initials = factory.name.split(' ').map(w => w[0]).slice(0,2).join('')

  return (
    <>
      <Nav />

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">{factory.flag || initials}</div>
        <div>
          <div className="profile-name">{factory.name}</div>
          <div className="profile-loc">📍 {factory.location}</div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {(factory.certifications || []).slice(0,4).map(c => (
              <span key={c} style={{background:'rgba(255,255,255,0.15)',color:'#fff',fontSize:'12px',padding:'4px 12px',borderRadius:'20px',border:'1px solid rgba(255,255,255,0.25)'}}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="profile-body">
        {/* Left column */}
        <div>
          <p className="profile-desc">{factory.about}</p>

          {factory.tags?.length > 0 && (
            <>
              <div className="profile-section-title">Products & Specialisms</div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                {factory.tags.map(t => <span key={t} className="cert-pill">{t}</span>)}
              </div>
            </>
          )}

          {factory.certifications?.length > 0 && (
            <>
              <div className="profile-section-title">Certifications</div>
              <div>
                {factory.certifications.map(c => <span key={c} className="cert-pill">{c}</span>)}
              </div>
            </>
          )}

          <div className="profile-section-title">Factory Details</div>
          <div>
            {factory.founded && <div className="info-row"><span className="info-label">Founded</span><span className="info-value">{factory.founded}</span></div>}
            {factory.size && <div className="info-row"><span className="info-label">Size</span><span className="info-value">{factory.size}</span></div>}
            {factory.moq && <div className="info-row"><span className="info-label">Minimum Order</span><span className="info-value">{factory.moq}</span></div>}
            {factory.website && <div className="info-row"><span className="info-label">Website</span><a href={`https://${factory.website}`} target="_blank" rel="noopener noreferrer" style={{color:'#1A35D4',fontWeight:500}}>{factory.website}</a></div>}
            <div className="info-row"><span className="info-label">Country</span><span className="info-value">{factory.country}</span></div>
          </div>
        </div>

        {/* Contact card */}
        <div className="contact-card">
          <h3>Contact {factory.name}</h3>
          <p>Send a direct enquiry to this factory. They typically respond within 2–5 business days.</p>

          {sent ? (
            <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:'10px',padding:'16px',fontSize:'14px',color:'#166534'}}>
              ✓ Your enquiry has been sent successfully!
            </div>
          ) : (
            <>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" style={{width:'100%',padding:'11px 14px',border:'1px solid #e0e0e0',borderRadius:'10px',fontSize:'14px',fontFamily:"'DM Sans',sans-serif",outline:'none',marginBottom:'12px'}} />
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email address" type="email" style={{width:'100%',padding:'11px 14px',border:'1px solid #e0e0e0',borderRadius:'10px',fontSize:'14px',fontFamily:"'DM Sans',sans-serif",outline:'none',marginBottom:'12px'}} />
              <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Brand / company name" style={{width:'100%',padding:'11px 14px',border:'1px solid #e0e0e0',borderRadius:'10px',fontSize:'14px',fontFamily:"'DM Sans',sans-serif",outline:'none',marginBottom:'12px'}} />
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell them what you're looking for..." style={{width:'100%',padding:'11px 14px',border:'1px solid #e0e0e0',borderRadius:'10px',fontSize:'14px',fontFamily:"'DM Sans',sans-serif",outline:'none',marginBottom:'12px',height:'100px',resize:'vertical'}} />
              <div style={{display:'flex',alignItems:'flex-start',gap:'10px',marginBottom:'16px',fontSize:'13px',color:'#555',lineHeight:'1.5'}}>
                <input type="checkbox" checked={form.agree} onChange={e => setForm({...form, agree: e.target.checked})} style={{marginTop:'2px',accentColor:'#1A35D4'}} />
                <span>I agree to the MEx. terms. I understand this factory operates under its own terms and conditions.</span>
              </div>
              <button onClick={handleSubmit} className="send-btn">Send enquiry</button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{borderTop:'1px solid #f0f0f0',padding:'48px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
        <span style={{fontSize:'13px',color:'#aaa'}}>© 2025 MEx. The Manufacturing Exchange</span>
        <div style={{display:'flex',gap:'24px'}}>
          <Link href="/about" style={{fontSize:'13px',color:'#aaa'}}>About</Link>
          <Link href="/contact" style={{fontSize:'13px',color:'#aaa'}}>Contact</Link>
          <Link href="/faq" style={{fontSize:'13px',color:'#aaa'}}>FAQ</Link>
        </div>
      </footer>
    </>
  )
}
