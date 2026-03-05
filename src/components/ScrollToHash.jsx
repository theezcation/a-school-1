import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    if (!hash) return;

    const id = hash.slice(1);

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (!el) return false;

      // navbar fixed bo'lgani uchun biroz offset
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
      const y = el.getBoundingClientRect().top + window.scrollY - (navH + 10);

      window.scrollTo({ top: y, behavior: "smooth" });
      return true;
    };

    if (tryScroll()) return;

    let raf = 0;
    let tries = 0;
    const loop = () => {
      tries += 1;
      if (tryScroll() || tries > 30) return;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hash, pathname]);

  return null;
}