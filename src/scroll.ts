/*
  Scroll choreography, carried over from the Marlin motion prototype.

  The prototype is a 20,000ms timeline; every window below is that timeline
  divided by 20,000, so the three sections land at the same relative moments
  — the clock is the scrollbar. The frame sequence it was measured from:

      frame 9001:8610   hold 3000ms  ->  9001:8628   (instant)
      frame 9001:8628   hold 5000ms  ->  9001:8663   SMART_ANIMATE 6000ms
      frame 9001:8663   hold 1500ms  ->  9001:8705   SMART_ANIMATE 4500ms

  One change from Marlin: the hero's word stagger (0/75/150ms, body lines at
  200/275/350ms) runs on a real clock from page load, not on scroll. On the
  scrollbar those windows sit at progress 0, which leaves the first screen
  blank until the visitor moves — fine for a looping prototype, wrong for a
  salon's front door. INTRO holds those windows in milliseconds.

  The three content groups are a vertical filmstrip with parallax:

      frame      Group 1       Group 2        Group 3
      8610       186           -              -
      8628       186           1050           -
      8663       -774          105            740
      8705       -             -1115          144
*/

export const TOTAL_MS = 20000
export const SCROLL_VH = 560

const at = (ms: number) => ms / TOTAL_MS

/** Hero intro, in ms after first paint. Starts after a short beat so the fonts land first. */
const D = 250
export const INTRO = {
  word: [D + 0, D + 300],
  word2: [D + 75, D + 375],
  word3: [D + 150, D + 450],
  body1: [D + 200, D + 500],
  body2: [D + 275, D + 575],
  body3: [D + 350, D + 650],
  /* the open-today card: t=200ms, SMART_ANIMATE 2084ms SLOW */
  stat: [D + 200, D + 2284],
} as const
export const INTRO_END = D + 2284

/** Phase windows as scroll progress. */
export const P = {
  /* Group 2's cards arrive */
  g2In: [at(3000), at(3600)],
  /* the 6000ms transition */
  move1: [at(8000), at(14000)],
  /* the 4500ms transition, compressed to land at 0.90 so the last section
     holds for a beat before the page carries on */
  move2: [at(15500), 0.9],
} as const

/** Where each group sits, per the four frames. */
export const G = {
  g1: { start: 186, end: -774 },
  g2: { enter: 1050, mid: 105, end: -1115 },
  g3: { enter: 1400, mid: 740, end: 144 },
} as const

/*
  The photo wall replaces Marlin's footage. Each column drifts at its own
  rate, alternate columns in opposite directions, so the wall weaves rather
  than scrolls as one sheet. Travel is in vw because the tiles are sized in vw.
*/
export const WALL_TRAVEL_VW = 120
export const WALL_RATES = [1, 0.72, 1.16, 0.84, 1.04]

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
