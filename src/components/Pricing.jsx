import React from 'react';
import './Pricing.css';

const PRICES = [
  { name: "Ingliz / Rus / Koreys · Standart", val: "360 000", unit: "so'm/oy", note: "Hafta 3 kun · 12 soat/oy", hot: true, icon: "globe" },
  { name: "Koreys tili · TOPIK", val: "400 000", unit: "so'm/oy", note: "Imtihon tayyorlov dasturi", icon: "book" },
  { name: "Intensiv kurs", val: "560 000", unit: "so'm/oy", note: "Tezlashtirilgan format", icon: "zap" },
  { name: "IELTS & Imtihon tayyorlov", val: "530 000", unit: "so'm/oy", note: "Xalqaro sertifikatlar", icon: "award" },
  { name: "IT / Dasturlash", val: "480 000", unit: "so'm/oy", note: "Amaliy loyihalar bilan", icon: "code" },
  { name: "Media yo'nalishi", val: "TBA", unit: null, note: "Shakllanmoqda", icon: "video" },
];

const icons = {
  globe: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  book: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>,
  zap: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  award: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>,
  code: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  video: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>,
};

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="sec-header r">
        <div className="sec-tag">Narxlar</div>
        <h2>Ochiq va <em>adolatli</em> narxlar</h2>
        <p className="sec-lead">Bozordagi o'rtacha segment — sifat esa yuqori. Gap ochiq.</p>
      </div>
      <div className="pricing-grid">
        {PRICES.map((p, i) => (
          <div key={i} className={`price-card r${p.hot ? ' price-card--hot' : ''}`} data-d={String(i % 3)}>
            {p.hot && (
              <div className="hot-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Top
              </div>
            )}
            <div className="p-icon">{icons[p.icon]}</div>
            <div className="p-name">{p.name}</div>
            <div className={`p-val${!p.unit ? ' p-val--muted' : ''}`}>
              {p.val} {p.unit && <span>{p.unit}</span>}
            </div>
            <div className="p-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {p.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
