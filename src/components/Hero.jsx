import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.hero-r');
    items?.forEach((el, i) => {
      setTimeout(() => el.classList.add('on'), 100 + i * 120);
    });
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={ref}>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="hero-grid-line"></div>

      <div className="hero-text">
        <div className="eyebrow hero-r">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Asaka · Umid ko'chasi, 70
        </div>
        <h1 className="hero-r" data-d="1">
          Diplom emas,<br />
          <em>Skill</em> kerak<span className="h-outline">.</span>
        </h1>
        <p className="hero-desc hero-r" data-d="2">
          A School – Asaka shahridagi zamonaviy ta'lim markazi.
          <strong> Chet tillari, IT, Media</strong> — interaktiv darslar, real natija.
        </p>
        <div className="hero-actions hero-r" data-d="3">
          <button className="btn btn-primary btn-lg" onClick={() => scrollTo('courses')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Kurslarni ko'rish
          </button>
          <a href="tel:+998771691001" className="btn btn-outline btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Bog'lanish
          </a>
        </div>
        <div className="hero-meta hero-r" data-d="3">
          <div className="meta-item">
            <div className="meta-val">7+</div>
            <div className="meta-label">Yo'nalish</div>
          </div>
          <div className="meta-item">
            <div className="meta-val">100%</div>
            <div className="meta-label">Natijaga ishlash</div>
          </div>
          <div className="meta-item">
            <div className="meta-val">2024</div>
            <div className="meta-label">Asoslanildi</div>
          </div>
        </div>
      </div>

      <div className="hero-visual hero-r" data-d="2">
        <div className="card-stack">
          <div className="hcard hcard-a">
            <div className="hc-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>
              </svg>
            </div>
            <div className="hc-title">Koreys tili</div>
            <div className="hc-sub">Standart + TOPIK tayyorlov</div>
            <div className="hc-price">400 000 so'm</div>
          </div>
          <div className="hcard hcard-main">
            <div className="hc-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div className="hc-title">Ingliz tili</div>
            <div className="hc-sub">Umumiy · Intensiv · IELTS</div>
            <div className="hc-price">360 000 – 560 000 so'm</div>
            <div className="hc-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Eng mashhur
            </div>
          </div>
          <div className="hcard hcard-b">
            <div className="hc-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div className="hc-title">IT / Dasturlash</div>
            <div className="hc-sub">Boshlang'ich va o'rta daraja</div>
            <div className="hc-price">480 000 so'm</div>
          </div>
        </div>
      </div>
    </section>
  );
}
