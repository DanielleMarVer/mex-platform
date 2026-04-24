'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { supabase } from '../../lib/supabase'
import { expandQuery } from '../../lib/synonyms'

const FLAGS = {
  'Belgium':'🇧🇪','China':'🇨🇳','France':'🇫🇷','Germany':'🇩🇪','Italy':'🇮🇹',
  'Portugal':'🇵🇹','Spain':'🇪🇸','United Kingdom':'🇬🇧','Turkey':'🇹🇷','Netherlands':'🇳🇱',
  'Switzerland':'🇨🇭','Sweden':'🇸🇪','Denmark':'🇩🇰','Austria':'🇦🇹','Poland':'🇵🇱',
  'Romania':'🇷🇴','Bulgaria':'🇧🇬','Greece':'🇬🇷','Czech Republic':'🇨🇿','Hungary':'🇭🇺',
  'India':'🇮🇳','Bangladesh':'🇧🇩','Vietnam':'🇻🇳','Indonesia':'🇮🇩','Pakistan':'🇵🇰',
  'Sri Lanka':'🇱🇰','Cambodia':'🇰🇭','Myanmar':'🇲🇲','Thailand':'🇹🇭','Morocco':'🇲🇦',
  'Tunisia':'🇹🇳','Egypt':'🇪🇬','South Korea':'🇰🇷','Japan':'🇯🇵','Taiwan':'🇹🇼',
  'United States':'🇺🇸','Brazil':'🇧🇷','Mexico':'🇲🇽','Peru':'🇵🇪','Colombia':'🇨🇴',
}

export default function FactoriesPage() {
  const [factories, setFactories] = useState([])
  const [filtered, setFiltered] = useState([])
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('')
  const [countryLabel, setCountryLabel] = useState('All countries')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [ddOpen, setDdOpen] = useState(false)
  const [ddSearch, setDdSearch] = useState('')
  const ddRef = useRef(null)
  const stickyDdRef = useRef(null)

  useEffect(() => {
    loadFactories()
    // Close dropdown on outside click
    function handleClick(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    filterFactories()
  }, [query, country, factories])

  async function loadFactories() {
    const { data, error } = await supabase
      .from('factories')
      .select('*')
      .eq('is_active', true)
      .order('country')
      .order('name')

    if (data) {
      setFactories(data)
      const unique = [...new Set(data.map(f => f.country))].sort()
      setCountries(unique)
    }
    setLoading(false)
  }

  function filterFactories() {
    if (!query && !country) {
      setFiltered(factories)
      return
    }

    const expandedTerms = query ? expandQuery(query) : []

    const results = factories.filter(f => {
      // Country filter
      const matchCountry = !country || f.country?.toLowerCase() === country.toLowerCase()

      // Text search - check original query AND all expanded synonyms
      let matchQ = !query
      if (query && !matchQ) {
        const allTerms = [query.toLowerCase(), ...expandedTerms]
        matchQ = allTerms.some(term =>
          f.name?.toLowerCase().includes(term) ||
          f.country?.toLowerCase().includes(term) ||
          f.location?.toLowerCase().includes(term) ||
          f.about?.toLowerCase().includes(term) ||
          f.tags?.some(t => t.toLowerCase().includes(term)) ||
          f.category_tags?.some(t => t.toLowerCase().includes(term)) ||
          f.certifications?.some(c => c.toLowerCase().includes(term))
        )
      }

      return matchCountry && matchQ
    })

    setFiltered(results)
  }

  function clearFilters() {
    setQuery('')
    setCountry('')
    setCountryLabel('All countries')
    setDdSearch('')
  }

  function selectCountry(val, label) {
    setCountry(val)
    setCountryLabel(label)
    setDdOpen(false)
    setDdSearch('')
  }

  // Group filtered factories by country
  const byCountry = {}
  filtered.forEach(f => {
    if (!byCountry[f.country]) byCountry[f.country] = { manufacturer: [], supplier: [] }
    byCountry[f.country][f.category === 'manufacturer' ? 'manufacturer' : 'supplier'].push(f)
  })

  const filteredCountryList = countries.filter(c =>
    !ddSearch || c.toLowerCase().includes(ddSearch.toLowerCase())
  )

  return (
    <>
      <Nav />

      {/* Page Hero */}
      <div className="page-hero">
        <h1>Find a factory</h1>
        <p>Browse verified manufacturers worldwide. Filter by country, category, or product type.</p>
      </div>

      {/* Disclaimer */}
      <div style={{background:'#f5f7ff',borderBottom:'1px solid #e8ecff',padding:'14px 48px'}}>
        <p style={{fontSize:'13px',color:'#666',lineHeight:'1.65',maxWidth:'960px',margin:'0 auto',textAlign:'center'}}>
          <strong style={{color:'#1A35D4'}}>Please note:</strong> Each manufacturer listed on MEx. operates under their own terms and conditions, which must be reviewed and agreed to before entering into any production relationship. Minimum order quantities, lead times, payment terms and other requirements vary by factory. MEx. connects brands with manufacturers but is not a party to any production agreement.
        </p>
      </div>

      {/* Sticky Search Bar */}
      <div className="filter-bar">
        <div style={{display:'flex',maxWidth:'900px',width:'100%',margin:'0 auto',background:'#fff',border:'1.5px solid #e0e0e0',borderRadius:'50px',padding:'5px 5px 5px 20px',alignItems:'center',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by product, category or factory name..."
            style={{flex:1,border:'none',outline:'none',fontSize:'15px',fontFamily:"'DM Sans',sans-serif",color:'#111',background:'transparent',minWidth:0}}
          />
          {/* Country dropdown */}
          <div style={{position:'relative',borderLeft:'1px solid #eee',flexShrink:0}} ref={ddRef}>
            <div
              onClick={() => setDdOpen(!ddOpen)}
              style={{display:'flex',alignItems:'center',gap:'6px',padding:'8px 12px',cursor:'pointer',fontSize:'14px',fontFamily:"'DM Sans',sans-serif",color:'#555',whiteSpace:'nowrap',minWidth:'130px',userSelect:'none'}}
            >
              <span>{countryLabel}</span>
              <svg style={{transition:'transform 0.2s',transform:ddOpen?'rotate(180deg)':'',flexShrink:0}} width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M1 1l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            {ddOpen && (
              <div style={{position:'absolute',top:'calc(100% + 6px)',right:0,background:'#fff',border:'1px solid #e0e0e0',borderRadius:'14px',boxShadow:'0 8px 32px rgba(0,0,0,0.12)',zIndex:9999,width:'240px',overflow:'hidden'}}>
                <div style={{padding:'10px 12px 8px',borderBottom:'1px solid #f0f0f0'}}>
                  <input
                    type="text"
                    value={ddSearch}
                    onChange={e => setDdSearch(e.target.value)}
                    onClick={e => e.stopPropagation()}
                    placeholder="Search country..."
                    style={{width:'100%',border:'1px solid #e0e0e0',borderRadius:'8px',padding:'7px 10px',fontSize:'13px',fontFamily:"'DM Sans',sans-serif",outline:'none',color:'#111'}}
                  />
                </div>
                <div style={{overflowY:'auto',maxHeight:'240px',padding:'4px 0'}}>
                  <div
                    onClick={() => selectCountry('', 'All countries')}
                    style={{padding:'9px 16px',fontSize:'14px',color:'#1A35D4',fontWeight:500,cursor:'pointer',borderBottom:'1px solid #f0f0f0'}}
                  >All countries</div>
                  {filteredCountryList.map(c => (
                    <div
                      key={c}
                      onClick={() => selectCountry(c, c)}
                      style={{padding:'9px 16px',fontSize:'14px',color:country===c?'#1A35D4':'#111',background:country===c?'#f5f7ff':'',cursor:'pointer',fontWeight:country===c?500:400}}
                      onMouseEnter={e => e.target.style.background='#f5f7ff'}
                      onMouseLeave={e => e.target.style.background=country===c?'#f5f7ff':''}
                    >{c}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => filterFactories()}
            style={{background:'#1A35D4',color:'#fff',border:'none',padding:'9px 22px',borderRadius:'50px',fontSize:'14px',fontFamily:"'DM Sans',sans-serif",cursor:'pointer',fontWeight:500,whiteSpace:'nowrap',marginLeft:'4px'}}
          >Search</button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:'900px',width:'100%',margin:'8px auto 0'}}>
          <button onClick={clearFilters} style={{fontSize:'13px',color:'#aaa',background:'none',border:'none',cursor:'pointer',padding:0}}>Clear filters</button>
          <span style={{fontSize:'13px',color:'#aaa'}}>
            {loading ? 'Loading...' : `${filtered.length} factor${filtered.length === 1 ? 'y' : 'ies'}`}
          </span>
        </div>
      </div>

      {/* Factories Grid */}
      <div style={{padding:'32px 48px'}}>
        {loading && (
          <div style={{textAlign:'center',padding:'64px',color:'#aaa',fontSize:'15px'}}>Loading factories...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'64px',color:'#aaa',fontSize:'15px'}}>
            No factories found matching your search.
          </div>
        )}

        {!loading && Object.keys(byCountry).sort().map(c => (
          <div key={c}>
            {/* Country heading */}
            <div style={{display:'flex',alignItems:'center',gap:'16px',padding:'32px 0 8px',marginTop:'8px'}}>
              <span style={{fontSize:'13px',fontWeight:600,color:'#1A35D4',textTransform:'uppercase',letterSpacing:'1.5px',whiteSpace:'nowrap'}}>
                {FLAGS[c] || '🏭'} {c}
              </span>
              <div style={{flex:1,height:'1px',background:'#e4e4e4'}}></div>
            </div>

            {/* Manufacturers */}
            {byCountry[c].manufacturer.length > 0 && (
              <>
                <div style={{padding:'4px 0 2px'}}>
                  <span style={{fontSize:'11px',fontWeight:600,color:'#aaa',textTransform:'uppercase',letterSpacing:'1.2px'}}>Manufacturers</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'14px',marginBottom:'8px'}}>
                  {byCountry[c].manufacturer.map(f => <FactoryCard key={f.id} factory={f} />)}
                </div>
              </>
            )}

            {/* Suppliers */}
            {byCountry[c].supplier.length > 0 && (
              <>
                <div style={{padding:byCountry[c].manufacturer.length > 0 ? '16px 0 2px' : '4px 0 2px'}}>
                  <span style={{fontSize:'11px',fontWeight:600,color:'#aaa',textTransform:'uppercase',letterSpacing:'1.2px'}}>Suppliers of Components</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'14px',marginBottom:'8px'}}>
                  {byCountry[c].supplier.map(f => <FactoryCard key={f.id} factory={f} />)}
                </div>
              </>
            )}
          </div>
        ))}
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

function FactoryCard({ factory: f }) {
  const flag = f.flag || FLAGS[f.country] || '🏭'
  const tags = (f.tags || []).slice(0, 3)

  return (
    <Link href={`/factory/${f.slug}`} className="fc">
      <div className="fc-top">
        <div className="fav">{flag}</div>
        <div className="fc-info">
          <div className="fc-name">{f.name}</div>
          <div className="fc-loc">{f.location}</div>
        </div>
        <span className="fc-badge">{f.country}</span>
      </div>
      <div className="ftags">
        {tags.map(t => <span key={t} className="ftag">{t}</span>)}
        {f.moq && <span className="ftag">MOQ {f.moq}</span>}
      </div>
    </Link>
  )
}
