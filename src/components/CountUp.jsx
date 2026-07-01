import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to, suffix = '', className = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          let cur = 0
          const inc = to / 45
          const tick = () => {
            cur += inc
            if (cur >= to) setVal(to)
            else { setVal(Math.floor(cur)); requestAnimationFrame(tick) }
          }
          tick()
          io.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to])

  return (
    <span ref={ref} className={`num-pulse ${className}`}>
      {val.toLocaleString('en-IN')}{suffix}
    </span>
  )
}
