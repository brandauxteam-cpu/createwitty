// Central place for site-wide constants used across pages.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://createwitty.in').replace(/\/$/, '')

// Contact details
export const PHONE = '+91 99993 83967'          // shown on the site
export const PHONE_TEL = '+919999383967'        // used in tel: links
export const FORM_EMAIL = import.meta.env.VITE_FORM_EMAIL || 'brandauxteam@gmail.com'  // form submissions (TO)
export const DISPLAY_EMAIL = 'hello@createwitty.in'  // shown on site as contact only
export const FORM_ACTION = `https://formsubmit.co/${FORM_EMAIL}`
export const FORM_CC = import.meta.env.VITE_FORM_CC || 'createwitty1@gmail.com'

// WhatsApp (country code + number, no + or spaces)
export const WHATSAPP = '919999383967'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP}?text=Hi%20CreateWitty%2C%20I'd%20like%20to%20know%20about%20your%20courses`

// Address & hours
export const ADDRESS = 'Office No. 5, Jayabheri Silicon Towers, Kothaguda, Hyderabad, Telangana 500084'
export const HOURS = 'Mon–Sat, 10:00 AM – 6:00 PM'
export const MAPS_QUERY = encodeURIComponent('Jayabheri Silicon Towers, Kothaguda, Hyderabad, Telangana 500084')
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`

// Brand assets & partner
export const LOGO = '/logo.png'
export const BRANDAUX_URL = 'https://brandaux.in/'
export const BRANDAUX_LOGO = 'https://brandaux.in/wp-content/uploads/2024/06/v3-2.png'

// Where FormSubmit redirects after a submission (uses the current live domain).
export const THANKYOU_URL = typeof window !== 'undefined'
  ? `${window.location.origin}/thank-you`
  : `${SITE_URL}/thank-you`
