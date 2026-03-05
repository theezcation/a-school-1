// CoursePage.jsx — FULLY refactored: responsive, clean animations, proper CSS in-component,
// fixes "random CSS pasted after JS" problem (your bottom CSS now lives inside <style>),
// keeps your data shape: course.levels/features/teachers/chips/priceRange/emoji/color/comingSoon/fullDesc

import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getCourseBySlug, courses } from "../lib/courses.js";
import { useReveal } from "../components/useReveal.js";

export default function CoursePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = getCourseBySlug(slug);

  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // simple entry animation class
  const pageClass = "cp page-enter";

  if (!course) {
    return (
      <div className={pageClass} style={{ minHeight: "100vh", display: "grid", placeItems: "center", paddingTop: "var(--nav-h)" }}>
        <div style={{ textAlign: "center", padding: "0 1rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>😕</div>
          <h2 style={{ fontFamily: "'Clash Display',sans-serif", marginBottom: "1rem" }}>Kurs topilmadi</h2>
          <Link to="/" className="cp-btn cp-btn-primary">
            Bosh sahifaga qaytish
          </Link>
        </div>
        <CoursePageStyles />
      </div>
    );
  }

  const isPurple = course.color === "purple";
  const otherCourses = useMemo(() => courses.filter((c) => c.slug !== slug).slice(0, 6), [slug]);

  return (
    <div className={pageClass} style={{ paddingTop: "var(--nav-h)" }}>
      {/* HERO */}
      <header className="cp-hero">
        <div className="cp-orb cp-orb-1" />
        <div className="cp-orb cp-orb-2" />

        <div className="cp-hero-inner">
          <button onClick={() => navigate(-1)} className="cp-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 5-7 7 7 7" />
            </svg>
            Orqaga
          </button>

          <div className="cp-head">
            <div className={`cp-icon-wrap ${isPurple ? "cp-icon-wrap--p" : ""}`}>{course.emoji}</div>

            <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flexWrap: "wrap" }}>
              <h1 className="cp-title">{course.name}</h1>
              {course.comingSoon && (
                <span className="cp-badge">
                  Tez orada
                </span>
              )}
            </div>

            <p className="cp-lead">{course.fullDesc}</p>

            <div className="cp-chips">
              {course.chips?.map((chip) => (
                <span key={chip} className={`cp-chip ${isPurple ? "cp-chip--p" : ""}`}>
                  {chip}
                </span>
              ))}
            </div>

            <div className="cp-hero-actions">
              <a href="/#contact" className="cp-btn cp-btn-primary">
                Hozir yozilish
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a href="tel:+998771691001" className="cp-btn cp-btn-outline">
                📞 Qo'ng'iroq qilish
              </a>

              <div className="cp-price">
                <div className={`cp-price-val ${course.priceRange === "TBA" || course.priceRange === "Bog'laning" ? "cp-price-tba" : ""}`}>
                  {course.priceRange}
                  {course.priceRange !== "TBA" && course.priceRange !== "Bog'laning" && (
                    <span className="cp-price-unit"> so'm/oy</span>
                  )}
                </div>
                <div className="cp-price-sub">Oylik to'lov · yashirin to'lov yo‘q</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="cp-body">
        <div className="cp-grid">
          {/* LEFT */}
          <div>
            {/* Levels */}
            <section className="cp-section reveal">
              <div className="cp-section-title">📚 Kurs darajalari</div>
              <div className="cp-levels">
                {course.levels?.map((level, i) => (
                  <div key={i} className="cp-level-card">
                    <div className="cp-level-top">
                      <div className="cp-level-name">{level.name}</div>
                      <div className={`cp-level-price ${level.price === "TBA" || level.price === "Bog'laning" ? "cp-muted" : ""}`}>
                        {level.price}
                        {level.price !== "TBA" && level.price !== "Bog'laning" ? <span className="cp-level-unit"> so'm/oy</span> : null}
                      </div>
                    </div>
                    <div className="cp-level-desc">{level.desc}</div>
                    <div className="cp-level-tags">
                      <span className={`cp-tag ${isPurple ? "cp-tag--p" : ""}`}>⏱ {level.duration}</span>
                      <span className={`cp-tag ${isPurple ? "cp-tag--p" : ""}`}>💰 {level.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="cp-section reveal" data-delay="1">
              <div className="cp-section-title">✅ Kurs ichida nima bor</div>
              <div className="cp-features">
                {course.features?.map((f, i) => (
                  <div key={i} className="cp-feature-item">
                    <div className={`cp-check ${isPurple ? "cp-check--p" : ""}`}>✓</div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Details cards (nice extras) */}
            <section className="cp-section reveal" data-delay="2">
              <div className="cp-section-title">📌 Qisqa ma'lumot</div>
              <div className="cp-details-grid">
                <div className="cp-detail-card">
                  <div className={`cp-detail-icon ${isPurple ? "cp-detail-icon--p" : ""}`}>👨‍🏫</div>
                  <div className="cp-detail-title">O‘qituvchilar</div>
                  <div className="cp-detail-desc">{(course.teachers || []).join(" · ") || "—"}</div>
                </div>

                <div className="cp-detail-card">
                  <div className={`cp-detail-icon ${isPurple ? "cp-detail-icon--p" : ""}`}>🗓️</div>
                  <div className="cp-detail-title">Dars jadvali</div>
                  <div className="cp-detail-desc">Hafta 3 kun · 12 soat/oy (standart). Intensiv kurslar alohida.</div>
                </div>

                <div className="cp-detail-card">
                  <div className={`cp-detail-icon ${isPurple ? "cp-detail-icon--p" : ""}`}>📍</div>
                  <div className="cp-detail-title">Manzil</div>
                  <div className="cp-detail-desc">Asaka · Umid ko‘chasi, 70</div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT (sticky) */}
          <aside className="cp-aside">
            <div className="cp-sticky reveal" data-delay="1">
              {/* Price / CTA */}
              <div className="cp-box cp-box-accent">
                <div className="cp-box-label">Narx</div>
                <div className={`cp-box-price ${course.priceRange === "TBA" || course.priceRange === "Bog'laning" ? "cp-muted" : ""}`}>
                  {course.priceRange}
                  {course.priceRange !== "TBA" && course.priceRange !== "Bog'laning" && <span className="cp-box-unit"> so'm/oy</span>}
                </div>
                <div className="cp-box-sub">Oylik to‘lov, hech qanday yashirin to‘lov yo‘q</div>

                <div className="cp-divider" />

                <div className="cp-mini">
                  <div className="cp-mini-label">O‘qituvchilar</div>
                  <div className="cp-mini-val">{(course.teachers || []).join(" · ") || "—"}</div>
                </div>

                <a href="/#contact" className="cp-btn cp-btn-primary" style={{ width: "100%" }}>
                  Hozir yozilish
                </a>
                <a href="tel:+998771691001" className="cp-btn cp-btn-outline" style={{ width: "100%", marginTop: ".6rem" }}>
                  📞 Qo'ng'iroq qilish
                </a>
              </div>

              {/* Other courses */}
              <div className="cp-box">
                <div className="cp-box-label">Boshqa yo'nalishlar</div>

                <div className="cp-other-list">
                  {otherCourses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => navigate(`/kurs/${c.slug}`)}
                      className="cp-other-btn"
                      title={c.name}
                    >
                      <span className="cp-other-emoji">{c.emoji}</span>
                      <span className="cp-other-name">{c.name}</span>
                      <span className="cp-other-arrow">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* CTA big */}
        <section className="cp-cta reveal" data-delay="2">
          <h3>Start beramizmi? 🚀</h3>
          <p>1 minutda so‘rov qoldirasan — adminlar tezda bog‘lanadi.</p>
          <div className="cp-cta-actions">
            <a href="/#contact" className="cp-btn cp-btn-primary">Ro'yxatdan o'tish</a>
            <a href="tel:+998771691001" className="cp-btn cp-btn-outline">📞 Qo'ng'iroq</a>
            <Link to="/#courses" className="cp-btn cp-btn-outline">Boshqa kurslar</Link>
          </div>
        </section>
      </main>

      {/* Footer mini */}
      <footer className="cp-footer">
        <Link to="/" className="cp-footer-link">← Bosh sahifaga qaytish</Link>
        <span className="cp-footer-dot">·</span>
        <span>A School, Asaka · Umid ko‘chasi, 70</span>
      </footer>

      <CoursePageStyles />
    </div>
  );
}

/* ============================ STYLES ============================ */
function CoursePageStyles() {
  return (
    <style>{`
      .page-enter { animation: cpPageIn .55s var(--ease, ease) both; }
      @keyframes cpPageIn { from { opacity: .001; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }

      /* reveal */
      .reveal { opacity: .001; transform: translateY(14px); filter: blur(6px); transition: opacity .55s var(--ease, ease), transform .55s var(--ease, ease), filter .55s var(--ease, ease); }
      .reveal.visible { opacity: 1; transform: translateY(0); filter: blur(0); }
      .reveal[data-delay="1"] { transition-delay: .08s; }
      .reveal[data-delay="2"] { transition-delay: .16s; }

      /* buttons */
      .cp-btn {
        display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
        padding:.74rem 1.25rem; border-radius:11px;
        font-weight:700; font-size:.95rem; cursor:pointer; text-decoration:none;
        font-family:'Cabinet Grotesk',sans-serif;
        transition: transform .18s var(--ease, ease), box-shadow .18s var(--ease, ease), border-color .18s, background .18s, color .18s;
        user-select:none;
      }
      .cp-btn:active { transform: translateY(1px) scale(.99); }
      .cp-btn-primary { background: var(--o); color:#fff; border:1px solid transparent; }
      .cp-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 38px var(--shadow); }
      .cp-btn-outline { background: transparent; color: var(--text); border:1px solid var(--border); }
      .cp-btn-outline:hover { border-color: var(--border-o); transform: translateY(-1px); }

      /* HERO */
      .cp-hero {
        background: var(--bg1);
        border-bottom: 1px solid var(--border);
        padding: 4rem clamp(1rem, 5vw, 3.5rem) 3.2rem;
        position: relative;
        overflow: hidden;
      }
      .cp-orb { position:absolute; border-radius:50%; filter: blur(100px); pointer-events:none; opacity:.95; }
      .cp-orb-1 {
        width: 520px; height: 520px; top: -140px; right: -90px;
        background: radial-gradient(circle, rgba(244,107,30,.12) 0%, transparent 70%);
      }
      .cp-orb-2 {
        width: 360px; height: 360px; bottom: -140px; left: -120px;
        background: radial-gradient(circle, rgba(124,58,237,.14) 0%, transparent 70%);
      }
      .cp-hero-inner { max-width: 980px; margin: 0 auto; position: relative; z-index: 1; }

      .cp-back {
        display:inline-flex; align-items:center; gap:.45rem;
        background: var(--card); border:1px solid var(--border);
        color: var(--muted); border-radius: 10px;
        padding: .44rem .85rem;
        font-family: 'Cabinet Grotesk',sans-serif;
        font-size: .88rem;
        cursor: pointer;
        transition: color .2s, border-color .2s, transform .2s var(--ease, ease);
      }
      .cp-back:hover { color: var(--o); border-color: var(--border-o); transform: translateY(-1px); }

      .cp-head { margin-top: 1.4rem; }
      .cp-icon-wrap {
        width: 68px; height: 68px; border-radius: 18px;
        display:grid; place-items:center;
        background: var(--o-dim);
        border: 1px solid rgba(244,107,30,.2);
        color: var(--o);
        font-size: 2.2rem;
        margin-bottom: 1.2rem;
        box-shadow: 0 16px 40px var(--shadow);
      }
      .cp-icon-wrap--p { background: var(--p-soft); border-color: rgba(124,58,237,.2); color: var(--p-mid); }

      .cp-title {
        font-family:'Clash Display',sans-serif;
        font-size: clamp(2rem, 5vw, 3.45rem);
        font-weight: 850;
        line-height: 1.1;
        letter-spacing: -.03em;
        margin: 0;
        color: var(--text);
      }
      .cp-badge {
        background: var(--p-soft);
        color: var(--p-mid);
        border: 1px solid rgba(124,58,237,.2);
        border-radius: 999px;
        padding: .25rem .8rem;
        font-size: .72rem;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .cp-lead {
        font-size: 1.06rem;
        color: var(--muted);
        line-height: 1.75;
        max-width: 720px;
        margin: .9rem 0 1.2rem;
      }

      .cp-chips { display:flex; flex-wrap:wrap; gap:.45rem; margin-bottom: 1.1rem; }
      .cp-chip {
        font-size: .72rem;
        font-weight: 900;
        letter-spacing: .06em;
        text-transform: uppercase;
        padding: .25rem .7rem;
        border-radius: 8px;
        background: var(--o-dim);
        border: 1px solid rgba(244,107,30,.18);
        color: var(--o);
      }
      .cp-chip--p { background: var(--p-soft); border-color: rgba(124,58,237,.2); color: var(--p-mid); }

      .cp-hero-actions {
        display:flex; align-items:flex-start; gap:.8rem; flex-wrap: wrap;
        margin-top: 1.2rem;
      }

      .cp-price { margin-left: auto; min-width: 220px; padding: .85rem 1rem; border-radius: 14px; background: var(--card); border: 1px solid var(--border); }
      .cp-price-val { font-family:'Clash Display',sans-serif; font-size: 1.55rem; font-weight: 900; color: var(--o); line-height: 1; }
      .cp-price-unit { font-size: .9rem; color: var(--muted); font-weight: 500; }
      .cp-price-tba { color: var(--muted); }
      .cp-price-sub { font-size: .78rem; color: var(--muted); margin-top: .35rem; }

      /* BODY */
      .cp-body { padding: 3rem clamp(1rem, 5vw, 3.5rem) 4.5rem; max-width: 980px; margin: 0 auto; }
      .cp-grid { display:grid; grid-template-columns: 1.25fr .75fr; gap: 2.2rem; align-items: start; }
      .cp-aside { min-width: 0; }
      .cp-sticky { position: sticky; top: calc(var(--nav-h) + 1.2rem); display:flex; flex-direction: column; gap: 1rem; }

      .cp-section { margin-bottom: 2.2rem; }
      .cp-section-title { font-family:'Clash Display',sans-serif; font-weight: 850; font-size: 1rem; color: var(--text); margin-bottom: .85rem; }

      /* levels */
      .cp-levels { display:flex; flex-direction: column; gap: .8rem; }
      .cp-level-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 1.35rem;
        transition: border-color .25s, transform .25s var(--ease, ease), box-shadow .25s;
      }
      .cp-level-card:hover { border-color: var(--border-o); transform: translateY(-2px); box-shadow: 0 12px 36px var(--shadow); }
      .cp-level-top { display:flex; justify-content: space-between; gap: 1rem; align-items: baseline; }
      .cp-level-name { font-family:'Clash Display',sans-serif; font-weight: 850; color: var(--text); }
      .cp-level-price { font-family:'Clash Display',sans-serif; font-weight: 900; color: var(--o); }
      .cp-level-unit { font-family:'Cabinet Grotesk',sans-serif; font-weight: 500; color: var(--muted); font-size: .85rem; }
      .cp-level-desc { margin-top: .55rem; font-size: .9rem; color: var(--muted); line-height: 1.65; }
      .cp-level-tags { display:flex; flex-wrap: wrap; gap: .45rem; margin-top: .85rem; }
      .cp-tag {
        font-size: .72rem; font-weight: 850;
        background: var(--o-dim);
        color: var(--o);
        padding: .22rem .62rem;
        border-radius: 8px;
        border: 1px solid rgba(244,107,30,.18);
      }
      .cp-tag--p { background: var(--p-soft); color: var(--p-mid); border-color: rgba(124,58,237,.2); }

      /* features */
      .cp-features { display:flex; flex-direction: column; gap: .55rem; }
      .cp-feature-item {
        display:flex; align-items:center; gap: .75rem;
        padding: .78rem 1rem;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 12px;
        transition: border-color .2s, transform .2s var(--ease, ease);
      }
      .cp-feature-item:hover { border-color: var(--border-o); transform: translateY(-1px); }
      .cp-check {
        width: 26px; height: 26px; border-radius: 999px;
        background: var(--o-dim);
        border: 1px solid rgba(244,107,30,.18);
        display:grid; place-items:center;
        color: var(--o);
        font-weight: 950;
        flex-shrink: 0;
        font-size: .8rem;
      }
      .cp-check--p { background: var(--p-soft); border-color: rgba(124,58,237,.2); color: var(--p-mid); }

      /* details cards */
      .cp-details-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: .875rem; }
      .cp-detail-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 1.5rem;
        transition: border-color .25s, transform .25s var(--ease, ease), box-shadow .25s;
      }
      .cp-detail-card:hover { border-color: var(--border-o); transform: translateY(-2px); box-shadow: 0 12px 36px var(--shadow); }
      .cp-detail-icon {
        width: 42px; height: 42px; border-radius: 12px;
        background: var(--o-dim);
        border: 1px solid rgba(244,107,30,.18);
        display:grid; place-items:center;
        color: var(--o);
        margin-bottom: .95rem;
        font-size: 1.1rem;
      }
      .cp-detail-icon--p { background: var(--p-soft); border-color: rgba(124,58,237,.2); color: var(--p-mid); }
      .cp-detail-title { font-family:'Clash Display',sans-serif; font-weight: 850; margin-bottom: .35rem; }
      .cp-detail-desc { font-size: .88rem; color: var(--muted); line-height: 1.65; }

      /* aside boxes */
      .cp-box {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 1.5rem;
      }
      .cp-box-accent { border-color: var(--border-o); }
      .cp-box-label {
        font-size: .72rem;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: .08em;
        margin-bottom: .75rem;
        font-weight: 700;
      }
      .cp-box-price { font-family:'Clash Display',sans-serif; font-size: 2rem; font-weight: 900; color: var(--o); line-height: 1; }
      .cp-box-unit { font-family:'Cabinet Grotesk',sans-serif; font-size: .9rem; color: var(--muted); font-weight: 500; }
      .cp-box-sub { font-size: .82rem; color: var(--muted); margin-top: .5rem; line-height: 1.6; }
      .cp-divider { height: 1px; background: var(--border); margin: 1.1rem 0; opacity: .9; }
      .cp-mini { display:flex; flex-direction: column; gap: .2rem; margin-bottom: 1rem; }
      .cp-mini-label { font-size: .72rem; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; font-weight: 800; }
      .cp-mini-val { font-size: .9rem; color: var(--text); line-height: 1.55; }

      .cp-other-list { display:flex; flex-direction: column; gap: .5rem; }
      .cp-other-btn {
        display:flex; align-items:center; gap: .7rem;
        width: 100%;
        padding: .7rem .85rem;
        border-radius: 12px;
        background: transparent;
        border: 1px solid var(--border);
        cursor: pointer;
        text-align: left;
        color: var(--text);
        font-family:'Cabinet Grotesk',sans-serif;
        font-size: .92rem;
        transition: border-color .2s, transform .2s var(--ease, ease), background .2s;
      }
      .cp-other-btn:hover { border-color: var(--border-o); transform: translateY(-1px); background: var(--card-h); }
      .cp-other-emoji { width: 22px; display:inline-flex; justify-content: center; }
      .cp-other-name { flex: 1; font-weight: 650; }
      .cp-other-arrow { color: var(--muted); }

      /* CTA */
      .cp-cta {
        margin-top: 2.2rem;
        background: linear-gradient(135deg, var(--o-dim), var(--p-soft));
        border: 1px solid var(--border-o);
        border-radius: 22px;
        padding: 2.2rem;
        text-align: center;
      }
      .cp-cta h3 { font-family:'Clash Display',sans-serif; font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 900; margin: 0 0 .7rem; }
      .cp-cta p { color: var(--muted); margin: 0 0 1.4rem; }
      .cp-cta-actions { display:flex; gap:.7rem; justify-content:center; flex-wrap: wrap; }

      /* footer */
      .cp-footer {
        border-top: 1px solid var(--border);
        padding: 1.35rem clamp(1rem, 5vw, 3.5rem);
        text-align: center;
        color: var(--muted);
        font-size: .85rem;
      }
      .cp-footer-link { color: var(--o); text-decoration: none; font-weight: 700; }
      .cp-footer-link:hover { text-decoration: underline; }
      .cp-footer-dot { margin: 0 .6rem; }

      /* misc */
      .cp-muted { color: var(--muted) !important; }

      /* responsive */
      @media (max-width: 980px) {
        .cp-grid { grid-template-columns: 1fr; }
        .cp-price { margin-left: 0; width: 100%; }
        .cp-sticky { position: static; }
      }
      @media (max-width: 520px) {
        .cp-hero { padding: 3.2rem 1rem 2.4rem; }
        .cp-btn { width: 100%; }
        .cp-hero-actions { gap: .6rem; }
        .cp-cta { padding: 1.6rem; }
      }

      /* accessibility focus */
      a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--o-dim);
        border-color: var(--o);
      }
    `}</style>
  );
}