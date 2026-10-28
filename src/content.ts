/*
  Everything a salon owner might need to change lives in this file:
  contact details, trading hours, services and prices, and which photos go
  where. The components only read from here.

  Values marked TODO are placeholders waiting for the real details.
*/

export const BUSINESS = {
  name: 'Tanganyika Hair Salon',
  short: 'Tanganyika',
  area: 'Alberton, Gauteng',
  /* TODO: the street address, e.g. 'Shop 12, Alberton City, Voortrekker Rd' */
  street: 'Street address to be confirmed',
  /* What Google Maps searches for, for the embedded map and directions link.
     Once the street is known, put the full address here. */
  mapQuery: 'Tanganyika Hair Salon, Alberton, Gauteng',
  /* TODO: real numbers. WhatsApp is digits only, with the 27 country code
     and no leading 0 (082 123 4567 -> 27821234567). */
  phoneDisplay: '000 000 0000',
  phoneTel: '+27000000000',
  whatsapp: '27000000000',
  whatsappMessage: "Hi Tanganyika, I'd like to book a cut.",
  facebook: 'https://web.facebook.com/Tanganyikahairsalon/',
}

export const whatsappHref = () =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`

export const directionsHref = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapQuery)}`

/*
  Trading hours, Sunday first (matching Date.getDay()). 24h "HH:MM" strings,
  or null for closed. Times are read in Africa/Johannesburg whatever the
  visitor's own timezone is.
  TODO: these are placeholders.
*/
export type Hours = { open: string; close: string } | null
export const HOURS: Hours[] = [
  { open: '09:00', close: '14:00' }, // Sun
  { open: '08:00', close: '18:00' }, // Mon
  { open: '08:00', close: '18:00' }, // Tue
  { open: '08:00', close: '18:00' }, // Wed
  { open: '08:00', close: '18:00' }, // Thu
  { open: '08:00', close: '19:00' }, // Fri
  { open: '07:30', close: '18:00' }, // Sat
]
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/*
  Services. `price` is a rand amount, or null to show "Ask for price".
  `from: true` prints it as "from R___".
  TODO: prices, and confirm the ladies' services.
*/
export type Service = { name: string; note: string; price: number | null; from?: boolean }
export const SERVICES: { group: string; photo: string; items: Service[] }[] = [
  {
    group: 'Cuts & fades',
    photo: '31',
    items: [
      { name: 'Skin fade', note: 'Blended down to the skin, finished with a razor line-up', price: null },
      { name: 'Low or taper fade', note: 'A softer fade that keeps length at the sides', price: null },
      { name: 'Classic cut', note: 'One length, brush cut or a simple clean-up', price: null },
      { name: "Kids' cut", note: 'Under 12s. Patient barbers, no tears', price: null },
      { name: 'Hair design', note: 'Parts, lines and freehand patterns, added to any cut', price: null, from: true },
    ],
  },
  {
    group: 'Beard',
    photo: '39',
    items: [
      { name: 'Beard shape & line-up', note: 'Shaped, edged and lined to suit your face', price: null },
      { name: 'Cut + beard', note: 'Any fade or cut with a full beard shape', price: null },
    ],
  },
  {
    group: 'Braids, twists & ladies',
    photo: '16',
    items: [
      { name: 'Cornrows & braids', note: 'Straight-back, freestyle and patterned', price: null, from: true },
      { name: 'Twists & sponge curls', note: 'Defined texture on top, with or without a fade', price: null },
      { name: "Ladies' cuts & styling", note: 'Cuts, wash and style, braids. Ask about your look', price: null, from: true },
    ],
  },
]

/* The four category cards in the scroll scene, each linked to a photo. */
export const CARDS = [
  { photo: '10', label: ['Skin', 'Fades'] },
  { photo: '39', label: ['Beard', 'Line-ups'] },
  { photo: '16', label: ['Braids &', 'Twists'] },
  { photo: '21', label: ["Kids'", 'Cuts'] },
]

/*
  Photo tags, used for alt text. Numbers are the order of files in /media,
  as written by `npm run media`.
*/
const TAGS: Record<string, string> = {
  '00': 'Patterned cornrows with a skin fade and razor line-up',
  '01': 'Barber shaping a young client’s line-up',
  '02': 'Barber finishing a taper fade',
  '03': 'Short cut with freehand lines shaved into the side',
  '12': 'Barber lining up a beard and hairline with a trimmer',
  '14': 'Barber at work on a fade',
  '16': 'Box braids with a clean side fade',
  '18': 'Braids on top with a skin fade',
  '19': 'Fade with a shaved part and full beard',
  '28': 'Fade with a hand-cut design in the side',
}
const BEARD = new Set(['04', '07', '11', '20', '25', '26', '27', '38', '39', '42', '43', '53'])
const KIDS = new Set(['06', '13', '17', '21', '22', '24', '34', '48'])
const TWISTS = new Set(['09', '24', '34', '36', '49', '50', '53', '54', '56', '57', '59'])

export function altFor(id: string) {
  if (TAGS[id]) return TAGS[id]
  if (TWISTS.has(id)) return KIDS.has(id) ? 'Young client with sponge-curl twists and a taper fade' : 'Sponge-curl twists on top with a taper fade'
  if (KIDS.has(id)) return "Kids' fade with a sharp line-up"
  if (BEARD.has(id)) return 'Fade with a shaped and lined beard'
  return 'Fade haircut with a crisp line-up'
}

/* Gallery order: the strongest work first, then everything else. */
const LEAD = ['26', '16', '39', '03', '59', '00', '04', '28', '54', '12', '20', '49', '18', '43', '24', '10']
const ALL = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
export const GALLERY = [...LEAD, ...ALL.filter((id) => !LEAD.includes(id))]

/* The photo wall behind the scroll scene: every photo, dealt into columns. */
export const WALL_COLS = 5
export const WALL = Array.from({ length: WALL_COLS }, (_, c) => ALL.filter((_, i) => i % WALL_COLS === c))

export const img = (id: string, size: 'sm' | 'lg' = 'sm') => `/media/cut-${id}-${size}.webp`

/* The site's pages. Each is its own HTML file (see vite.config.ts), so they
   work on any static host with no rewrite rules. */
export type PageKey = 'home' | 'services' | 'gallery' | 'visit'
export const PAGES: { key: Exclude<PageKey, 'home'>; name: string; href: string; blurb: string; photo: string }[] = [
  { key: 'services', name: 'Services & prices', href: '/services/', blurb: 'Fades, beards, braids, twists and kids’ cuts', photo: '31' },
  { key: 'gallery', name: 'Gallery', href: '/gallery/', blurb: 'Sixty fresh cuts, straight off the chair', photo: '26' },
  { key: 'visit', name: 'Visit us', href: '/visit/', blurb: 'Hours, directions and how to book', photo: '20' },
]
