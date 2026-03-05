import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCourseBySlug, courses } from '../lib/courses.js'
import { useReveal } from '../components/useReveal.js'
import { supabase } from '../lib/supabase.js'

export default function CoursePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const course = getCourseBySlug(slug)
  useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!course) return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',paddingTop:'var(--nav-h)'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'4rem',marginBottom:'1rem'}}>😕</div>
        <h2 style={{fontFamily:"'Clash Display',sans-serif",marginBottom:'1rem'}}>Kurs topilmadi</h2>
        <Link to="/" style={btnPrimary}>Bosh sahifaga qaytish</Link>
      </div>
    </div>
  )

  return (
    <div className="page-enter" style={{paddingTop:'var(--nav-h)'}}>
      {/* Hero */}
      <div style={{background:'var(--bg1)', borderBottom:'1px solid var(--border)', padding:'4rem clamp(1rem,5vw,3.5rem) 3rem'}}>
        <div style={{maxWidth:900, margin:'0 auto'}}>
          <button onClick={() => navigate(-1)} style={backBtnStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>
            </svg>
            Orqaga
          </button>
          <div style={{display:'flex', alignItems:'center', gap:'1rem', marginTop:'1.5rem', marginBottom:'1rem'}}>
            <div style={{fontSize:'3rem'}}>{course.emoji}</div>
            {course.comingSoon && (
              <div style={{background:'var(--p-soft)',color:'var(--p-mid)',border:'1px solid rgba(124,58,237,.2)',borderRadius:50,padding:'.25rem .8rem',fontSize:'.72rem',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase'}}>
                Tez orada
              </div>
            )}
          </div>
          <h1 style={{fontFamily:"'Clash Display',sans-serif",fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:700,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'1rem'}}>
            {course.name}
          </h1>
          <p style={{fontSize:'1.1rem',color:'var(--muted)',lineHeight:1.7,maxWidth:620,marginBottom:'2rem'}}>{course.fullDesc}</p>
          <div style={{display:'flex', flexWrap:'wrap', gap:'.5rem'}}>
            {course.chips.map(chip => (
              <span key={chip} style={{fontSize:'.72rem',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',padding:'.25rem .7rem',borderRadius:6,background:course.color==='purple'?'var(--p-soft)':'var(--o-dim)',border:`1px solid ${course.color==='purple'?'rgba(124,58,237,.2)':'rgba(244,107,30,.18)'}`,color:course.color==='purple'?'var(--p-mid)':'var(--o)'}}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:900, margin:'0 auto', padding:'3rem clamp(1rem,5vw,3.5rem)'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'start'}}>
          <div>
            {/* Levels */}
            <div className="reveal" style={{marginBottom:'2.5rem'}}>
              <div style={sectionLabel}>📚 Kurs darajalari</div>
              <div style={{display:'flex', flexDirection:'column', gap:'.75rem', marginTop:'1rem'}}>
                {course.levels.map((level, i) => (
                  <div key={i} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1.35rem'}}>
                    <div style={{fontFamily:"'Clash Display',sans-serif",fontWeight:600,fontSize:'1rem',marginBottom:'.4rem'}}>{level.name}</div>
                    <div style={{fontSize:'.875rem',color:'var(--muted)',lineHeight:1.6,marginBottom:'.75rem'}}>{level.desc}</div>
                    <div style={{display:'flex', gap:'.75rem', flexWrap:'wrap'}}>
                      <span style={tagStyle}>💰 {level.price} {level.price !== 'TBA' && level.price !== 'Bog\'laning' ? "so'm/oy" : ''}</span>
                      <span style={tagStyle}>⏱ {level.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="reveal" data-delay="1">
              <div style={sectionLabel}>✅ Kurs ichida nima bor</div>
              <div style={{display:'flex', flexDirection:'column', gap:'.5rem', marginTop:'1rem'}}>
                {course.features.map((f, i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', gap:'.75rem', padding:'.75rem 1rem', background:'var(--card)', border:'1px solid var(--border)', borderRadius:10}}>
                    <div style={{width:24,height:24,borderRadius:'50%',background:'var(--o-dim)',display:'grid',placeItems:'center',color:'var(--o)',flexShrink:0,fontSize:'.75rem',fontWeight:700}}>✓</div>
                    <span style={{fontSize:'.9rem',color:'var(--text)'}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="reveal" data-delay="1" style={{position:'sticky', top:'calc(var(--nav-h) + 1.5rem)'}}>
              {/* Price summary */}
              <div style={{background:'var(--card)',border:'1px solid var(--border-o)',borderRadius:18,padding:'1.75rem',marginBottom:'1rem'}}>
                <div style={{fontSize:'.8rem',color:'var(--muted)',marginBottom:'.5rem',textTransform:'uppercase',letterSpacing:'.07em'}}>Narx</div>
                <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:'2rem',fontWeight:700,color:'var(--o)',lineHeight:1}}>
                  {course.priceRange}
                  {course.priceRange !== 'TBA' && course.priceRange !== "Bog'laning" &&
                    <span style={{fontFamily:"'Cabinet Grotesk',sans-serif",fontSize:'.9rem',color:'var(--muted)',fontWeight:400}}> so'm/oy</span>
                  }
                </div>
                <div style={{fontSize:'.8rem',color:'var(--muted)',marginTop:'.5rem'}}>Oylik to'lov, hech qanday yashirin to'lov yo'q</div>
                <div style={{height:1,background:'var(--border)',margin:'1.25rem 0'}} />
                <div style={{fontSize:'.8rem',color:'var(--muted)',marginBottom:'1rem'}}>O'qituvchilar: {course.teachers.join(' · ')}</div>
                <a href="/#contact" style={{...btnPrimary, width:'100%', justifyContent:'center', textAlign:'center', display:'flex'}}>
                  Hozir yozilish
                </a>
                <a href="tel:+998771691001" style={{...btnOutline, width:'100%', justifyContent:'center', textAlign:'center', display:'flex', marginTop:'.6rem'}}>
                  📞 Qo'ng'iroq qilish
                </a>
              </div>

              {/* Other courses */}
              <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,padding:'1.5rem'}}>
                <div style={{fontSize:'.75rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'1rem'}}>Boshqa yo'nalishlar</div>
                <div style={{display:'flex', flexDirection:'column', gap:'.4rem'}}>
                  {courses.filter(c => c.slug !== slug).slice(0,4).map(c => (
                    <button key={c.id} onClick={() => navigate(`/kurs/${c.slug}`)}
                      style={{display:'flex',alignItems:'center',gap:'.6rem',padding:'.6rem .8rem',background:'none',border:'1px solid var(--border)',borderRadius:9,cursor:'pointer',color:'var(--text)',fontFamily:"'Cabinet Grotesk',sans-serif",fontSize:'.85rem',textAlign:'left',transition:'border-color .2s'}}
                      onMouseEnter={e => e.currentTarget.style.borderColor='var(--border-o)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
                      <span>{c.emoji}</span>
                      <span style={{fontWeight:500}}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer mini */}
      <div style={{borderTop:'1px solid var(--border)',padding:'1.5rem clamp(1rem,5vw,3.5rem)',textAlign:'center',color:'var(--muted)',fontSize:'.85rem'}}>
        <Link to="/" style={{color:'var(--o)',textDecoration:'none'}}>← Bosh sahifaga qaytish</Link>
        &nbsp;·&nbsp; A School, Asaka · Umid ko'chasi, 70
      </div>
    </div>
  )
}

const backBtnStyle = {
  display:'inline-flex', alignItems:'center', gap:'.4rem',
  background:'var(--card)', border:'1px solid var(--border)',
  color:'var(--muted)', borderRadius:9, padding:'.4rem .85rem',
  fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:'.85rem',
  cursor:'pointer', transition:'color .2s, border-color .2s',
}
const sectionLabel = {
  fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:'.95rem',
  color:'var(--text)', marginBottom:'.5rem',
}
const tagStyle = {
  fontSize:'.72rem', fontWeight:600, background:'var(--o-dim)',
  color:'var(--o)', padding:'.2rem .6rem', borderRadius:6,
  border:'1px solid rgba(244,107,30,.18)',
}
const btnPrimary = {
  display:'inline-flex', alignItems:'center', gap:'.45rem',
  padding:'.7rem 1.5rem', background:'var(--o)', color:'#fff',
  borderRadius:10, fontWeight:600, fontSize:'.9rem', border:'none',
  cursor:'pointer', textDecoration:'none', fontFamily:"'Cabinet Grotesk',sans-serif",
}
const btnOutline = {
  ...btnPrimary, background:'transparent',
  border:'1px solid var(--border)', color:'var(--text)',
}
