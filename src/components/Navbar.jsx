import { Link, useNavigate } from 'react-router-dom'
import { courses } from '../lib/courses.js'
import { useState } from 'react'

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleCourseClick = (slug) => {
    setMenuOpen(false)
    navigate(`/kurs/${slug}`)
  }

  const handleContact = () => {
    window.location.href = 'tel:+998771691001'
  }

  return (
    <nav style={navStyle}>
      <div style={navLeftStyle}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:'.5rem', textDecoration:'none' }}>
          <div style={logoMarkStyle}>A</div>
          <span style={logoNameStyle}><b style={{color:'var(--o)'}}>A</b>-School</span>
        </Link>
        <ul style={navLinksStyle}>
          {courses.map(c => (
            <li key={c.id}>
              <button onClick={() => handleCourseClick(c.slug)} style={navLinkBtnStyle}>
                {c.emoji} {c.name}
              </button>
            </li>
          ))}
          <li><a href="/#why" style={navLinkStyle}>Afzalliklar</a></li>
          <li><a href="/#pricing" style={navLinkStyle}>Narxlar</a></li>
          <li><a href="/#about" style={navLinkStyle}>Biz haqimizda</a></li>
        </ul>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'.75rem'}}>
        <button onClick={toggleTheme} style={themeBtnStyle} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          )}
        </button>
        <button onClick={handleContact} style={btnPrimaryStyle}>
          📞 Bog'lanish
        </button>
        <a href="/#contact" style={btnPrimaryStyle}>Ro'yxatdan o'tish</a>
      </div>
    </nav>
  )
}

const navStyle = {
  position:'fixed', inset:'0 0 auto', height:'var(--nav-h)',
  display:'flex', alignItems:'center', justifyContent:'space-between',
  padding:'0 clamp(1rem,4vw,3.5rem)',
  background:'var(--nav-bg)', backdropFilter:'blur(20px) saturate(1.5)',
  borderBottom:'1px solid var(--border)', zIndex:200,
  transition:'background .3s, border-color .3s', gap:'1rem',
}
const navLeftStyle = { display:'flex', alignItems:'center', gap:'1.5rem', overflow:'hidden' }
const logoMarkStyle = {
  width:36, height:36, borderRadius:9, background:'var(--o)',
  display:'grid', placeItems:'center', fontFamily:"'Clash Display',sans-serif",
  fontWeight:700, fontSize:'1rem', color:'#fff', flexShrink:0,
}
const logoNameStyle = {
  fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:'.95rem',
  color:'var(--text)', whiteSpace:'nowrap',
}
const navLinksStyle = {
  display:'flex', listStyle:'none', gap:'.1rem', flexWrap:'nowrap',
  overflow:'auto', msOverflowStyle:'none', scrollbarWidth:'none',
}
const navLinkStyle = {
  color:'var(--muted)', textDecoration:'none', fontSize:'.8rem', fontWeight:500,
  padding:'.4rem .7rem', borderRadius:8, display:'block', whiteSpace:'nowrap',
  transition:'color .2s, background .2s', cursor:'pointer',
}
const navLinkBtnStyle = {
  ...navLinkStyle, background:'none', border:'none', fontFamily:"'Cabinet Grotesk',sans-serif",
}
const themeBtnStyle = {
  width:36, height:36, borderRadius:9, border:'1px solid var(--border)',
  background:'var(--card)', color:'var(--muted)', cursor:'pointer',
  display:'grid', placeItems:'center', flexShrink:0,
}
const btnPrimaryStyle = {
  display:'inline-flex', alignItems:'center', gap:'.4rem',
  padding:'.5rem 1rem', background:'var(--o)', color:'#fff',
  borderRadius:9, fontWeight:600, fontSize:'.8rem', border:'none',
  cursor:'pointer', whiteSpace:'nowrap', fontFamily:"'Cabinet Grotesk',sans-serif",
  textDecoration:'none',
}
