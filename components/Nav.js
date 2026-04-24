'use client'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <div className="nav-logo">
        <Link href="/" className="nav-logo-text" style={{fontWeight:600,fontSize:'18px',letterSpacing:'-0.5px'}}>
          M<span style={{color:'#1A35D4'}}>.</span> MEX<span style={{color:'#1A35D4'}}>.</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link href="/factories">Factories</Link>
        <Link href="/for-brands">For brands</Link>
        <Link href="/estimate">Estimate</Link>
        <Link href="/pricing">Pricing</Link>
      </div>
      <div className="nav-actions">
        <Link href="/login" className="nav-link-btn">Login</Link>
        <Link href="/signup" className="nav-btn">List your factory</Link>
      </div>
    </nav>
  )
}
