import React, { useState } from 'react';
import { supabase } from '../supabase';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ full_name: '', phone: '', direction: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async () => {
    if (!form.full_name.trim() || !form.phone.trim()) {
      alert("Ism va telefon raqamini kiriting!");
      return;
    }
    setStatus('loading');
    try {
      const { error } = await supabase.from('site_leads').insert([{
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        direction: form.direction || null,
      }]);
      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <div className="contact-wrap">
        <div>
          <div className="sec-tag r">Aloqa</div>
          <h2 className="r" data-d="1">Boshlashga <em>tayyor?</em></h2>
          <p className="sec-lead r" data-d="2">Savol yoki ro'yxatdan o'tish uchun biz bilan bog'laning.</p>
          <div className="contact-list">
            <div className="contact-item r">
              <div className="ci-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className="ci-label">Manzil</div>
                <div className="ci-val">Asaka, Umid ko'chasi, 70-uy</div>
              </div>
            </div>
            <div className="contact-item r" data-d="1">
              <div className="ci-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <div className="ci-label">Ish vaqti</div>
                <div className="ci-val">Du – Sha · 08:00 – 20:00</div>
              </div>
            </div>
            <a href="https://t.me/aschool_uz" target="_blank" rel="noreferrer" className="contact-item r" data-d="2" style={{textDecoration:'none',color:'inherit'}}>
              <div className="ci-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
                </svg>
              </div>
              <div>
                <div className="ci-label">Telegram</div>
                <div className="ci-val">@aschool_uz</div>
              </div>
            </a>
            <a href="tel:+998771691001" className="contact-item r" data-d="3" style={{textDecoration:'none',color:'inherit'}}>
              <div className="ci-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <div className="ci-label">Telefon</div>
                <div className="ci-val">+998 77 169 10 01</div>
              </div>
            </a>
          </div>
        </div>

        <div className="form-card r" data-d="1">
          {status === 'success' ? (
            <div className="form-success">
              <div className="success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <div className="success-title">Yuborildi!</div>
              <p className="success-msg">So'rovingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.</p>
            </div>
          ) : (
            <>
              <div className="form-title">Ro'yxatdan o'tish</div>
              <div className="form-group">
                <label>Ism va familiya</label>
                <input
                  type="text"
                  placeholder="Ism Familiya"
                  value={form.full_name}
                  onChange={e => setForm(f => ({...f, full_name: e.target.value}))}
                />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input
                  type="tel"
                  placeholder="+998 90 000 00 00"
                  value={form.phone}
                  onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                />
              </div>
              <div className="form-group">
                <label>Yo'nalish</label>
                <select value={form.direction} onChange={e => setForm(f => ({...f, direction: e.target.value}))}>
                  <option value="">Tanlang…</option>
                  <option>Ingliz tili – Umumiy</option>
                  <option>Ingliz tili – Intensiv</option>
                  <option>Ingliz tili – IELTS</option>
                  <option>Rus tili</option>
                  <option>Koreys tili – Standart</option>
                  <option>Koreys tili – TOPIK</option>
                  <option>IT / Dasturlash</option>
                  <option>Media yo'nalishi</option>
                  <option>Kimyo</option>
                  <option>Biologiya</option>
                </select>
              </div>
              {status === 'error' && (
                <p style={{color:'#ef4444', fontSize:'.8rem', marginBottom:'.5rem'}}>
                  Xatolik yuz berdi. Qaytadan urinib ko'ring.
                </p>
              )}
              <button
                className="btn btn-primary btn-lg form-submit"
                onClick={handleSubmit}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="spinner"></span>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
                  </svg>
                )}
                {status === 'loading' ? 'Yuborilmoqda...' : "So'rov yuborish"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
