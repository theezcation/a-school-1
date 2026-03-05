import React from 'react';
import './Why.css';

const WHY = [
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: "Interaktiv darslar", body: "O'yinlar, quizlar, komandaviy kvestlar — faqat \"kitob och, yoz\" emas, bilim mustahkamlanadi." },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>, title: "Natija monitoringi", body: "Har bir o'quvchining o'sishi kuzatiladi. Progress ko'rinadi, zaifliklar vaqtida bartaraf etiladi." },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Ota-onaga hisobot", body: "Muntazam ravishda ota-onaga o'quvchining holati, davomat va natijalari haqida to'liq axborot." },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Tartib va intizom", body: "Eski maktab an'anasi saqlanadi — zamonaviy texnologiyalar bilan. Tartib + erkinlik balansi." },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, title: "Tajribali o'qituvchilar", body: "Har bir yo'nalishda soha mutaxassislari. Nazariya emas — amaliyot ustuvor." },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, title: "Qulay joylashuv", body: "Asaka markazida, transport qulay. Mini-bufet yaqinda ishga tushiriladi." },
];

export default function Why() {
  return (
    <section id="why" className="why-section">
      <div className="sec-header r">
        <div className="sec-tag">Afzalliklar</div>
        <h2>Nima uchun <em>A School?</em></h2>
        <p className="sec-lead">Har bir o'quvchi individual diqqat, monitoring va real natija bilan chiqadi.</p>
      </div>
      <div className="why-grid">
        {WHY.map((w, i) => (
          <div key={i} className="why-card r" data-d={String(i % 3)}>
            <div className="w-icon">{w.icon}</div>
            <div className="w-title">{w.title}</div>
            <div className="w-body">{w.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
