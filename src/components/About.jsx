import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

export default function About() {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="about-section">
      <div className="about-vis r"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={`about-vis-inner${hover ? ' hovered' : ''}`}>
          <div className={`about-ring${hover ? ' ring-pulse' : ''}`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div className="about-vis-label">A School</div>
          <div className="about-vis-sub">Asaka · 2024-yildan</div>

          {/* Animated particles */}
          <div className="particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`particle particle-${i}`}></div>
            ))}
          </div>
        </div>

        <div className={`about-tag${hover ? ' tag-visible' : ''}`}>
          <div className="dot"></div>
          <div>
            <div className="tag-l">Holat</div>
            <div className="tag-v">Yozilish ochiq</div>
          </div>
        </div>
      </div>

      <div className="r" data-d="1">
        <div className="sec-tag">Missiyamiz</div>
        <h2>Zamon bilan <em>birga</em> ketadigan avlod</h2>
        <p className="sec-lead">
          A School — shunchaki kurs emas. Maqsad: o'quvchini natijaga olib chiqish,
          chet tilida erkin gapirtirish, IT va media orqali zamon bilan yuradigan avlodni tayyorlash.
        </p>
        <div className="mission-quote">
          <strong>"Diplom emas, skill kerak"</strong> — bu bizning falsafamiz.
          Har bir dars real hayotga tayyorgarlik, har bir o'quvchi alohida loyiha.
        </div>
        <div className="about-actions">
          <button className="btn btn-primary btn-lg" onClick={scrollToContact}>
            Hozir yozilish
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Kurslar
          </button>
        </div>
      </div>
    </section>
  );
}
