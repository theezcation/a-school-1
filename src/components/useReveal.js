import { useEffect, useRef } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          } else {
            // Remove so it animates again on re-enter
            e.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
}
