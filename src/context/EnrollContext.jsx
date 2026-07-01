import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const EnrollContext = createContext(null)

export function EnrollProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [course, setCourse] = useState('')

  const openEnroll = useCallback((preselectCourse = '') => {
    setCourse(preselectCourse)
    setOpen(true)
  }, [])

  const closeEnroll = useCallback(() => setOpen(false), [])

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.classList.toggle('modal-lock', open)
    return () => document.body.classList.remove('modal-lock')
  }, [open])

  return (
    <EnrollContext.Provider value={{ open, course, openEnroll, closeEnroll }}>
      {children}
    </EnrollContext.Provider>
  )
}

export const useEnroll = () => useContext(EnrollContext)
