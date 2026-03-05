import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import './Courses.css';

const icons = {
  globe: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  flag: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>,
  flag2: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>,
  code: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  video: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>,
  flask: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.58 16.5h12.85"/></svg>,
};

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default function Courses() {
  return (
    <section id="courses">
      <div className="sec-header r">
        <div className="sec-tag">Yo'nalishlar</div>
        <h2>Hamma narsa <em>bir joyda</em></h2>
        <p className="sec-lead">Interaktiv o'yinlar, quizlar, komandaviy kvestlar — har bir dars real hayotga tayyorgarlik.</p>
      </div>
      <div className="courses-grid">
        {courses.map((c, i) => (
          <Link
            key={c.id}
            to={`/kurs/${c.slug}`}
            className={`course-card r${c.accent === 'purple' ? ' course-card--purple' : ''}`}
            data-d={String(i % 3)}
          >
            <div className={`c-icon${c.accent === 'purple' ? ' c-icon--v' : ''}`}>
              {icons[c.icon]}
            </div>
            <div className="c-name">{c.name}</div>
            <div className="c-desc">{c.shortDesc}</div>
            <div className="c-chips">
              {c.chips.map((ch, ci) => (
                <span key={ci} className={`chip${ci === c.chips.length - 1 && c.accent === 'purple' ? ' chip--v' : ''}`}>
                  {ch}
                </span>
              ))}
            </div>
            <div className="c-footer">
              {c.price ? (
                <div className="c-price">{c.price} <small>so'm/oy</small></div>
              ) : (
                <div className="c-tba">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                  </svg>
                  {c.priceLabel}
                </div>
              )}
              <div className="c-arr"><Arrow /></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
