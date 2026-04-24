'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Nav from '../components/Nav'

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Angola','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bangladesh','Belarus','Belgium','Bolivia','Bosnia and Herzegovina','Brazil',
  'Bulgaria','Cambodia','Cameroon','Canada','Chile','China','Colombia','Croatia','Czech Republic',
  'Denmark','Egypt','Estonia','Ethiopia','Finland','France','Georgia','Germany','Ghana','Greece',
  'Guatemala','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Italy',
  'Jamaica','Japan','Jordan','Kazakhstan','Kenya','Latvia','Lebanon','Lithuania','Luxembourg',
  'Malaysia','Malta','Mexico','Moldova','Mongolia','Montenegro','Morocco','Myanmar','Nepal',
  'Netherlands','New Zealand','Nigeria','North Macedonia','Norway','Pakistan','Panama','Peru',
  'Philippines','Poland','Portugal','Qatar','Romania','Russia','Saudi Arabia','Senegal','Serbia',
  'Singapore','Slovakia','Slovenia','South Africa','South Korea','Spain','Sri Lanka','Sweden',
  'Switzerland','Taiwan','Tanzania','Thailand','Tunisia','Turkey','Ukraine',
  'United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan',
  'Venezuela','Vietnam','Zimbabwe'
]

export default function HomePage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('')
  const [countryLabel, setCountryLabel] = useState('All countries')
  const [ddOpen, setDdOpen] = useState(false)
  const [ddSearch, setDdSearch] = useState('')

  function handleSearch() {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (country) params.set('country', country)
    router.push(`/factories?${params.toString()}`)
  }

  const filteredCountries = COUNTRIES.filter(c =>
    !ddSearch || c.toLowerCase().includes(ddSearch.toLowerCase())
  )

  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="hero-blue">
        {/* Logo mark */}
        <div style={{marginBottom:'28px'}}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="20" fill="rgba(255,255,255,0.1)"/>
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="36" fontWeight="700" fontFamily="DM Sans">M.</text>
          </svg>
        </div>
        <h1>Connect with manufacturers<br/>around the world</h1>
        <p>MEx. is the global marketplace connecting international brands with verified factories. Search by country, product, or category.</p>

        {/* Search bar */}
        <div style={{display:'flex',maxWidth:'640px',margin:'0 auto',background:'#fff',borderRadius:'50px',padding:'6px 6px 6px 20px',alignItems:'center',position:'relative'}}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search by product or category..."
            style={{flex:1,border:'none',outline:'none',fontSize:'15px',fontFamily:"'DM Sans',sans-serif",color:'#111',background:'transparent',minWidth:0}}
          />
          {/* Country picker */}
          <div style={{position:'relative',borderLeft:'1px solid #eee',flexShrink:0}}>
            <div
              onClick={() => setDdOpen(!ddOpen)}
              style={{display:'flex',alignItems:'center',gap:'6px',padding:'8px 12px',cursor:'pointer',fontSize:'14px',color:'#555',whiteSpace:'nowrap',minWidth:'130px',userSelect:'none'}}
            >
              <span>{countryLabel}</span>
              <svg style={{transition:'transform 0.2s',transform:ddOpen?'rotate(180deg)':''}} width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M1 1l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            {ddOpen && (
              <div style={{position:'absolute',top:'calc(100% + 6px)',right:0,background:'#fff',border:'1px solid #e0e0e0',borderRadius:'14px',boxShadow:'0 8px 32px rgba(0,0,0,0.12)',zIndex:9999,width:'240px',overflow:'hidden'}}>
                <div style={{padding:'10px 12px 8px',borderBottom:'1px solid #f0f0f0'}}>
                  <input
                    autoFocus
                    type="text"
                    value={ddSearch}
                    onChange={e => setDdSearch(e.target.value)}
                    onClick={e => e.stopPropagation()}
                    placeholder="Search country..."
                    style={{width:'100%',border:'1px solid #e0e0e0',borderRadius:'8px',padding:'7px 10px',fontSize:'13px',fontFamily:"'DM Sans',sans-serif",outline:'none',color:'#111'}}
                  />
                </div>
                <div style={{overflowY:'auto',maxHeight:'240px',padding:'4px 0'}}>
                  <div onClick={() => { setCountry(''); setCountryLabel('All countries'); setDdOpen(false); setDdSearch('') }}
                    style={{padding:'9px 16px',fontSize:'14px',color:'#1A35D4',fontWeight:500,cursor:'pointer',borderBottom:'1px solid #f0f0f0'}}>
                    All countries
                  </div>
                  {filteredCountries.map(c => (
                    <div key={c}
                      onClick={() => { setCountry(c); setCountryLabel(c); setDdOpen(false); setDdSearch('') }}
                      style={{padding:'9px 16px',fontSize:'14px',color:'#111',cursor:'pointer'}}
                      onMouseEnter={e => { e.target.style.background='#f5f7ff'; e.target.style.color='#1A35D4' }}
                      onMouseLeave={e => { e.target.style.background=''; e.target.style.color='#111' }}
                    >{c}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={handleSearch} style={{background:'#1A35D4',color:'#fff',border:'none',padding:'10px 24px',borderRadius:'50px',fontSize:'14px',fontFamily:"'DM Sans',sans-serif",cursor:'pointer',fontWeight:500,whiteSpace:'nowrap'}}>
            Search
          </button>
        </div>
      </div>

      {/* Trust bar */}
      <div className="trust-bar">
        <div className="trust-item"><span className="tdot"></span> Verified factories only</div>
        <div className="trust-item"><span className="tdot"></span> ISO · WRAP · OEKO-TEX certified</div>
        <div className="trust-item"><span className="tdot"></span> Expert production management available</div>
      </div>

      {/* How it works */}
      <section style={{padding:'72px 48px'}}>
        <div className="sec-eye">How it works</div>
        <div className="sec-title">From search to production<br/>in three steps</div>
        <div className="steps">
          <div className="step">
            <div className="step-n">01 — SEARCH</div>
            <div className="step-t">Find the right factory</div>
            <div className="step-d">Browse verified manufacturers by country, product category, certifications, and minimum order quantity.</div>
          </div>
          <div className="step">
            <div className="step-n">02 — CONNECT</div>
            <div className="step-t">Make direct contact</div>
            <div className="step-d">Send an enquiry directly to the factory. No middlemen, no hidden fees. Your brief goes straight to the right people.</div>
          </div>
          <div className="step">
            <div className="step-n">03 — PRODUCE</div>
            <div className="step-t">Start your production</div>
            <div className="step-d">Agree on terms, samples, and timelines directly with the factory. MEx. is here if you need guidance.</div>
          </div>
        </div>
      </section>

      {/* Verification band */}
      <div className="verify-band">
        <div>
          <div className="vt">Every factory on MEx. is verified</div>
          <div className="vd">We manually vet every listing. No ghost factories, no brokers posing as manufacturers.</div>
          <div className="vpills" style={{marginTop:'16px'}}>
            <span className="vpill">✓ Business registration</span>
            <span className="vpill">✓ Production capacity verified</span>
            <span className="vpill">✓ Certifications checked</span>
          </div>
        </div>
        <Link href="/for-brands" className="btn-white">Learn more</Link>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <h2>List your factory on MEx.</h2>
        <p>Reach thousands of brands actively looking for manufacturing partners worldwide.</p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/signup" className="btn-white">List your factory</Link>
          <Link href="/pricing" className="btn-ghost">View pricing</Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{borderTop:'1px solid #f0f0f0',padding:'48px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
        <span style={{fontSize:'13px',color:'#aaa'}}>© 2025 MEx. The Manufacturing Exchange</span>
        <div style={{display:'flex',gap:'24px'}}>
          <Link href="/about" style={{fontSize:'13px',color:'#aaa'}}>About</Link>
          <Link href="/contact" style={{fontSize:'13px',color:'#aaa'}}>Contact</Link>
          <Link href="/faq" style={{fontSize:'13px',color:'#aaa'}}>FAQ</Link>
          <Link href="/pricing" style={{fontSize:'13px',color:'#aaa'}}>Pricing</Link>
        </div>
      </footer>
    </>
  )
}
