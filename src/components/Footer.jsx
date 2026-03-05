import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer>
      <div>
        <span className="footer-brand"><b>A</b>-School</span>
        &nbsp;·&nbsp; © 2025 Barcha huquqlar himoyalangan.
      </div>
      <div className="footer-links">
        <button onClick={() => scrollTo('courses')}>Kurslar</button>
        <button onClick={() => scrollTo('pricing')}>Narxlar</button>
        <button onClick={() => scrollTo('about')}>Biz haqimizda</button>
        <button onClick={() => scrollTo('contact')}>Aloqa</button>
      </div>
      <div>Asaka · Umid ko'chasi, 70</div>
    </footer>
  );
}
