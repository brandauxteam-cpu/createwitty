// Central place for site-wide constants used across pages.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.createwitty.com').replace(/\/$/, '')
export const FORM_EMAIL = import.meta.env.VITE_FORM_EMAIL || 'pranith.gorityala49@gmail.com'
export const FORM_ACTION = `https://formsubmit.co/${FORM_EMAIL}`

// Placeholder contact details — replace with your real numbers before launch.
export const PHONE = '+91-00000-00000'
export const WHATSAPP = '910000000000' // country code + number, no + or spaces
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP}?text=Hi%20CreateWitty%2C%20I'd%20like%20to%20know%20about%20your%20courses`
