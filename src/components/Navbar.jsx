import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Moon,
  Sun,
  Phone,
  GraduationCap,
  Menu,
  X,
  BadgeInfo,
  BadgeDollarSign,
  Sparkles,
} from "lucide-react";
import "./Navbar.css";

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // navbar shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ✅ scroll lock (mobile menu ochilganda body scroll bo‘lmasin)
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const getNavH = () => {
    const cssVal = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
    );
    return Number.isFinite(cssVal)
      ? cssVal
      : navRef.current?.offsetHeight ?? 72;
  };

  const smoothScrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;

    const navH = getNavH();
    const y = el.getBoundingClientRect().top + window.scrollY - navH - 10;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    return true;
  };

  // ✅ sectionga o‘tish (mobile ham desktop ham bir xil ishlaydi)
  const goSection = useCallback(
    (id) => {
      // Home’da bo‘lmasak: targetni saqlaymiz, Home’ga o‘tamiz
      if (location.pathname !== "/") {
        sessionStorage.setItem("scrollTarget", id);
        closeMenu();
        navigate("/");
        return;
      }

      // Home’da bo‘lsak: scroll qilamiz
      const ok = smoothScrollToId(id);

      // element hali render bo‘lmagan bo‘lishi mumkin: HomePage effectga topshiramiz
      if (!ok) sessionStorage.setItem("scrollTarget", id);

      // ✅ MUHIM: menyuni scroll boshlanganidan keyin yopamiz
      requestAnimationFrame(() => closeMenu());
    },
    [location.pathname, navigate, closeMenu]
  );

  const callPhone = () => {
    closeMenu();
    window.location.href = "tel:+998771691001";
  };

  // ✅ overlay bosilsa menu yopilsin (tashqariga bosish muammosi shu bilan hal bo‘ladi)
  const onOverlayClick = (e) => {
    // overlayning o‘ziga bosilganda yopamiz (menu ichiga bosilganda emas)
    if (e.target === e.currentTarget) closeMenu();
  };

  return (
    <>
      <nav ref={navRef} className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav-left">
          <Link
            to="/"
            className="logo"
            onClick={() => {
              closeMenu();
              // optional: home bosilganda targetni tozalash
              sessionStorage.removeItem("scrollTarget");
            }}
          >
            <span className="logo-badge" aria-hidden="true">
              <img
                className="logo-img"
                src="https://lh3.google.com/u/0/d/12LlHzmVxnghb4Lbu6Vc_Yme6ytOLrnHP=w1920-h952-iv1?auditContext=prefetch"
                alt=""
                loading="eager"
              />
            </span>
            <span className="logo-name">-School</span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" aria-label="Primary">
            <li>
              <button
                className="nav-link-btn"
                type="button"
                onClick={() => goSection("why")}
              >
                <Sparkles size={16} /> Afzalliklar
              </button>
            </li>
            <li>
              <button
                className="nav-link-btn"
                type="button"
                onClick={() => goSection("pricing")}
              >
                <BadgeDollarSign size={16} /> Narxlar
              </button>
            </li>
            <li>
              <button
                className="nav-link-btn"
                type="button"
                onClick={() => goSection("about")}
              >
                <BadgeInfo size={16} /> Biz haqimizda
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            type="button"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="btn btn-primary" onClick={callPhone} type="button">
            <Phone size={16} /> Bog&apos;lanish
          </button>

          <button
            className="btn btn-primary btn-outline"
            type="button"
            onClick={() => goSection("contact")}
          >
            <GraduationCap size={16} /> Ro&apos;yxatdan o&apos;tish
          </button>

          <button
            className="hamburger"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ✅ MOBILE MENU OVERLAY + PANEL */}
      {menuOpen && (
        <div className="mobile-overlay" role="presentation" onClick={onOverlayClick}>
          <div
            ref={menuRef}
            className="mobile-menu"
            role="dialog"
            aria-label="Mobile menu"
          >
            <button className="mob-link" type="button" onClick={() => goSection("why")}>
              <Sparkles size={18} /> Afzalliklar
            </button>
            <button className="mob-link" type="button" onClick={() => goSection("pricing")}>
              <BadgeDollarSign size={18} /> Narxlar
            </button>
            <button className="mob-link" type="button" onClick={() => goSection("about")}>
              <BadgeInfo size={18} /> Biz haqimizda
            </button>

            <div className="mobile-sep" />

            <button className="mob-link mob-primary" type="button" onClick={callPhone}>
              <Phone size={18} /> Bog&apos;lanish
            </button>
            <button className="mob-link mob-primary" type="button" onClick={() => goSection("contact")}>
              <GraduationCap size={18} /> Ro&apos;yxatdan o&apos;tish
            </button>
          </div>
        </div>
      )}
    </>
  );
}