# HackZ '24 — Master Rebuild Prompt for Antigravity (v3)
> Cybersecurity-themed landing page. Rich visuals. Dark, atmospheric, hacker aesthetic.

---

## THE VISION

A visually immersive, modern hackathon landing page with a cybersecurity aesthetic. Think: the aesthetic of a hacker movie, a CTF platform, a dark-mode security dashboard — **NOT a text terminal listing page**.

The cybersecurity influence means:
- Matrix-style falling green character rain as the hero backdrop
- Dark green (`#00ff41`) as the signature accent on near-black backgrounds
- Glitch effects on the hero wordmark
- Noise grain + scanlines for analog texture depth
- Hex/binary strings floating as atmospheric background decoration — used sparingly
- Every section has a clear visual identity. No section is just text on a dark background.

The page must feel polished and intentional — every design choice serves the atmosphere without cluttering content.

---

## CONTENT (Do not alter any event data)

### Event
- **Name:** HackZ '24
- **Organizer:** CSEA-CEG (Computer Science and Engineering Association, College of Engineering, Guindy)
- **Taglines:** "Zap. Zen. Zest. HackZ" / "24-Hour National Tech Marathon: Innovate, Create, Dominate!"
- **Dates:** November 23–24, 2024
- **Venue:** CEG Campus, Anna University, Chennai
- **Maps:** https://maps.app.goo.gl/JL1mG5KUfTrLS6Pg6
- **Registration:** https://unstop.com/p/hackz24-computer-science-and-engineering-association-csea-ceg-anna-university-1171819
- **Exclusive Sponsor:** Temenos — https://www.temenos.com/
- **Powered By:** Unstop — https://unstop.com/

### About
HackZ'24 is a dynamic 24-hour hackathon initiated by CSEA that brings together the brightest minds to solve real-world challenges through technology and innovation. Open to engineering students, it encourages collaboration and out-of-the-box thinking, fostering an environment of learning and innovation. Participants work in teams to solve industry-relevant problems, with the chance to create impactful solutions that can be scaled and implemented in the real world.

### Tracks
1. Blockchain
2. FinTech
3. MedX
4. Sustainability & Climate Change
5. Women Safety
6. **[SPECIAL]** Women Empowerment

### Prizes
- Total Prize Pool: ₹1,70,000
- 1st: ₹75,000 | 2nd: ₹50,000 | 3rd: ₹25,000
- Special: Women Empowerment — Leading Women's Team
- Special Track Prize + Track Prize (amounts TBA)

### Timeline
- 30 Sep 2024 — Registrations Open, Round 1 Begins
- 31 Oct 2024 — Round 1 Closes
- 10 Nov 2024 — Finalists Announced
- 16 Nov 2024 — Round 2 Problem Statements Released
- 23 Nov 2024 — 24-Hour Hackathon Begins (Round 2)
- 24 Nov 2024 — Hackathon Ends, Winners Announced

### FAQs
- Eligibility: All current college students in India. Cross-institution teams allowed.
- Solo: No. Min 2 members, max 4.
- Format: Hybrid. Round 1 online, Round 2 in-person CEG Campus.
- Registration: Via Unstop.
- Fee: Round 1 free. Round 2: ₹500/participant.
- Networking: Yes — mentors, sponsors, industry experts throughout.

### Get Involved
- Mentors: https://forms.gle/QaDpNALP7UzXy12L8
- Volunteers: https://forms.gle/t7aqN92m7XERujow9

### Contact
- Sunil Kumar — +91 63831 23505
- Smrithi Prakash — +91 80728 69255
- Sharan — +91 95856 12262
- Varsha — +91 63829 52323
- hackz.csea@gmail.com | cseaceg25@gmail.com

### Socials
- https://cseaceg.org.in/
- https://www.instagram.com/csea_ceg
- https://www.linkedin.com/company/csea-ceg

---

## DESIGN SYSTEM

### Color Palette
```
Page Background:     #050505
Section Alt BG:      #0a0a0a
Card / Panel BG:     #0d0d0d
Border / Divider:    #1a1a1a
Primary Text:        #e8e8e8
Secondary Text:      #555555
Accent Green:        #00ff41   ← matrix green, primary accent
Accent Green Dim:    #00b32c   ← secondary green, dimmer uses
Accent Amber:        #f5a623   ← special prizes, warnings
Accent Red:          #ff3b3b   ← countdown urgency
Deep Green BG Tint:  #00100a   ← subtle section tinting
```

### Typography
```
Display (hero):  "JetBrains Mono" Bold — HackZ wordmark, large numerals
Section Labels:  "JetBrains Mono" — counters, tags, data labels
Headings:        "Outfit" Bold — section titles, card titles
Body:            "Inter" — readable prose
```
Import all from Google Fonts.

### Non-negotiable Design Rules
- ❌ No glassmorphism. No `backdrop-filter: blur()` anywhere.
- ❌ No glowing borders. No colored `box-shadow` halos.
- ❌ No gradient mesh / aurora blobs / soft light effects.
- ❌ No literal terminal/CLI document aesthetic — this is a landing page, not a console.
- ❌ No light backgrounds. Every surface stays dark.
- ❌ Do not stack multiple atmospheric effects on the same section. One effect per section maximum.

---

## GLOBAL ATMOSPHERIC ELEMENTS

These run across the page. Use them with restraint — they are seasoning, not the meal.

### 1. Noise Grain Overlay
- A `position: fixed`, full-screen `<div>`, `pointer-events: none`, `z-index: 9999`
- SVG `feTurbulence` noise as background-image, `opacity: 0.035`
- Applies a subtle analog film grain to the entire page. Never noticeable on its own — only felt.

### 2. Scroll Progress Bar
- A `2px` tall bar at the very top of the viewport (above the navbar), color `#00ff41`
- Fills left-to-right based on page scroll progress
- Implemented via Motion `useScroll` + `useTransform` → `scaleX: 0→1` on a `transform-origin: left` element
- Always visible. Thin enough to be unobtrusive.

### 3. Section Dividers
- Between major sections: `1px solid #141414` full-width line
- Optionally a small monospace green label floated left: `// [02] ──────`
- No decorative excess. Just structure.

---

## SECTION-BY-SECTION DESIGN

---

### [00] NAVBAR
**Design: Minimal fixed bar. Green progress line at top.**

- `position: fixed`, `top: 0`, full width, `z-index: 100`
- Background: `#050505` solid. `1px solid #1a1a1a` bottom border. No blur, no shadow.
- Left: "HackZ" wordmark in JetBrains Mono Bold, `#00ff41`
- Right: Nav links in Inter, normal weight, `#e8e8e8`. On hover: color transitions to `#00ff41` in 0.15s. Active section link gets a `●` dot prefix in green.
- Scroll progress bar sits above the navbar (not inside it) — `position: fixed`, `top: 0`, full width, `height: 2px`

**Mobile:**
- Hide nav links. Show a hamburger icon (24px, `#e8e8e8`).
- Tap → full-screen `#050505` overlay fades in. Links stacked vertically, min 48px tap height, green on hover. Close `✕` top-right.
- Animated open/close with Motion `animate`.

---

### [01] HERO
**Design: Full-screen cinematic impact. Matrix rain. Glitch wordmark. One dominant CTA.**

**Background:**
- Full-viewport `<canvas>` at `z-index: -1`
- Falling character columns: mix of binary (`0`, `1`), hex digits (`A–F`, `0–9`), and a few katakana characters
- Lead character of each column: `#00ff41` at opacity `0.9`. Trailing characters fade to `0.05`.
- Column speeds vary randomly. Characters randomize as they fall.
- Bottom fade: CSS `mask-image: linear-gradient(to bottom, black 60%, transparent 100%)`
- On scroll: canvas `opacity` transitions `1 → 0` as hero exits viewport (Motion `useScroll` + `useTransform`)
- Scanline overlay on top of canvas: CSS `repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)`, `position: absolute`, `pointer-events: none`

**Content (center-aligned):**
1. Small label above wordmark in JetBrains Mono, `#00ff41`, small: `// CSEA-CEG PRESENTS` with a `<BlinkingCursor />` appended
2. **"HackZ"** — massive wordmark, `clamp(80px, 12vw, 160px)`, JetBrains Mono Bold, white
   - On page load: GSAP glitch entrance — two pseudo-element layers offset `±5px` in X with `clip-path` cuts, briefly showing in red and cyan, snapping clean after 800ms
   - On hover: lighter glitch re-triggers (300ms)
3. Tagline: `"24-Hour National Tech Marathon"` in Outfit, `clamp(14px, 2.5vw, 22px)`, `#e8e8e8` at 65% opacity
4. Event badge — sharp rectangle (no border-radius), `border: 1px solid #1a1a1a`, `background: #0d0d0d`, padding `8px 16px`:
   `NOV 23–24, 2024  ·  CEG CAMPUS, ANNA UNIVERSITY` in JetBrains Mono, small
5. CTA: **`[ REGISTER NOW ]`** — sharp corners, `background: #00ff41`, `color: #050505`, JetBrains Mono Bold
   - Hover: `background: transparent`, `color: #00ff41`, `border: 1px solid #00ff41`
   - Motion `whileTap: { scale: 0.96 }`
   - Transition: 0.15s

**Bottom scroll indicator:**
- A thin vertical line `│` with a downward chevron below it, `#00ff41`, fades in after 1.5s, pulses slowly with Motion `animate opacity: [0.4, 1, 0.4]` on loop

**Mobile:**
- Wordmark: `clamp(52px, 16vw, 80px)`
- Tagline: `clamp(13px, 4vw, 18px)`
- CTA button: full-width
- Canvas: halve the column count based on `window.innerWidth`. Frame-skip if needed for perf.

---

### [02] STATS STRIP
**Design: Infinite scrolling marquee. System status feel. No design overhead.**

- Full-width bar, `background: #00100a`, `border-top` and `border-bottom: 1px solid #0d2010`
- GSAP infinite horizontal marquee — content duplicated so it loops seamlessly
- Content (JetBrains Mono, uppercase, `#00ff41`, `~13px`):
  `◆ PRIZE POOL: ₹1,70,000  ◆ TEAM SIZE: 2–4 MEMBERS  ◆ DURATION: 24 HOURS  ◆ VENUE: CEG CAMPUS, CHENNAI  ◆ ROUND 1: FREE ENTRY  ◆ STATUS: REGISTRATIONS OPEN`
- `◆` separators in `#00b32c` (dimmer green)
- Marquee speed nudges faster when Lenis scroll velocity is high: `speed += Math.abs(lenis.velocity) * 0.04` each RAF frame

**Mobile:** Font-size 11px. Same behavior.

---

### [03] ABOUT
**Design: Two-column split. Bold stat boxes. Clean text reveal. One floating decoration.**

**Layout:**
- Left column (desktop only): A large circuit-board style SVG illustration — abstract interconnected nodes and traces, all in `#00ff41` at 8–10% opacity. Purely decorative. No animation needed beyond a slow fade-in on scroll.
- Right column: section counter `// 01` in JetBrains Mono green (small), section title "WHAT IS HACKZ'24?" in Outfit Bold large, then body text in Inter.

**Text reveal animation:**
- Each sentence/paragraph line: Motion `inView`, `opacity: 0→1`, `y: 14→0`, staggered 60ms per line, `once: true`
- A `1px solid #1a1a1a` left-border accent line beside the body text block

**Stat boxes (below the text columns):**
- Three sharp rectangles side by side: `24 HRS` / `2–4 MEMBERS` / `₹1,70,000`
- `background: #0d0d0d`, `border: 1px solid #1a1a1a`, `border-radius: 0`
- Large number/value in JetBrains Mono Bold, `#00ff41`
- Label below in Inter, `#555555`, small, uppercase
- Numbers count up from 0 on scroll entry (GSAP countup, `ScrollTrigger` `onEnter`)
- Motion `inView` stagger: `opacity: 0→1`, `y: 20→0`, 100ms apart

**Mobile:**
- Single column. Hide the left SVG illustration.
- Stat boxes: row on sm+, stack vertically on xs.

---

### [04] TRACKS
**Design: Bold grid cards. Each card has a circuit-style icon. Bottom accent bar animates in.**

**Section header:** `// 02` label + "MISSION TRACKS" in Outfit Bold, large

**Grid:** 3 col desktop → 2 col tablet → 1 col mobile

**Each card:**
- `background: #0d0d0d`, `border: 1px solid #1a1a1a`, `border-radius: 0`
- Top area: minimalist SVG icon relevant to the track — sharp geometric / circuit-board style (not emoji, not clipart). Dark green lines on black background area.
- Track number `[01]` top-right corner, JetBrains Mono, `#555555`
- Track name: Outfit Bold, `#e8e8e8`, large
- One-line description: Inter, `#555555`
- Bottom: a `2px` solid bar, color `#00ff41`, animates `width: 0% → 100%` when card enters viewport (Motion `inView` animate, duration 0.6s, ease `easeOut`)
- Hover: `background` shifts to `#111111`. Motion `whileHover: { y: -4 }`. No glow.
- Women Empowerment special card: amber `#f5a623` bottom bar and track number, `[SPECIAL]` label

**Scroll animation:**
- Container: Motion `inView`, `staggerChildren: 0.08`
- Each card: `opacity: 0→1`, `y: 30→0`, duration 0.45s

**Mobile:** Full-width single column cards, height auto.

---

### [05] SPONSORS
**Design: Clean and understated. Boot-log inspired layout. Desaturated-to-color reveal.**

**Section header:** `// 03` + "BACKED BY" in Outfit Bold

- No card boxes. Logos sit directly on `#050505`.
- "Exclusive Sponsor" tier label in JetBrains Mono, `#555555`, small, uppercase — above the Temenos logo
- "Powered By" tier label — same treatment — above Unstop logo
- Logos: desaturated by default `filter: grayscale(1) brightness(0.7)`. On scroll entry: Motion `inView` animates to `grayscale(0) brightness(1)`. Duration 0.8s.
- Thin `1px solid #1a1a1a` divider between tiers
- A small `[ OK ]` badge in `#00ff41` beside each sponsor name (purely decorative, hacker flavor — like a system check passed)

**Mobile:** Logos stacked vertically, centered, max-width 240px each.

---

### [06] PRIZES
**Design: High drama. Giant countup number. Podium blocks. Amber special prize.**

**Section background:** `#00100a` deep green tint — this is the only section with a different background tint

**Section header:** `// 04` + "WHAT'S AT STAKE" in Outfit Bold

**Total prize pool:**
- `₹1,70,000` in JetBrains Mono Bold, `clamp(60px, 10vw, 120px)`, `#00ff41`
- On scroll entry: number counts up from `0` to `1,70,000` over 1.8s using GSAP, triggered by `ScrollTrigger` `onEnter`
- Subtext below: `TOTAL PRIZE POOL` in JetBrains Mono, `#555555`, small

**Podium blocks (3 columns desktop, stacked mobile):**
- Each is a sharp rectangle, `border-radius: 0`, `background: #0d0d0d`
- Left border accent: `3px solid` — green for 1st, `#888` for 2nd, `#444` for 3rd
- Rank label top: `RANK_01` / `RANK_02` / `RANK_03` in JetBrains Mono, small, matching border color
- Prize amount: JetBrains Mono Bold, large — `₹75,000` / `₹50,000` / `₹25,000`
- 1st place block is visually tallest (more top padding or larger font)
- Motion `inView` stagger: `y: 50→0`, `opacity: 0→1`, 120ms apart

**Special prize row below podium:**
- Amber `#f5a623` accent. Label `[SPECIAL]` in JetBrains Mono. Description in Inter.
- Simple horizontal row, no card box. Just a left `3px solid #f5a623` accent bar beside the text.

**Mobile:** Podium blocks stack vertically 1st → 2nd → 3rd, full width.

---

### [07] TIMELINE
**Design: Vertical process log. SVG line draws on scroll. Nodes trigger as line reaches them.**

**Section header:** `// 05` + "SEQUENCE OF EVENTS" in Outfit Bold

**Structure:**
- A vertical SVG `<line>` runs through the timeline. On desktop it's centered with events alternating left/right. On mobile it's on the far left, all content to its right.
- The line is drawn using `stroke-dashoffset` animated by GSAP `ScrollTrigger` with `scrub: 1` — it draws downward as the user scrolls through the section.
- Line color: `#1a1a1a` as the base, with a `#00ff41` overlay line that draws over it (same scrub animation) — creates the effect of the green line "filling in" as you scroll.

**Each event node:**
- A `◆` diamond shape on the line, `16px`
- Completed events: `#00ff41` filled diamond
- Upcoming events: `#1a1a1a` diamond with `#333` border
- Active event (Nov 23): amber `#f5a623` diamond with `► LIVE` label and `<BlinkingCursor />` beside it

**Event content beside each node:**
- Date in JetBrains Mono, `#00ff41`, small: `2024-09-30`
- Event title in Outfit Bold, `#e8e8e8`
- Short description in Inter, `#555555`

**Node entrance animation:**
- Each node + content: GSAP `ScrollTrigger` per node, triggers when scroll reaches it
- `scale: 0.7→1`, `opacity: 0→1`, duration 0.35s

**Mobile:**
- Single column. Line on far left. All nodes and content to the right.
- Date labels abbreviated: `SEP 30`

---

### [08] GET INVOLVED
**Design: Two bold action blocks. Direct and clean. Text scramble on hover.**

**Section header:** `// 06` + "GET INVOLVED" in Outfit Bold

**Two blocks side by side (stacked on mobile):**
- Each block: `background: #0d0d0d`, `border: 1px solid #1a1a1a`, `border-radius: 0`, generous padding
- Large ghost text behind content — the role name (`MENTOR` / `VOLUNTEER`) in JetBrains Mono, `#00ff41` at 0.03 opacity, `font-size: clamp(60px, 10vw, 120px)`. Purely atmospheric, not readable.
- Role title in Outfit Bold, `#e8e8e8`, large — on hover, apply a **text scramble effect**: title briefly randomizes characters then resolves back to the real word. Use a short GSAP or JS character scramble loop (0.4s total). This only triggers on hover, not on scroll — keep it subtle.
- One-line description in Inter, `#555555`
- CTA button: `border: 1px solid #00ff41`, `color: #00ff41`, transparent background. Hover: fill `#00ff41`, `color: #050505`. Motion `whileTap: { scale: 0.97 }`.

**Scroll animation:**
- Mentor block: Motion `inView`, `x: -50→0`, `opacity: 0→1`
- Volunteer block: Motion `inView`, `x: 50→0`, `opacity: 0→1`

**Mobile:** Full-width stacked blocks. Ghost text scales down proportionally.

---

### [09] FAQs
**Design: Clean accordion. Category grouped. No card boxes — pure typography.**

**Section header:** `// 07` + "INTEL" in Outfit Bold

**Category labels** above each group of questions:
- `ELIGIBILITY /` `FORMAT /` `REGISTRATION /` — JetBrains Mono, `#00ff41`, small, uppercase. Acts as visual anchors.

**Each FAQ row:**
- Full-width. `border-bottom: 1px solid #1a1a1a`. Min height `56px` (touch-friendly).
- Background: transparent default → `#0a0a0a` when open
- Question text: Outfit Medium, `#e8e8e8`
- Right: `[+]` / `[−]` toggle in JetBrains Mono, `#00ff41`
- Answer: Inter, `#555555`. Revealed via Motion `animate`, `height: 0→auto`, `opacity: 0→1`, duration 0.3s, `ease: easeInOut`

**No card borders. No backgrounds on closed items. Just clean rows.**

**Scroll animation:**
- FAQ rows stagger in: Motion `inView`, `opacity: 0→1`, `y: 10→0`, `staggerChildren: 0.06`

---

### [10] CONTACT
**Design: Clean typographic layout. Two columns. Tap-to-call on mobile.**

**Section header:** `// 08` + "REACH OUT" in Outfit Bold

**Two columns (desktop), single column (mobile):**

Left — Contact persons:
- Each person: name in Outfit Medium, `#e8e8e8` + phone in JetBrains Mono, `#555555`
- Phone as `<a href="tel:...">` — tappable on mobile
- Simple rows, no card boxes, `border-bottom: 1px solid #1a1a1a` between entries

Right — Email + Socials:
- Email addresses in JetBrains Mono, `#00ff41`, `<a href="mailto:...">`. No underline default, underline on hover.
- Social links (Instagram, LinkedIn) as text + small SVG icon. `#555555` default, `#00ff41` on hover.
- CSEA website link similarly styled.

**Background decoration (right column only):**
- 3–4 slowly drifting strings (`@csea_ceg`, `192.168.1.1`, `$ ping hackz`) in JetBrains Mono, `#00ff41` at 0.05 opacity
- GSAP infinite slow `y` drift, different speeds. Clipped to the section container. No overlap with text content.

**Scroll animation:**
- Contact rows: Motion `inView`, `staggerChildren: 0.07`, `opacity: 0→1`, `x: -10→0`

---

### [11] FOOTER
**Design: Minimal. One row. System shutdown flavor.**

- `border-top: 1px solid #1a1a1a`. `background: #050505`.
- Left: `HackZ '24 — CSEA-CEG` in JetBrains Mono, `#555555`, small
- Center: `© 2024 CSEA. All rights reserved.` in Inter, `#555555`, small
- Right: Instagram + LinkedIn SVG icon links, `#555555` default, `#00ff41` on hover

**Mobile:** Stack vertically, centered. Icons below copyright.

---

## SCROLL & ANIMATION SYSTEM

### Stack: Lenis + GSAP ScrollTrigger + Motion (motion.dev)

**Lenis init:**
```js
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
})

gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
lenis.on('scroll', ScrollTrigger.update)
```

> **Mobile note:** Disable Lenis on `window.innerWidth < 768` and fall back to native scroll. ScrollTrigger and Motion `inView` both work natively without Lenis.

**Full animation map:**

| Section | Tool | What animates |
|---------|------|---------------|
| Scroll progress bar | Motion `useScroll` + `useTransform` | `scaleX: 0→1`, `transform-origin: left` |
| Hero canvas | Motion `useScroll` + `useTransform` | Canvas `opacity: 1→0` as hero exits |
| Hero wordmark | GSAP timeline on mount | Glitch entrance 800ms. Re-trigger on hover (300ms). |
| Hero label + tagline | Motion `inView` | `opacity: 0→1`, `y: 16→0`, staggered 0.2s delay after wordmark |
| Hero CTA | Motion `inView` | `opacity: 0→1`, `y: 12→0`, delay 0.5s |
| Stats marquee | GSAP RAF loop | Infinite `x` translate. Speed nudges with `lenis.velocity` |
| About SVG illustration | Motion `inView` | `opacity: 0→0.09`, duration 1.2s |
| About text lines | Motion `inView` | `staggerChildren: 0.06`, `opacity: 0→1`, `y: 14→0` |
| About stat boxes | GSAP `ScrollTrigger` `onEnter` | Countup 0 → value, 1.2s |
| Track cards | Motion `inView` | `staggerChildren: 0.08`, `opacity: 0→1`, `y: 30→0` |
| Track bottom bar | Motion `inView` animate | `width: 0%→100%`, duration 0.6s per card |
| Sponsor logos | Motion `inView` | `filter: grayscale(1)→grayscale(0)`, duration 0.8s |
| Prize countup | GSAP `ScrollTrigger` `onEnter` | 0 → 1,70,000 over 1.8s |
| Prize podiums | Motion `inView` | `staggerChildren: 0.12`, `y: 50→0`, `opacity: 0→1` |
| Timeline SVG line | GSAP `ScrollTrigger` `scrub: 1` | `stroke-dashoffset` full → 0 as section scrolls |
| Timeline nodes | GSAP `ScrollTrigger` per node | `scale: 0.7→1`, `opacity: 0→1` at each node's scroll position |
| Get Involved blocks | Motion `inView` | Left: `x: -50→0`. Right: `x: 50→0`. Both `opacity: 0→1`. |
| FAQ rows | Motion `inView` | `staggerChildren: 0.06`, `opacity: 0→1`, `y: 10→0` |
| FAQ open/close | Motion `animate` | `height: 0→auto`, `opacity: 0→1`, `duration: 0.3`, `ease: easeInOut` |
| Contact rows | Motion `inView` | `staggerChildren: 0.07`, `opacity: 0→1`, `x: -10→0` |
| Contact drift strings | GSAP infinite | `y: 0→-30px`, alternating, 8–14s each, different per string |
| Get Involved text scramble | Custom JS / GSAP | On hover only: randomize characters → resolve in 0.4s |

**Reusable Motion variants:**
```js
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }
}
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}
```

**Blinking cursor (reusable component):**
```jsx
const BlinkingCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
    style={{ color: '#00ff41', fontFamily: 'JetBrains Mono' }}
  >▌</motion.span>
)
// Use in: hero label, timeline active node
```

---

## MOBILE RESPONSIVENESS

**Breakpoints (mobile-first):**
```
xs:  < 480px
sm:  480–767px
md:  768–1023px
lg:  1024px+
```

**General rules:**
- `clamp()` for all heading and display font sizes. Never hard-code `px` for headings.
- Every interactive element: minimum `44×44px` tap target. Use padding, not just visual size.
- `overflow-x: hidden` on `body`. All floated decorative elements clipped to their section container.
- Hover effects must have `whileTap` equivalents for mobile.
- All sponsor/partner logos: `max-width: 100%`, responsive.
- Disable Lenis on mobile (`< 768px`). Use native scroll.
- Matrix rain canvas on mobile: halve the column count, optional frame-skip.
- Floating decorative strings: show only 2–3 maximum on mobile, hide rest with `display: none` at xs.

**Per-section responsive behavior:**

| Section | Mobile behavior |
|---------|----------------|
| Navbar | Hamburger → full-screen overlay. 48px tap targets per link. |
| Hero | Wordmark `clamp(52px, 16vw, 80px)`. CTA full-width. Canvas reduced columns. |
| Stats strip | Font 11px. Same marquee behavior. |
| About | Single column. Hide left SVG. Stat boxes stack on xs. |
| Tracks | 1 column, full-width cards. |
| Sponsors | Logos stacked vertically, centered, max 240px. |
| Prizes | Podiums stack vertically 1st→2nd→3rd. Countup number `clamp(48px, 12vw, 100px)`. |
| Timeline | Single left-aligned column. Dates abbreviated `SEP 30`. |
| Get Involved | Blocks stack vertically, full width. |
| FAQs | No change. Min row height 56px. Font `clamp(14px, 4vw, 17px)`. |
| Contact | Single column. Phone numbers as `<a href="tel:">`. |
| Footer | Stack vertically, centered. |

---

## DEPENDENCIES

```bash
npm install lenis gsap motion
```

**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

**GSAP plugins (register once at app root):**
```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

---

## FINAL CHECKLIST

**Visual identity:**
- ✅ Matrix rain canvas on hero
- ✅ Glitch entrance on hero wordmark
- ✅ Scanlines on hero canvas only
- ✅ Noise grain overlay globally (opacity 0.035)
- ✅ Scroll progress bar in green at top of viewport
- ✅ `#00ff41` green as the single accent color; amber only for special/warning items
- ✅ All cards and boxes: sharp corners, `border-radius: 0`
- ✅ Circuit-style SVG illustration in About (low opacity decoration)
- ✅ Floating drift strings only in Contact section (3–4 max)
- ✅ Text scramble only on Get Involved hover — nowhere else
- ✅ `[ OK ]` badge decoration on Sponsors only
- ✅ Blinking cursor in hero label and timeline active node only

**Animations:**
- ✅ Lenis + GSAP ticker synced
- ✅ Timeline SVG line draws on scroll (GSAP scrub)
- ✅ Prize and stat numbers count up on scroll entry
- ✅ Track bottom bar width animates on scroll entry
- ✅ Sponsor logos desaturate-to-color on scroll entry
- ✅ All section reveals use Motion `inView` with `once: true`
- ✅ Lenis disabled on mobile, native scroll used

**Restraint:**
- ❌ No glassmorphism / backdrop-blur
- ❌ No glowing colored borders
- ❌ No stacking multiple atmospheric effects on one section
- ❌ No decorative elements that overlap readable content
- ❌ No light backgrounds anywhere on the page

---

*All event content, links, contact details, and prize data sourced from the official HackZ '24 website. Do not alter.*