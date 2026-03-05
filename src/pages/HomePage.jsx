import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReveal } from '../components/useReveal.js'
import { courses } from '../lib/courses.js'
import { supabase } from '../lib/supabase.js'

export default function HomePage() {
  useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
    // Re-run reveal after page load
    const els = document.querySelectorAll('.reveal')
    els.forEach(el => el.classList.remove('visible'))
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
          else e.target.classList.remove('visible')
        }),
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )
      els.forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 100)
  }, [])

  return (
    <div className="page-enter">
      <HeroSection />
      <div style={dividerStyle} />
      <CoursesSection />
      <div style={dividerStyle} />
      <WhySection />
      <div style={dividerStyle} />
      <PricingSection />
      <div style={dividerStyle} />
      <AboutSection />
      <div style={dividerStyle} />
      <ContactSection />
      <Footer />
    </div>
  )
}

/* ── HERO ── */
function HeroSection() {
  const navigate = useNavigate()
  return (
    <section id="hero" style={heroStyle}>
      <div style={orb1Style} />
      <div style={orb2Style} />
      <div style={{position:'relative', zIndex:1}}>
        <div style={eyebrowStyle}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          Asaka · Umid ko'chasi, 70
        </div>
        <h1 style={h1Style}>Diplom emas,<br /><em style={{color:'var(--o)', fontStyle:'normal'}}>Skill</em> kerak<span style={{WebkitTextStroke:'1.5px var(--p-mid)', color:'transparent'}}>.</span></h1>
        <p style={heroDescStyle}>
          A School – Asaka shahridagi zamonaviy ta'lim markazi.{' '}
          <strong style={{color:'var(--text)', fontWeight:600}}>Chet tillari, IT, Media</strong> – interaktiv darslar, real natija.
        </p>
        <div style={{display:'flex', gap:'.7rem', flexWrap:'wrap'}}>
          <a href="#courses" style={btnLgStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Kurslarni ko'rish
          </a>
          <a href="tel:+998771691001" style={btnOutlineLgStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Bog'lanish
          </a>
        </div>
        <div style={heroMetaStyle}>
          {[['7+','Yo\'nalish'],['100%','Natijaga ishlash'],['2024','Asoslanildi']].map(([val, label]) => (
            <div key={label}>
              <div style={{fontFamily:"'Clash Display',sans-serif", fontSize:'1.8rem', fontWeight:700, color:'var(--o)', lineHeight:1}}>{val}</div>
              <div style={{fontSize:'.75rem', color:'var(--muted)', marginTop:'.3rem', letterSpacing:'.04em'}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cards */}
      <div style={{position:'relative', zIndex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={cardStackStyle}>
          <FloatCard style={{width:195, top:0, right:-10, animationName:'floatA'}} title="Koreys tili" sub="Standart + TOPIK tayyorlov" price="400 000 so'm" />
          <FloatCard style={{width:275, top:'50%', left:'50%', transform:'translate(-50%,-50%)', border:'1px solid var(--border-o)', boxShadow:'0 24px 64px var(--shadow)', animationName:'floatMain'}} title="Ingliz tili" sub="Umumiy · Intensiv · IELTS" price="360 000 – 560 000 so'm" badge="Eng mashhur" />
          <FloatCard style={{width:195, bottom:0, left:-10, animationName:'floatB', animationDelay:'.4s'}} title="IT / Dasturlash" sub="Boshlang'ich va o'rta daraja" price="480 000 so'm" />
        </div>
      </div>
      <style>{`
        @keyframes floatMain { 0%,100%{transform:translate(-50%,-50%)} 50%{transform:translate(-50%,calc(-50% - 10px))} }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      `}</style>
    </section>
  )
}

function FloatCard({ style, title, sub, price, badge }) {
  const base = {
    position:'absolute', background:'var(--card)', border:'1px solid var(--border)',
    borderRadius:'var(--radius)', padding:'1.2rem 1.35rem',
    backdropFilter:'blur(12px)', animationDuration:'5s',
    animationTimingFunction:'ease-in-out', animationIterationCount:'infinite',
    ...style
  }
  return (
    <div style={base}>
      <div style={{width:36,height:36,borderRadius:9,background:'var(--o-dim)',border:'1px solid rgba(244,107,30,.18)',display:'grid',placeItems:'center',color:'var(--o)',marginBottom:'.85rem'}}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </div>
      <div style={{fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:'.9rem', color:'var(--text)', marginBottom:'.2rem'}}>{title}</div>
      <div style={{fontSize:'.75rem', color:'var(--muted)', lineHeight:1.5}}>{sub}</div>
      <div style={{fontFamily:"'Clash Display',sans-serif", fontWeight:700, fontSize:'1rem', color:'var(--o)', marginTop:'.75rem'}}>{price}</div>
      {badge && (
        <div style={{display:'inline-flex',alignItems:'center',gap:'.3rem',background:'var(--p-soft)',color:'var(--p-mid)',border:'1px solid rgba(124,58,237,.2)',borderRadius:50,fontSize:'.68rem',fontWeight:700,letterSpacing:'.04em',textTransform:'uppercase',padding:'.18rem .6rem',marginTop:'.65rem'}}>
          ⭐ {badge}
        </div>
      )}
    </div>
  )
}

/* ── COURSES ── */
function CoursesSection() {
  const navigate = useNavigate()
  return (
    <section id="courses" style={sectionStyle}>
      <div className="reveal" style={secHeaderStyle}>
        <div style={secTagStyle}>Yo'nalishlar</div>
        <h2 style={h2Style}>Hamma narsa <em style={{color:'var(--o)',fontStyle:'normal'}}>bir joyda</em></h2>
        <p style={secLeadStyle}>Interaktiv o'yinlar, quizlar, komandaviy kvestlar — har bir dars real hayotga tayyorgarlik.</p>
      </div>
      <div style={coursesGridStyle}>
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} delay={i % 3} onClick={() => navigate(`/kurs/${course.slug}`)} />
        ))}
      </div>
    </section>
  )
}

function CourseCard({ course, delay, onClick }) {
  const [hovered, setHovered] = useState(false)
  const isV = course.color === 'purple'
  return (
    <div
      className="reveal"
      data-delay={String(delay)}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--card-h)' : 'var(--card)',
        border: `1px solid ${hovered ? 'var(--border-o)' : 'var(--border)'}`,
        borderRadius:'var(--radius)', padding:'1.6rem',
        display:'flex', flexDirection:'column', gap:'.7rem',
        position:'relative', overflow:'hidden', cursor:'pointer',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 12px 36px var(--shadow)' : 'none',
        transition:'transform .25s var(--ease), border-color .25s, box-shadow .25s, background .25s',
      }}
    >
      {hovered && <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,var(--o-dim) 0%,transparent 55%)',borderRadius:'var(--radius)',pointerEvents:'none'}} />}
      <div style={{width:42,height:42,borderRadius:10,background:isV?'var(--p-soft)':'var(--o-dim)',border:`1px solid ${isV?'rgba(124,58,237,.2)':'rgba(244,107,30,.18)'}`,display:'grid',placeItems:'center',color:isV?'var(--p-mid)':'var(--o)',position:'relative',zIndex:1}}>
        <span style={{fontSize:'1.2rem'}}>{course.emoji}</span>
      </div>
      <div style={{fontFamily:"'Clash Display',sans-serif", fontSize:'1.05rem', fontWeight:600, color:'var(--text)', position:'relative', zIndex:1}}>{course.name}</div>
      <div style={{fontSize:'.875rem', color:'var(--muted)', lineHeight:1.65, flex:1, position:'relative', zIndex:1}}>{course.shortDesc}</div>
      <div style={{display:'flex', flexWrap:'wrap', gap:'.35rem', position:'relative', zIndex:1}}>
        {course.chips.map(chip => (
          <span key={chip} style={{fontSize:'.68rem',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',padding:'.2rem .58rem',borderRadius:5,background:isV?'var(--p-soft)':'var(--o-dim)',border:`1px solid ${isV?'rgba(124,58,237,.2)':'rgba(244,107,30,.18)'}`,color:isV?'var(--p-mid)':'var(--o)'}}>{chip}</span>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'.7rem',borderTop:'1px solid var(--border)',position:'relative',zIndex:1}}>
        <div style={{fontFamily:"'Clash Display',sans-serif", fontWeight:700, fontSize:'.95rem', color:'var(--o)'}}>
          {course.priceRange === 'TBA' || course.priceRange === 'Bog\'laning'
            ? <span style={{fontSize:'.8rem',color:'var(--muted)'}}>{course.priceRange}</span>
            : <>{course.priceRange} <small style={{fontFamily:"'Cabinet Grotesk',sans-serif",fontSize:'.7rem',color:'var(--muted)',fontWeight:400}}>so'm/oy</small></>
          }
        </div>
        <div style={{color: hovered ? 'var(--o)' : 'var(--muted)', transform: hovered ? 'translateX(3px)' : 'none', transition:'color .2s, transform .2s'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ── WHY ── */
function WhySection() {
  const reasons = [
    { icon:'⚡', title:'Interaktiv darslar', body:"O'yinlar, quizlar, komandaviy kvestlar — faqat 'kitob och, yoz' emas, bilim mustahkamlanadi." },
    { icon:'📊', title:'Natija monitoringi', body:"Har bir o'quvchining o'sishi kuzatiladi. Progress ko'rinadi, zaifliklar vaqtida bartaraf etiladi." },
    { icon:'👨‍👩‍👧', title:'Ota-onaga hisobot', body:"Muntazam ravishda ota-onaga o'quvchining holati, davomat va natijalari haqida to'liq axborot." },
    { icon:'🛡️', title:'Tartib va intizom', body:"Eski maktab an'anasi saqlanadi — zamonaviy texnologiyalar bilan. Tartib + erkinlik balansi." },
    { icon:'🎓', title:"Tajribali o'qituvchilar", body:"Har bir yo'nalishda soha mutaxassislari. Nazariya emas — amaliyot ustuvor." },
    { icon:'📍', title:'Qulay joylashuv', body:"Asaka markazida, transport qulay. Mini-bufet yaqinda ishga tushiriladi." },
  ]
  return (
    <section id="why" style={{...sectionStyle, background:'var(--bg1)'}}>
      <div className="reveal" style={secHeaderStyle}>
        <div style={secTagStyle}>Afzalliklar</div>
        <h2 style={h2Style}>Nima uchun <em style={{color:'var(--o)',fontStyle:'normal'}}>A School?</em></h2>
        <p style={secLeadStyle}>Har bir o'quvchi individual diqqat, monitoring va real natija bilan chiqadi.</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'.875rem'}}>
        {reasons.map((r, i) => (
          <WhyCard key={r.title} {...r} delay={i % 3} />
        ))}
      </div>
    </section>
  )
}

function WhyCard({ icon, title, body, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="reveal" data-delay={String(delay)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{background:'var(--card)',border:`1px solid ${hovered?'var(--border-o)':'var(--border)'}`,borderRadius:'var(--radius)',padding:'1.6rem',transition:'border-color .25s, transform .25s var(--ease)',transform:hovered?'translateY(-2px)':'none'}}>
      <div style={{width:42,height:42,borderRadius:10,background:'var(--o-dim)',border:'1px solid rgba(244,107,30,.18)',display:'grid',placeItems:'center',marginBottom:'1rem',fontSize:'1.3rem'}}>{icon}</div>
      <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:'.95rem',fontWeight:600,marginBottom:'.4rem'}}>{title}</div>
      <div style={{fontSize:'.875rem',color:'var(--muted)',lineHeight:1.65}}>{body}</div>
    </div>
  )
}

/* ── PRICING ── */
function PricingSection() {
  const prices = [
    { name:"Ingliz / Rus / Koreys · Standart", val:"360 000", note:"Hafta 3 kun · 12 soat/oy", hot:true },
    { name:"Koreys tili · TOPIK", val:"400 000", note:"Imtihon tayyorlov dasturi" },
    { name:"Intensiv kurs", val:"560 000", note:"Tezlashtirilgan format" },
    { name:"IELTS & Imtihon tayyorlov", val:"530 000", note:"Xalqaro sertifikatlar" },
    { name:"IT / Dasturlash", val:"480 000", note:"Amaliy loyihalar bilan" },
    { name:"Media yo'nalishi", val:"TBA", note:"Shakllanmoqda" },
  ]
  return (
    <section id="pricing" style={sectionStyle}>
      <div className="reveal" style={secHeaderStyle}>
        <div style={secTagStyle}>Narxlar</div>
        <h2 style={h2Style}>Ochiq va <em style={{color:'var(--o)',fontStyle:'normal'}}>adolatli</em> narxlar</h2>
        <p style={secLeadStyle}>Bozordagi o'rtacha segment — sifat esa yuqori. Gap ochiq.</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:'.875rem'}}>
        {prices.map((p, i) => <PriceCard key={p.name} {...p} delay={i % 3} />)}
      </div>
    </section>
  )
}

function PriceCard({ name, val, note, hot, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="reveal" data-delay={String(delay)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{background:hot?'linear-gradient(135deg,rgba(244,107,30,.08),var(--card) 60%)':'var(--card)',border:`1px solid ${hot||hovered?'var(--border-o)':'var(--border)'}`,borderRadius:'var(--radius)',padding:'1.6rem',position:'relative',transition:'border-color .25s, transform .25s var(--ease)',transform:hovered?'translateY(-2px)':'none'}}>
      {hot && <div style={{position:'absolute',top:'1rem',right:'1rem',background:'var(--o)',color:'#fff',fontSize:'.62rem',fontWeight:800,letterSpacing:'.07em',textTransform:'uppercase',padding:'.18rem .6rem',borderRadius:50}}>⭐ Top</div>}
      <div style={{width:38,height:38,borderRadius:9,background:'var(--o-dim)',display:'grid',placeItems:'center',color:'var(--o)',marginBottom:'1rem',fontSize:'1.1rem'}}>💰</div>
      <div style={{fontSize:'.83rem',color:'var(--muted)',fontWeight:500,marginBottom:'.55rem'}}>{name}</div>
      <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:'1.7rem',fontWeight:700,color:val==='TBA'?'var(--muted)':'var(--text)',lineHeight:1}}>
        {val} {val!=='TBA' && <span style={{fontSize:'.82rem',fontFamily:"'Cabinet Grotesk',sans-serif",color:'var(--muted)',fontWeight:400}}>so'm/oy</span>}
      </div>
      <div style={{fontSize:'.75rem',color:'var(--muted)',marginTop:'.4rem',display:'flex',alignItems:'center',gap:'.3rem'}}>
        ⏱ {note}
      </div>
    </div>
  )
}

/* ── ABOUT ── */
function AboutSection() {
  const [ringHovered, setRingHovered] = useState(false)
  return (
    <section id="about" style={{...sectionStyle, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(2rem,6vw,5rem)', alignItems:'center'}}>
      <div className="reveal">
        <div style={{borderRadius:20, overflow:'hidden', border:'1px solid var(--border)', aspectRatio:'4/3', background:'var(--bg2)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
          <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'.9rem', background:'linear-gradient(135deg,var(--p-soft) 0%,rgba(244,107,30,.07) 100%)'}}>
            <div
              onMouseEnter={() => setRingHovered(true)}
              onMouseLeave={() => setRingHovered(false)}
              style={{
                width: ringHovered ? 100 : 88,
                height: ringHovered ? 100 : 88,
                borderRadius:'50%', background:'var(--o)', display:'grid', placeItems:'center', color:'#fff',
                boxShadow: ringHovered
                  ? '0 0 0 20px var(--o-dim), 0 0 0 40px rgba(244,107,30,.05), 0 0 40px var(--o-glow)'
                  : '0 0 0 16px var(--o-dim), 0 0 0 32px rgba(244,107,30,.05)',
                transition:'all .4s var(--ease)', cursor:'pointer',
                fontSize:'2.2rem',
              }}>
              🏫
            </div>
            <div style={{fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:'.9rem', color:'var(--text)', transition:'transform .3s', transform: ringHovered?'scale(1.05)':'scale(1)'}}>A School</div>
            <div style={{fontSize:'.75rem', color:'var(--muted)'}}>Asaka · 2024-yildan</div>
          </div>
          <div style={{position:'absolute', bottom:'1.1rem', left:'1.1rem', background:'var(--bg)', border:'1px solid var(--border-o)', borderRadius:10, padding:'.7rem .95rem', display:'flex', alignItems:'center', gap:'.6rem'}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:'#22C55E',boxShadow:'0 0 0 3px rgba(34,197,94,.2)'}} />
            <div>
              <div style={{fontSize:'.68rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.07em'}}>Holat</div>
              <div style={{fontFamily:"'Clash Display',sans-serif",fontWeight:600,fontSize:'.83rem',color:'var(--text)'}}>Yozilish ochiq</div>
            </div>
          </div>
        </div>
      </div>
      <div className="reveal" data-delay="1">
        <div style={secTagStyle}>Missiyamiz</div>
        <h2 style={h2Style}>Zamon bilan <em style={{color:'var(--o)',fontStyle:'normal'}}>birga</em> ketadigan avlod</h2>
        <p style={secLeadStyle}>A School — shunchaki kurs emas. Maqsad: o'quvchini natijaga olib chiqish, chet tilida erkin gapirtirish, IT va media orqali zamon bilan yuradigan avlodni tayyorlash.</p>
        <div style={{marginTop:'1.8rem',padding:'1.3rem 1.5rem',borderLeft:'2.5px solid var(--o)',background:'var(--o-dim)',borderRadius:'0 var(--radius) var(--radius) 0',fontSize:'.95rem',lineHeight:1.72,color:'var(--text)',fontStyle:'italic'}}>
          <strong style={{color:'var(--o)',fontStyle:'normal',fontWeight:700}}>"Diplom emas, skill kerak"</strong> — bu bizning falsafamiz. Har bir dars real hayotga tayyorgarlik, har bir o'quvchi alohida loyiha.
        </div>
        <div style={{display:'flex', gap:'.7rem', marginTop:'1.8rem', flexWrap:'wrap'}}>
          <a href="#contact" style={btnLgStyle}>
            Hozir yozilish
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
          <a href="#courses" style={btnOutlineLgStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Kurslar
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT ── */
function ContactSection() {
  const [form, setForm] = useState({ name:'', phone:'', course:'' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.course) {
      alert("Iltimos, barcha maydonlarni to'ldiring.")
      return
    }
    setStatus('loading')
    try {
      const { error } = await supabase.from('site_leads').insert([{
        full_name: form.name,
        phone: form.phone,
        course: form.course,
        created_at: new Date().toISOString(),
      }])
      if (error) throw error
      setStatus('success')
      setForm({ name:'', phone:'', course:'' })
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={sectionStyle}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(2rem,5vw,4rem)', alignItems:'start'}}>
        <div>
          <div className="reveal" style={secTagStyle}>Aloqa</div>
          <h2 className="reveal" data-delay="1" style={h2Style}>Boshlashga <em style={{color:'var(--o)',fontStyle:'normal'}}>tayyor?</em></h2>
          <p className="reveal" data-delay="2" style={secLeadStyle}>Savol yoki ro'yxatdan o'tish uchun biz bilan bog'laning.</p>
          <div style={{display:'flex', flexDirection:'column', gap:'.7rem', marginTop:'1.8rem'}}>
            {[
              { icon:'📍', label:'Manzil', val:'Asaka, Umid ko\'chasi, 70-uy' },
              { icon:'⏰', label:'Ish vaqti', val:'Du – Sha · 08:00 – 20:00' },
              { icon:'📱', label:'Telegram', val:'@aschool_uz' },
              { icon:'📞', label:'Telefon', val:'+998 77 169 10 01', href:'tel:+998771691001' },
            ].map((item, i) => (
              <div key={item.label} className="reveal" data-delay={String(i % 3)}>
                <a href={item.href || undefined} style={{display:'flex',alignItems:'center',gap:'.95rem',padding:'.95rem 1.2rem',background:'var(--card)',border:'1px solid var(--border)',borderRadius:'var(--radius)',textDecoration:'none',color:'inherit',transition:'border-color .2s'}}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--border-o)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
                  <div style={{width:38,height:38,flexShrink:0,borderRadius:9,background:'var(--o-dim)',display:'grid',placeItems:'center',fontSize:'1.1rem'}}>{item.icon}</div>
                  <div>
                    <div style={{fontSize:'.7rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.07em'}}>{item.label}</div>
                    <div style={{fontSize:'.9rem',fontWeight:600,color:'var(--text)',marginTop:'.12rem'}}>{item.val}</div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" data-delay="1" style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,padding:'2rem'}}>
          <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:'1.2rem',fontWeight:600,marginBottom:'1.5rem'}}>Ro'yxatdan o'tish</div>
          {status === 'success' ? (
            <div style={{textAlign:'center',padding:'2rem 0'}}>
              <div style={{fontSize:'3rem',marginBottom:'1rem'}}>✅</div>
              <div style={{fontFamily:"'Clash Display',sans-serif",fontWeight:600,fontSize:'1.1rem',color:'var(--text)',marginBottom:'.5rem'}}>So'rovingiz qabul qilindi!</div>
              <div style={{color:'var(--muted)',fontSize:'.9rem'}}>Tez orada siz bilan bog'lanamiz.</div>
              <button onClick={() => setStatus('idle')} style={{...btnLgStyle,marginTop:'1.5rem',border:'none'}}>Yana yuborish</button>
            </div>
          ) : (
            <>
              {[
                { label:"Ism va familiya", key:"name", type:"text", placeholder:"Ism Familiya" },
                { label:"Telefon", key:"phone", type:"tel", placeholder:"+998 90 000 00 00" },
              ].map(f => (
                <div key={f.key} style={{marginBottom:'.95rem'}}>
                  <label style={{fontSize:'.72rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.07em',display:'block',marginBottom:'.45rem'}}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm(p => ({...p, [f.key]:e.target.value}))}
                    style={{width:'100%',padding:'.68rem 1rem',background:'var(--bg)',border:'1px solid var(--border)',borderRadius:9,color:'var(--text)',fontFamily:"'Cabinet Grotesk',sans-serif",fontSize:'.9rem',outline:'none',transition:'border-color .2s, box-shadow .2s'}}
                    onFocus={e => { e.target.style.borderColor='var(--o)'; e.target.style.boxShadow='0 0 0 3px var(--o-dim)' }}
                    onBlur={e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none' }} />
                </div>
              ))}
              <div style={{marginBottom:'.95rem'}}>
                <label style={{fontSize:'.72rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.07em',display:'block',marginBottom:'.45rem'}}>Yo'nalish</label>
                <select value={form.course} onChange={e => setForm(p => ({...p, course:e.target.value}))}
                  style={{width:'100%',padding:'.68rem 1rem',background:'var(--bg)',border:'1px solid var(--border)',borderRadius:9,color:form.course?'var(--text)':'var(--muted)',fontFamily:"'Cabinet Grotesk',sans-serif",fontSize:'.9rem',outline:'none',appearance:'none',transition:'border-color .2s'}}
                  onFocus={e => e.target.style.borderColor='var(--o)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'}>
                  <option value="">Tanlang…</option>
                  {courses.map(c => <option key={c.id} value={c.name}>{c.emoji} {c.name}</option>)}
                </select>
              </div>
              <button onClick={handleSubmit} disabled={status==='loading'}
                style={{...btnLgStyle, width:'100%', justifyContent:'center', marginTop:'.4rem', border:'none', opacity:status==='loading'?.7:1}}>
                {status === 'loading' ? '⏳ Yuborilmoqda…' : <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
                  </svg>
                  So'rov yuborish
                </>}
              </button>
              {status === 'error' && <div style={{color:'#ef4444',fontSize:'.8rem',marginTop:'.5rem',textAlign:'center'}}>Xatolik yuz berdi. Qaytadan urinib ko'ring.</div>}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{background:'var(--bg1)',borderTop:'1px solid var(--border)',padding:'1.4rem clamp(1rem,5vw,3.5rem)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem',fontSize:'.82rem',color:'var(--muted)'}}>
      <div><span style={{fontFamily:"'Clash Display',sans-serif",fontWeight:600,color:'var(--text)'}}>A <b style={{color:'var(--o)'}}>School</b></span> &nbsp;·&nbsp; © 2026 Barcha huquqlar himoyalangan.</div>
      <div style={{display:'flex',gap:'1.5rem'}}>
        {[['#courses','Kurslar'],['#pricing','Narxlar'],['#about','Biz haqimizda'],['#contact','Aloqa']].map(([href, label]) => (
          <a key={label} href={href} style={{color:'var(--muted)',textDecoration:'none',transition:'color .2s'}}
            onMouseEnter={e => e.target.style.color='var(--o)'}
            onMouseLeave={e => e.target.style.color='var(--muted)'}>{label}</a>
        ))}
      </div>
      <div>Asaka · Umid ko'chasi, 70</div>
    </footer>
  )
}

/* ── SHARED STYLES ── */
const dividerStyle = { height:1, background:'var(--border)', margin:'0 clamp(1rem,5vw,3.5rem)' }
const sectionStyle = { padding:'clamp(4rem,8vw,7rem) clamp(1rem,5vw,3.5rem)' }
const secHeaderStyle = { maxWidth:560, marginBottom:'3.5rem' }
const secTagStyle = { display:'inline-flex', alignItems:'center', gap:'.5rem', fontSize:'.72rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--o)', marginBottom:'.85rem', paddingLeft:'1.4rem', position:'relative' }
const h2Style = { fontFamily:"'Clash Display',sans-serif", fontSize:'clamp(1.9rem,3.5vw,2.75rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-.025em', marginBottom:'.7rem' }
const secLeadStyle = { fontSize:'1rem', color:'var(--muted)', lineHeight:1.7 }
const heroStyle = { minHeight:'100svh', paddingTop:'calc(var(--nav-h) + 5rem)', paddingBottom:'5rem', paddingLeft:'clamp(1rem,5vw,3.5rem)', paddingRight:'clamp(1rem,5vw,3.5rem)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center', position:'relative', overflow:'hidden' }
const orb1Style = { position:'absolute', borderRadius:'50%', filter:'blur(100px)', pointerEvents:'none', width:600, height:600, top:-120, right:-80, background:'radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%)' }
const orb2Style = { position:'absolute', borderRadius:'50%', filter:'blur(100px)', pointerEvents:'none', width:420, height:420, bottom:-80, left:-100, background:'radial-gradient(circle,rgba(244,107,30,.13) 0%,transparent 70%)' }
const eyebrowStyle = { display:'inline-flex', alignItems:'center', gap:'.45rem', border:'1px solid var(--border-o)', background:'var(--o-dim)', borderRadius:50, padding:'.28rem .85rem .28rem .55rem', fontSize:'.75rem', fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--o)', marginBottom:'1.5rem' }
const h1Style = { fontFamily:"'Clash Display',sans-serif", fontSize:'clamp(2.6rem,5.5vw,4.5rem)', fontWeight:700, lineHeight:1.06, letterSpacing:'-.03em', marginBottom:'1.35rem' }
const heroDescStyle = { fontSize:'1.05rem', lineHeight:1.72, color:'var(--muted)', maxWidth:440, marginBottom:'2.2rem' }
const heroMetaStyle = { display:'flex', gap:'2rem', marginTop:'3rem', paddingTop:'2rem', borderTop:'1px solid var(--border)' }
const cardStackStyle = { position:'relative', height:440, width:340 }
const btnLgStyle = { display:'inline-flex', alignItems:'center', gap:'.45rem', padding:'.72rem 1.5rem', background:'var(--o)', color:'#fff', borderRadius:11, fontWeight:600, fontSize:'.95rem', border:'none', cursor:'pointer', textDecoration:'none', fontFamily:"'Cabinet Grotesk',sans-serif", transition:'transform .2s, box-shadow .2s', whiteSpace:'nowrap' }
const btnOutlineLgStyle = { ...btnLgStyle, background:'transparent', border:'1px solid var(--border)', color:'var(--text)' }
const coursesGridStyle = { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:'.875rem' }
