import Nav from '../../components/Nav'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <>
      <Nav />
      <div className="page-hero">
        <h1>Simple, transparent pricing</h1>
        <p>Choose the plan that fits your factory. No hidden fees, no contracts.</p>
      </div>

      <section style={{padding:'72px 48px'}}>
        <div className="pricing-grid">
          {/* Free */}
          <div className="pc">
            <div className="pc-tier">Starter</div>
            <div className="pc-price">€0</div>
            <div className="pc-per">per month</div>
            <div className="pc-size">For factories just getting started</div>
            <div className="pc-desc">Get listed on MEx. and start receiving enquiries from brands worldwide.</div>
            <div className="pc-features">
              {['Basic factory profile','Listed in search results','Up to 3 enquiries/month','MEx. verified badge'].map(f => (
                <div key={f} className="pc-feature">
                  <div className="pc-check"><svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#1A35D4" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                  {f}
                </div>
              ))}
            </div>
            <Link href="/signup" className="btn-outline" style={{textAlign:'center',display:'block'}}>Get started free</Link>
          </div>

          {/* Pro */}
          <div className="pc feat">
            <div className="pc-tier">Professional</div>
            <div className="pc-price">€49</div>
            <div className="pc-per">per month</div>
            <div className="pc-size">For active manufacturers</div>
            <div className="pc-desc">Full visibility to brands globally with priority placement and unlimited enquiries.</div>
            <div className="pc-features">
              {['Everything in Starter','Unlimited enquiries','Priority placement in search','Photo gallery (up to 12 photos)','Detailed certifications listing','Analytics dashboard'].map(f => (
                <div key={f} className="pc-feature">
                  <div className="pc-check"><svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#1A35D4" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                  {f}
                </div>
              ))}
            </div>
            <Link href="/signup" className="btn-primary" style={{textAlign:'center',display:'block'}}>Start free trial</Link>
          </div>

          {/* Enterprise */}
          <div className="pc">
            <div className="pc-tier">Enterprise</div>
            <div className="pc-price">€149</div>
            <div className="pc-per">per month</div>
            <div className="pc-size">For large manufacturers & groups</div>
            <div className="pc-desc">Multiple factory listings, dedicated account management and custom integrations.</div>
            <div className="pc-features">
              {['Everything in Professional','Up to 5 factory profiles','Dedicated account manager','Custom branding options','API access','Featured homepage placement'].map(f => (
                <div key={f} className="pc-feature">
                  <div className="pc-check"><svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#1A35D4" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                  {f}
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-outline" style={{textAlign:'center',display:'block'}}>Contact us</Link>
          </div>
        </div>
      </section>

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
