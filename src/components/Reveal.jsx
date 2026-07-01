import { useEffect, useRef, useState } from 'react'

/**
 * Wraps children and reveals them on scroll.
 * variant: 'up' (default) | 'zoom' | 'stagger'
 */
export default function Reveal({ children, variant = 'up', className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            if (variant === 'stagger') {
              Array.from(el.children).forEach((c, i) => {
                c.style.transitionDelay = `${i * 0.08}s`
              })
            }
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [variant])

  const base = variant === 'zoom' ? 'reveal-zoom' : variant === 'stagger' ? '' : 'reveal'
  const staggerAttr = variant === 'stagger' ? { 'data-stagger': true } : {}

  return (
    <Tag
      ref={ref}
      className={`${base} ${shown ? 'in' : ''} ${className}`}
      {...staggerAttr}
      {...rest}
    >
      {children}
    </Tag>
  )
}
