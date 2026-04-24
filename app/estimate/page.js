import Nav from '../../components/Nav'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Nav />
      <div className="page-hero">
        <h1>Coming soon</h1>
        <p>This page is being built.</p>
      </div>
      <footer style={{borderTop:'1px solid #f0f0f0',padding:'48px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
        <span style={{fontSize:'13px',color:'#aaa'}}>© 2025 MEx. The Manufacturing Exchange</span>
        <div style={{display:'flex',gap:'24px'}}>
          <Link href="/about" style={{fontSize:'13px',color:'#aaa'}}>About</Link>
          <Link href="/contact" style={{fontSize:'13px',color:'#aaa'}}>Contact</Link>
        </div>
      </footer>
    </>
  )
}
