// HomePage.jsx — fully fixed + responsive + nicer animations (no broken cleanup)
// Works with your existing: useReveal(), courses[], supabase, CSS vars: --o --p-mid --bg --bg1 --bg2 --card --card-h --text --muted --border --border-o --shadow --radius --ease --nav-h

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../components/useReveal.js";
import { courses } from "../lib/courses.js";
import { supabase } from "../lib/supabase.js";

export default function HomePage() {
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);

    const els = Array.from(document.querySelectorAll(".reveal"));
    els.forEach((el) => el.classList.remove("visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
          else e.target.classList.remove("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // small delay so first paint happens
    const t = setTimeout(() => {
      els.forEach((el) => observer.observe(el));
    }, 60);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hp page-enter">
      <HeroSection />
      <div className="hp-divider" />
      <CoursesSection />
      <div className="hp-divider" />
      <WhySection />
      <div className="hp-divider" />
      <PricingSection />
      <div className="hp-divider" />
      <AboutSection />
      <div className="hp-divider" />
      <ContactSection />
      <Footer />

      {/* ===== Page CSS (responsive + animations) ===== */}
      <style>{`
        /* entry */
        .page-enter { animation: hpPageIn .55s var(--ease, ease) both; }
        @keyframes hpPageIn { from { opacity: .001; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }

        /* reveal base (works with your useReveal too) */
        .reveal { opacity: .001; transform: translateY(14px); filter: blur(6px); transition: opacity .55s var(--ease, ease), transform .55s var(--ease, ease), filter .55s var(--ease, ease); will-change: transform, opacity, filter; }
        .reveal.visible { opacity: 1; transform: translateY(0); filter: blur(0); }
        .reveal[data-delay="1"] { transition-delay: .08s; }
        .reveal[data-delay="2"] { transition-delay: .16s; }
        .reveal[data-delay="3"] { transition-delay: .24s; }

        /* layout helpers */
        .hp-divider { height: 1px; background: var(--border); margin: 0 clamp(1rem, 5vw, 3.5rem); opacity: .9; }
        .hp-section { padding: clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 3.5rem); }
        .hp-header { max-width: 560px; margin-bottom: 3.5rem; }
        .hp-tag { display: inline-flex; align-items: center; gap: .5rem; font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--o); margin-bottom: .85rem; padding-left: 1.2rem; position: relative; }
        .hp-tag:before { content:""; position:absolute; left:0; top:50%; width:.55rem; height:.55rem; transform: translateY(-50%); border-radius: 50%; background: var(--o); box-shadow: 0 0 0 6px var(--o-dim); }
        .hp-h2 { font-family: 'Clash Display', sans-serif; font-size: clamp(1.9rem, 3.5vw, 2.75rem); font-weight: 750; line-height: 1.12; letter-spacing: -.025em; margin-bottom: .7rem; color: var(--text); }
        .hp-lead { font-size: 1rem; color: var(--muted); line-height: 1.7; }

        /* buttons */
        .hp-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: .5rem; padding: .74rem 1.45rem; border-radius: 11px;
          font-weight: 650; font-size: .95rem; cursor: pointer; text-decoration: none;
          font-family: 'Cabinet Grotesk', sans-serif;
          transition: transform .18s var(--ease, ease), box-shadow .18s var(--ease, ease), background .18s, border-color .18s, color .18s;
          user-select: none;
        }
        .hp-btn:active { transform: translateY(1px) scale(.99); }
        .hp-btn-primary { background: var(--o); color: #fff; border: 1px solid transparent; }
        .hp-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 38px var(--shadow); }
        .hp-btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
        .hp-btn-outline:hover { border-color: var(--border-o); transform: translateY(-1px); }

        /* HERO */
        .hp-hero {
          min-height: 100svh;
          padding-top: calc(var(--nav-h) + 5rem);
          padding-bottom: 5rem;
          padding-left: clamp(1rem, 5vw, 3.5rem);
          padding-right: clamp(1rem, 5vw, 3.5rem);
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hp-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; opacity: .95; }
        .hp-orb.one { width: 620px; height: 620px; top: -140px; right: -90px; background: radial-gradient(circle, rgba(124,58,237,.22) 0%, transparent 70%); }
        .hp-orb.two { width: 460px; height: 460px; bottom: -120px; left: -140px; background: radial-gradient(circle, rgba(244,107,30,.14) 0%, transparent 70%); }
        .hp-eyebrow {
          display: inline-flex; align-items: center; gap: .45rem;
          border: 1px solid var(--border-o);
          background: var(--o-dim);
          border-radius: 999px;
          padding: .28rem .9rem .28rem .6rem;
          font-size: .75rem;
          font-weight: 800;
          letter-spacing: .05em;
          text-transform: uppercase;
          color: var(--o);
          margin-bottom: 1.5rem;
        }
        .hp-h1 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(2.5rem, 5.4vw, 4.6rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -.03em;
          margin-bottom: 1.25rem;
          color: var(--text);
        }
        .hp-hero-desc { font-size: 1.05rem; line-height: 1.72; color: var(--muted); max-width: 460px; margin-bottom: 2.1rem; }
        .hp-meta { display: flex; gap: 2rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        .hp-metaVal { font-family: 'Clash Display', sans-serif; font-size: 1.85rem; font-weight: 800; color: var(--o); line-height: 1; }
        .hp-metaLab { font-size: .75rem; color: var(--muted); margin-top: .3rem; letter-spacing: .04em; }

        /* floating cards */
        .hp-stack { position: relative; height: 460px; width: 360px; margin-inline: auto; }
        .hp-float {
          position: absolute;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.15rem 1.3rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 22px 60px var(--shadow);
          animation-duration: 5.6s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          transform-style: preserve-3d;
        }
        .hp-float:hover { border-color: var(--border-o); transform: translateY(-2px) rotateZ(.2deg); transition: transform .2s var(--ease, ease), border-color .2s; }
        @keyframes hpFloatMain { 0%,100%{ transform: translate(-50%,-50%) rotateZ(-.35deg)} 50%{ transform: translate(-50%, calc(-50% - 10px)) rotateZ(.35deg)} }
        @keyframes hpFloatA { 0%,100%{ transform: translateY(0) rotateZ(.25deg)} 50%{ transform: translateY(-10px) rotateZ(-.25deg)} }
        @keyframes hpFloatB { 0%,100%{ transform: translateY(0) rotateZ(-.2deg)} 50%{ transform: translateY(-8px) rotateZ(.2deg)} }

        /* cards grids */
        .hp-grid-courses { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: .875rem; }
        .hp-grid-why { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: .875rem; }
        .hp-grid-prices { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: .875rem; }

        /* about/contact two cols */
        .hp-two { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 5rem); align-items: center; }
        .hp-twoTop { display:grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }

        /* responsive */
        @media (max-width: 980px) {
          .hp-hero { grid-template-columns: 1fr; padding-top: calc(var(--nav-h) + 3.2rem); gap: 2.2rem; }
          .hp-stack { height: 420px; width: min(360px, 100%); }
          .hp-meta { gap: 1.35rem; flex-wrap: wrap; }
          .hp-two, .hp-twoTop { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .hp-h1 { font-size: 2.3rem; }
          .hp-btn { width: 100%; }
          .hp-meta { padding-top: 1.3rem; margin-top: 2rem; }
          .hp-header { margin-bottom: 2.2rem; }
        }

        /* focus states (keyboard users) */
        a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--o-dim);
          border-color: var(--o);
        }
      `}</style>
    </div>
  );
}

/* ── HERO ── */
function HeroSection() {
  const navigate = useNavigate();
  return (
    <section id="hero" className="hp-hero">
      <div className="hp-orb one" />
      <div className="hp-orb two" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="hp-eyebrow">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Asaka · Umid ko'chasi, 70
        </div>

        <h1 className="hp-h1">
          Diplom emas,
          <br />
          <em style={{ color: "var(--o)", fontStyle: "normal" }}>Skill</em> kerak
          <span
            style={{
              WebkitTextStroke: "1.5px var(--p-mid)",
              color: "transparent",
            }}
          >
            .
          </span>
        </h1>

        <p className="hp-hero-desc">
          A School – Asaka shahridagi zamonaviy ta'lim markazi.{" "}
          <strong style={{ color: "var(--text)", fontWeight: 650 }}>
            Chet tillari, IT, Media
          </strong>{" "}
          – interaktiv darslar, real natija.
        </p>

        <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap" }}>
          <a className="hp-btn hp-btn-primary" href="#courses">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Kurslarni ko'rish
          </a>

          <a className="hp-btn hp-btn-outline" href="tel:+998771691001">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Bog'lanish
          </a>

         <a href="#contact">
          <button
            className="hp-btn hp-btn-outline"
            style={{ borderStyle: "dashed" }}
            title="Katta gap: 2 klikda kursga 😄"
          >
            ⚡ Tez yozilish
          </button>
         </a>
        </div>

        <div className="hp-meta">
          {[
            ["7+", "Yo'nalish"],
            ["100%", "Natijaga ishlash"],
            ["2024", "Asoslanildi"],
          ].map(([val, label]) => (
            <div key={label}>
              <div className="hp-metaVal">{val}</div>
              <div className="hp-metaLab">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cards */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="hp-stack">
          <FloatCard
            style={{ width: 205, top: 10, right: -8, animationName: "hpFloatA" }}
            title="Koreys tili"
            sub="Standart + TOPIK tayyorlov"
            price="400 000 so'm"
          />
          <FloatCard
            style={{
              width: 290,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              border: "1px solid var(--border-o)",
              animationName: "hpFloatMain",
            }}
            title="Ingliz tili"
            sub="Umumiy · Intensiv · IELTS"
            price="360 000 – 560 000 so'm"
            badge="Eng mashhur"
          />
          <FloatCard
            style={{
              width: 205,
              bottom: 10,
              left: -8,
              animationName: "hpFloatB",
              animationDelay: ".35s",
            }}
            title="IT / Dasturlash"
            sub="Boshlang'ich va o'rta daraja"
            price="480 000 so'm"
          />
        </div>
      </div>
    </section>
  );
}

function FloatCard({ style, title, sub, price, badge }) {
  const base = {
    ...style,
  };
  return (
    <div className="hp-float" style={base}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: "var(--o-dim)",
          border: "1px solid rgba(244,107,30,.18)",
          display: "grid",
          placeItems: "center",
          color: "var(--o)",
          marginBottom: ".85rem",
        }}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>

      <div
        style={{
          fontFamily: "'Clash Display',sans-serif",
          fontWeight: 700,
          fontSize: ".92rem",
          color: "var(--text)",
          marginBottom: ".2rem",
        }}
      >
        {title}
      </div>

      <div style={{ fontSize: ".76rem", color: "var(--muted)", lineHeight: 1.55 }}>
        {sub}
      </div>

      <div
        style={{
          fontFamily: "'Clash Display',sans-serif",
          fontWeight: 800,
          fontSize: "1rem",
          color: "var(--o)",
          marginTop: ".8rem",
        }}
      >
        {price}
      </div>

      {badge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".3rem",
            background: "var(--p-soft)",
            color: "var(--p-mid)",
            border: "1px solid rgba(124,58,237,.2)",
            borderRadius: 999,
            fontSize: ".68rem",
            fontWeight: 900,
            letterSpacing: ".04em",
            textTransform: "uppercase",
            padding: ".18rem .6rem",
            marginTop: ".7rem",
          }}
        >
          ⭐ {badge}
        </div>
      )}
    </div>
  );
}

/* ── COURSES ── */
function CoursesSection() {
  const navigate = useNavigate();
  return (
    <section id="courses" className="hp-section">
      <div className="reveal hp-header">
        <div className="hp-tag">Yo'nalishlar</div>
        <h2 className="hp-h2">
          Hamma narsa <em style={{ color: "var(--o)", fontStyle: "normal" }}>bir joyda</em>
        </h2>
        <p className="hp-lead">
          Interaktiv o'yinlar, quizlar, komandaviy kvestlar — har bir dars real hayotga tayyorgarlik.
        </p>
      </div>

      <div className="hp-grid-courses">
        {courses.map((course, i) => (
          <CourseCard
            key={course.id}
            course={course}
            delay={(i % 3) + 1}
            onClick={() => navigate(`/kurs/${course.slug}`)}
          />
        ))}
      </div>
    </section>
  );
}

function CourseCard({ course, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isV = course.color === "purple";

  return (
    <div
      className="reveal"
      data-delay={String(delay)}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--card-h)" : "var(--card)",
        border: `1px solid ${hovered ? "var(--border-o)" : "var(--border)"}`,
        borderRadius: "var(--radius)",
        padding: "1.6rem",
        display: "flex",
        flexDirection: "column",
        gap: ".7rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 12px 36px var(--shadow)" : "none",
        transition:
          "transform .25s var(--ease), border-color .25s, box-shadow .25s, background .25s",
      }}
    >
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg,var(--o-dim) 0%,transparent 55%)",
            borderRadius: "var(--radius)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: isV ? "var(--p-soft)" : "var(--o-dim)",
          border: `1px solid ${
            isV ? "rgba(124,58,237,.2)" : "rgba(244,107,30,.18)"
          }`,
          display: "grid",
          placeItems: "center",
          color: isV ? "var(--p-mid)" : "var(--o)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>{course.emoji}</span>
      </div>

      <div
        style={{
          fontFamily: "'Clash Display',sans-serif",
          fontSize: "1.05rem",
          fontWeight: 750,
          color: "var(--text)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {course.name}
      </div>

      <div
        style={{
          fontSize: ".875rem",
          color: "var(--muted)",
          lineHeight: 1.65,
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {course.shortDesc}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", position: "relative", zIndex: 1 }}>
        {course.chips.map((chip) => (
          <span
            key={chip}
            style={{
              fontSize: ".68rem",
              fontWeight: 900,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              padding: ".2rem .58rem",
              borderRadius: 7,
              background: isV ? "var(--p-soft)" : "var(--o-dim)",
              border: `1px solid ${
                isV ? "rgba(124,58,237,.2)" : "rgba(244,107,30,.18)"
              }`,
              color: isV ? "var(--p-mid)" : "var(--o)",
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: ".8rem",
          borderTop: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "'Clash Display',sans-serif",
            fontWeight: 850,
            fontSize: ".95rem",
            color: "var(--o)",
          }}
        >
          {course.priceRange === "TBA" || course.priceRange === "Bog'laning" ? (
            <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>{course.priceRange}</span>
          ) : (
            <>
              {course.priceRange}{" "}
              <small
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: ".7rem",
                  color: "var(--muted)",
                  fontWeight: 450,
                }}
              >
                so'm/oy
              </small>
            </>
          )}
        </div>

        <div
          style={{
            color: hovered ? "var(--o)" : "var(--muted)",
            transform: hovered ? "translateX(3px)" : "none",
            transition: "color .2s, transform .2s",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── WHY ── */
function WhySection() {
  const reasons = [
    { icon: "⚡", title: "Interaktiv darslar", body: "O'yinlar, quizlar, komandaviy kvestlar — faqat 'kitob och, yoz' emas, bilim mustahkamlanadi." },
    { icon: "📊", title: "Natija monitoringi", body: "Har bir o'quvchining o'sishi kuzatiladi. Progress ko'rinadi, zaifliklar vaqtida bartaraf etiladi." },
    { icon: "👨‍👩‍👧", title: "Ota-onaga hisobot", body: "Muntazam ravishda ota-onaga o'quvchining holati, davomat va natijalari haqida to'liq axborot." },
    { icon: "🛡️", title: "Tartib va intizom", body: "Eski maktab an'anasi saqlanadi — zamonaviy texnologiyalar bilan. Tartib + erkinlik balansi." },
    { icon: "🎓", title: "Tajribali o'qituvchilar", body: "Har bir yo'nalishda soha mutaxassislari. Nazariya emas — amaliyot ustuvor." },
    { icon: "📍", title: "Qulay joylashuv", body: "Asaka markazida, transport qulay. Mini-bufet yaqinda ishga tushiriladi." },
  ];

  return (
    <section id="why" className="hp-section" style={{ background: "var(--bg1)" }}>
      <div className="reveal hp-header">
        <div className="hp-tag">Afzalliklar</div>
        <h2 className="hp-h2">
          Nima uchun <em style={{ color: "var(--o)", fontStyle: "normal" }}>A School?</em>
        </h2>
        <p className="hp-lead">Har bir o'quvchi individual diqqat, monitoring va real natija bilan chiqadi.</p>
      </div>

      <div className="hp-grid-why">
        {reasons.map((r, i) => (
          <WhyCard key={r.title} {...r} delay={(i % 3) + 1} />
        ))}
      </div>
    </section>
  );
}

function WhyCard({ icon, title, body, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="reveal"
      data-delay={String(delay)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hovered ? "var(--border-o)" : "var(--border)"}`,
        borderRadius: "var(--radius)",
        padding: "1.6rem",
        transition: "border-color .25s, transform .25s var(--ease), box-shadow .25s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 12px 36px var(--shadow)" : "none",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: "var(--o-dim)",
          border: "1px solid rgba(244,107,30,.18)",
          display: "grid",
          placeItems: "center",
          marginBottom: "1rem",
          fontSize: "1.25rem",
        }}
      >
        {icon}
      </div>
      <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: ".95rem", fontWeight: 750, marginBottom: ".4rem", color: "var(--text)" }}>
        {title}
      </div>
      <div style={{ fontSize: ".875rem", color: "var(--muted)", lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

/* ── PRICING ── */
function PricingSection() {
  const prices = [
    { name: "Ingliz / Rus / Koreys · Standart", val: "360 000", note: "Hafta 3 kun · 12 soat/oy", hot: true },
    { name: "Koreys tili · TOPIK", val: "400 000", note: "Imtihon tayyorlov dasturi" },
    { name: "Intensiv kurs", val: "560 000", note: "Tezlashtirilgan format" },
    { name: "IELTS & Imtihon tayyorlov", val: "530 000", note: "Xalqaro sertifikatlar" },
    { name: "IT / Dasturlash", val: "480 000", note: "Amaliy loyihalar bilan" },
    { name: "Media yo'nalishi", val: "TBA", note: "Shakllanmoqda" },
  ];

  return (
    <section id="pricing" className="hp-section">
      <div className="reveal hp-header">
        <div className="hp-tag">Narxlar</div>
        <h2 className="hp-h2">
          Ochiq va <em style={{ color: "var(--o)", fontStyle: "normal" }}>adolatli</em> narxlar
        </h2>
        <p className="hp-lead">Bozordagi o'rtacha segment — sifat esa yuqori. Gap ochiq.</p>
      </div>

      <div className="hp-grid-prices">
        {prices.map((p, i) => (
          <PriceCard key={p.name} {...p} delay={(i % 3) + 1} />
        ))}
      </div>
    </section>
  );
}

function PriceCard({ name, val, note, hot, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="reveal"
      data-delay={String(delay)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hot ? "linear-gradient(135deg,rgba(244,107,30,.09),var(--card) 60%)" : "var(--card)",
        border: `1px solid ${hot || hovered ? "var(--border-o)" : "var(--border)"}`,
        borderRadius: "var(--radius)",
        padding: "1.6rem",
        position: "relative",
        transition: "border-color .25s, transform .25s var(--ease), box-shadow .25s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 12px 36px var(--shadow)" : "none",
      }}
    >
      {hot && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "var(--o)",
            color: "#fff",
            fontSize: ".62rem",
            fontWeight: 950,
            letterSpacing: ".07em",
            textTransform: "uppercase",
            padding: ".18rem .6rem",
            borderRadius: 999,
          }}
        >
          ⭐ Top
        </div>
      )}

      <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--o-dim)", display: "grid", placeItems: "center", color: "var(--o)", marginBottom: "1rem", fontSize: "1.1rem", border: "1px solid rgba(244,107,30,.18)" }}>
        💰
      </div>

      <div style={{ fontSize: ".83rem", color: "var(--muted)", fontWeight: 550, marginBottom: ".55rem" }}>{name}</div>

      <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1.75rem", fontWeight: 900, color: val === "TBA" ? "var(--muted)" : "var(--text)", lineHeight: 1 }}>
        {val}{" "}
        {val !== "TBA" && (
          <span style={{ fontSize: ".82rem", fontFamily: "'Cabinet Grotesk',sans-serif", color: "var(--muted)", fontWeight: 450 }}>
            so'm/oy
          </span>
        )}
      </div>

      <div style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: ".4rem", display: "flex", alignItems: "center", gap: ".3rem" }}>
        ⏱ {note}
      </div>
    </div>
  );
}

/* ── ABOUT ── */
function AboutSection() {
  const [ringHovered, setRingHovered] = useState(false);

  return (
    <section id="about" className="hp-section hp-two">
      <div className="reveal">
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--border)",
            aspectRatio: "4/3",
            background: "var(--bg2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: ".9rem",
              background: "linear-gradient(135deg,var(--p-soft) 0%,rgba(244,107,30,.07) 100%)",
            }}
          >
            <div
              onMouseEnter={() => setRingHovered(true)}
              onMouseLeave={() => setRingHovered(false)}
              style={{
                width: ringHovered ? 104 : 90,
                height: ringHovered ? 104 : 90,
                borderRadius: "50%",
                background: "var(--o)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                boxShadow: ringHovered
                  ? "0 0 0 22px var(--o-dim), 0 0 0 46px rgba(244,107,30,.05), 0 0 46px var(--o-glow)"
                  : "0 0 0 18px var(--o-dim), 0 0 0 38px rgba(244,107,30,.05)",
                transition: "all .38s var(--ease)",
                cursor: "pointer",
                fontSize: "2.15rem",
              }}
              title="Boshladik, to'xtamaymiz 😄"
            >
              🏫
            </div>

            <div
              style={{
                fontFamily: "'Clash Display',sans-serif",
                fontWeight: 800,
                fontSize: ".95rem",
                color: "var(--text)",
                transition: "transform .25s",
                transform: ringHovered ? "scale(1.06)" : "scale(1)",
              }}
            >
              A School
            </div>
            <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>Asaka · 2024-yildan</div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "1.1rem",
              left: "1.1rem",
              background: "var(--bg)",
              border: "1px solid var(--border-o)",
              borderRadius: 12,
              padding: ".7rem .95rem",
              display: "flex",
              alignItems: "center",
              gap: ".6rem",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 3px rgba(34,197,94,.2)" }} />
            <div>
              <div style={{ fontSize: ".68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".07em" }}>Holat</div>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 800, fontSize: ".85rem", color: "var(--text)" }}>Yozilish ochiq</div>
            </div>
          </div>
        </div>
      </div>

      <div className="reveal" data-delay="1">
        <div className="hp-tag">Missiyamiz</div>
        <h2 className="hp-h2">
          Zamon bilan <em style={{ color: "var(--o)", fontStyle: "normal" }}>birga</em> ketadigan avlod
        </h2>
        <p className="hp-lead">
          A School — shunchaki kurs emas. Maqsad: o'quvchini natijaga olib chiqish, chet tilida erkin gapirtirish,
          IT va media orqali zamon bilan yuradigan avlodni tayyorlash.
        </p>

        <div
          style={{
            marginTop: "1.8rem",
            padding: "1.25rem 1.45rem",
            borderLeft: "3px solid var(--o)",
            background: "var(--o-dim)",
            borderRadius: "0 var(--radius) var(--radius) 0",
            fontSize: ".95rem",
            lineHeight: 1.75,
            color: "var(--text)",
            fontStyle: "italic",
          }}
        >
          <strong style={{ color: "var(--o)", fontStyle: "normal", fontWeight: 900 }}>
            "Diplom emas, skill kerak"
          </strong>{" "}
          — bu bizning falsafamiz. Har bir dars real hayotga tayyorgarlik, har bir o'quvchi alohida loyiha.
        </div>

        <div style={{ display: "flex", gap: ".7rem", marginTop: "1.8rem", flexWrap: "wrap" }}>
          <a className="hp-btn hp-btn-primary" href="#contact">
            Hozir yozilish
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a className="hp-btn hp-btn-outline" href="#courses">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Kurslar
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", course: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const canSubmit = useMemo(() => {
    const phoneOk = String(form.phone || "").replace(/\s/g, "").length >= 9;
    return Boolean(form.name && phoneOk && form.course);
  }, [form]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      alert("Iltimos, ism, telefon va yo'nalishni to'ldiring.");
      return;
    }
    setStatus("loading");

    try {
      const payload = {
        full_name: form.name.trim(),
        phone: form.phone.trim(),
        course: form.course,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("site_leads").insert([payload]);
      if (error) throw error;

      setStatus("success");
      setForm({ name: "", phone: "", course: "" });
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="hp-section">
      <div className="hp-twoTop">
        <div>
          <div className="reveal hp-tag">Aloqa</div>
          <h2 className="reveal hp-h2" data-delay="1">
            Boshlashga <em style={{ color: "var(--o)", fontStyle: "normal" }}>tayyor?</em>
          </h2>
          <p className="reveal hp-lead" data-delay="2">
            Savol yoki ro'yxatdan o'tish uchun biz bilan bog'laning.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: ".7rem", marginTop: "1.8rem" }}>
            {[
              { icon: "📍", label: "Manzil", val: "Asaka, Umid ko'chasi, 70-uy" },
              { icon: "⏰", label: "Ish vaqti", val: "Du – Sha · 08:00 – 20:00" },
              { icon: "📱", label: "Telegram", val: "@aschool_uz" },
              { icon: "📞", label: "Telefon", val: "+998 77 169 10 01", href: "tel:+998771691001" },
            ].map((item, i) => (
              <div key={item.label} className="reveal" data-delay={String((i % 3) + 1)}>
                <a
                  href={item.href || undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".95rem",
                    padding: ".95rem 1.2rem",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color .2s, transform .2s var(--ease)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-o)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                      borderRadius: 10,
                      background: "var(--o-dim)",
                      border: "1px solid rgba(244,107,30,.18)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: ".7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".07em" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: ".92rem", fontWeight: 750, color: "var(--text)", marginTop: ".12rem" }}>
                      {item.val}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div
          className="reveal"
          data-delay="1"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: "2rem",
          }}
        >
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1.2rem", fontWeight: 850, marginBottom: "1.5rem" }}>
            Ro'yxatdan o'tish
          </div>

          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 850, fontSize: "1.1rem", color: "var(--text)", marginBottom: ".5rem" }}>
                So'rovingiz qabul qilindi!
              </div>
              <div style={{ color: "var(--muted)", fontSize: ".9rem" }}>Tez orada siz bilan bog'lanamiz.</div>
              <button
                onClick={() => setStatus("idle")}
                className="hp-btn hp-btn-primary"
                style={{ marginTop: "1.5rem", border: "none", width: "100%" }}
              >
                Yana yuborish
              </button>
            </div>
          ) : (
            <>
              {[
                { label: "Ism va familiya", key: "name", type: "text", placeholder: "Ism Familiya" },
                { label: "Telefon", key: "phone", type: "tel", placeholder: "+998 90 000 00 00" },
              ].map((f) => (
                <div key={f.key} style={{ marginBottom: ".95rem" }}>
                  <label
                    style={{
                      fontSize: ".72rem",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      display: "block",
                      marginBottom: ".45rem",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: ".68rem 1rem",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      color: "var(--text)",
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontSize: ".95rem",
                      outline: "none",
                      transition: "border-color .2s, box-shadow .2s",
                    }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: ".95rem" }}>
                <label
                  style={{
                    fontSize: ".72rem",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    display: "block",
                    marginBottom: ".45rem",
                  }}
                >
                  Yo'nalish
                </label>
                <select
                  value={form.course}
                  onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: ".68rem 1rem",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    color: form.course ? "var(--text)" : "var(--muted)",
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontSize: ".95rem",
                    outline: "none",
                    appearance: "none",
                  }}
                >
                  <option value="">Tanlang…</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="hp-btn hp-btn-primary"
                style={{
                  width: "100%",
                  border: "none",
                  opacity: status === "loading" ? 0.7 : 1,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? (
                  "⏳ Yuborilmoqda…"
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                    So'rov yuborish
                  </>
                )}
              </button>

              {status === "error" && (
                <div style={{ color: "#ef4444", fontSize: ".85rem", marginTop: ".6rem", textAlign: "center" }}>
                  Xatolik yuz berdi. Qaytadan urinib ko'ring.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg1)",
        borderTop: "1px solid var(--border)",
        padding: "1.4rem clamp(1rem,5vw,3.5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        fontSize: ".82rem",
        color: "var(--muted)",
      }}
    >
      <div>
        <span style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 850, color: "var(--text)" }}>
          A <b style={{ color: "var(--o)" }}>School</b>
        </span>{" "}
        &nbsp;·&nbsp; © 2026 Barcha huquqlar himoyalangan.
      </div>

      <div style={{ display: "flex", gap: "1.3rem", flexWrap: "wrap" }}>
        {[
          ["#courses", "Kurslar"],
          ["#pricing", "Narxlar"],
          ["#about", "Biz haqimizda"],
          ["#contact", "Aloqa"],
        ].map(([href, label]) => (
          <a
            key={label}
            href={href}
            style={{ color: "var(--muted)", textDecoration: "none", transition: "color .2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--o)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {label}
          </a>
        ))}
      </div>

      <div>Asaka · Umid ko'chasi, 70</div>
    </footer>
  );
}