import { useEffect, useState } from 'react'
import { HOURS, type Hours } from './content'

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** Milliseconds since mount, ticking on rAF until `until`, then frozen there. */
export function useClock(until: number) {
  const [ms, setMs] = useState(0)
  useEffect(() => {
    const t0 = performance.now()
    let raf = 0
    const tick = () => {
      const now = performance.now() - t0
      setMs(Math.min(now, until))
      if (now < until) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [until])
  return ms
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Day of week and minute of day in South Africa, whatever the visitor's clock says. */
function salonNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Johannesburg',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minute: Number(get('hour')) * 60 + Number(get('minute')) }
}

export type OpenState = {
  day: number
  today: Hours
  open: boolean
  /** 0-1 through today's trading hours; 0 before opening, 1 after closing. */
  progress: number
  /** One short line: "Closes 18:00", "Opens 08:00", "Opens Mon 08:00". */
  line: string
}

const SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function compute(): OpenState {
  const { day, minute } = salonNow()
  const today = HOURS[day]
  if (today) {
    const o = toMin(today.open)
    const c = toMin(today.close)
    if (minute >= o && minute < c) {
      return { day, today, open: true, progress: (minute - o) / (c - o), line: `Closes ${today.close}` }
    }
    if (minute < o) return { day, today, open: false, progress: 0, line: `Opens ${today.open}` }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const h = HOURS[d]
    if (h) {
      return {
        day,
        today,
        open: false,
        progress: today ? 1 : 0,
        line: i === 1 ? `Opens tomorrow ${h.open}` : `Opens ${SHORT[d]} ${h.open}`,
      }
    }
  }
  return { day, today, open: false, progress: 0, line: 'Closed' }
}

export function useOpenState() {
  const [s, setS] = useState(compute)
  useEffect(() => {
    const id = setInterval(() => setS(compute()), 30_000)
    return () => clearInterval(id)
  }, [])
  return s
}
