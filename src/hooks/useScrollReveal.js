import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const targets = ref.current
      ? ref.current.querySelectorAll('.r')
      : document.querySelectorAll('.r');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
          } else {
            // Remove class when out of view so it animates again on re-entry
            entry.target.classList.remove('on');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

// Component version - attach to a container
export function ScrollReveal({ children, className = '', ...props }) {
  return (
    <div className={`r ${className}`} {...props}>
      {children}
    </div>
  );
}
