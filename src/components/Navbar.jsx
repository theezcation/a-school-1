import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!menuOpen) return;
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  // ✅ sectionga refreshsiz o‘tish: hash bilan
  const goSection = (id) => {
    close();
    navigate(`/#${id}`);
  };

  const callPhone = () => {
    close();
    window.location.href = "tel:+998771691001";
  };

  return (
    <>
      <nav ref={navRef} className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav-left">
          <Link to="/" className="logo" onClick={close}>
            <img className="logo-img" src="https://iopsffjoojvyhxjuzcal.supabase.co/storage/v1/object/sign/Logo/logo_3-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NDI2YTAwNy0yOGE3LTQ4NzktOGExOS0xMWMzMjMxYzMyMDciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMb2dvL2xvZ29fMy1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc3MjcyNjM1OCwiZXhwIjozMTU1MzQxMTkwMzU4fQ.dM5t85byl21_Xs1QK48VG7f-HrZzg_nGrxp543WZWRU" alt="A-School" loading="eager" />
            <span className="logo-name">
              -School
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" aria-label="Primary">
            <li>
              <button className="nav-link-btn" type="button" onClick={() => goSection("why")}>
                <Sparkles size={16} /> Afzalliklar
              </button>
            </li>
            <li>
              <button className="nav-link-btn" type="button" onClick={() => goSection("pricing")}>
                <BadgeDollarSign size={16} /> Narxlar
              </button>
            </li>
            <li>
              <button className="nav-link-btn" type="button" onClick={() => goSection("about")}>
                <BadgeInfo size={16} /> Biz haqimizda
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme" type="button">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="btn btn-primary" onClick={callPhone} type="button">
            <Phone size={16} /> Bog&apos;lanish
          </button>

          <button className="btn btn-primary btn-outline" type="button" onClick={() => goSection("contact")}>
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

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile menu">
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
      )}
    </>
  );
}