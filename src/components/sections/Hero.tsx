import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MatrixCanvas } from '../ambient/MatrixCanvas';
import { BlinkingCursor } from '../ambient/BlinkingCursor';
import { Button } from '../ui/Button';
import { GlitchText } from '../ui/GlitchText';
import { EVENT_LINKS } from '../../data/contact';
import ScrambleText from '../ui/ScrambleText';
import TextType from '../ui/TextType'
import {GlitchSvg} from '../ui/GlitchSvg';
export const Hero: React.FC = () => {
  const [isGlitching, setIsGlitching] = useState<boolean>(true);

  useEffect(() => {
    let burstTimer: ReturnType<typeof setTimeout> | null = null;

    // Initial glitch burst on page load (850ms)
    const initialTimer = setTimeout(() => {
      setIsGlitching(false);
    }, 850);

    // Auto-glitch burst every 10 seconds
    const interval = setInterval(() => {
      setIsGlitching(true);
      if (burstTimer) clearTimeout(burstTimer);
      burstTimer = setTimeout(() => {
        setIsGlitching(false);
      }, 900);
    }, 7500);

    return () => {
      clearTimeout(initialTimer);
      if (burstTimer) clearTimeout(burstTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: 2,
        backgroundColor: 'var(--bg-page)',
        paddingTop: 'var(--header-height)',
        paddingBottom: '40px',
      }}
    >
      {/* Background Matrix Rain */}
      <MatrixCanvas opacity={0.6} />


      <div className="crt-vignette" />

      {/* Hero Content Stack */}
      <div
        className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '900px',
        }}
      >
        {/* Top Monospace Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--accent-green)',
            letterSpacing: '0.18em',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'center',
          }}
        >
           <GlitchSvg>

          <div className="flex items-center  md:w-[15vw] w-45 justify-center gap-2 mb-3">
                    <svg viewBox="76 74 1086 650" className="h-full w-auto filter drop-shadow-[0_0_15px_rgba(13, 122, 52, 1)]">
                      <g transform="translate(0,944) scale(0.1,-0.1)">
                        <path d="M6185 8365 c-270 -36 -416 -69 -580 -129 -38 -15 -104 -38 -145 -52
                          -71 -25 -164 -64 -203 -85 -10 -5 -62 -33 -115 -61 -93 -49 -294 -178 -377
                          -242 -138 -105 -343 -295 -448 -414 -100 -113 -258 -337 -320 -452 -4 -8 -34
                          -60 -65 -115 l-58 -100 -204 0 c-182 0 -214 -3 -290 -23 -165 -45 -211 -66
                          -340 -157 -162 -115 -275 -255 -375 -470 -101 -214 -134 -344 -141 -550 -3
                          -85 -1 -146 5 -155 8 -11 47 -15 196 -17 226 -3 219 -6 230 118 10 127 65 327
                          113 413 34 62 124 176 174 221 139 125 433 208 623 176 136 -23 153 -24 232
                          -5 81 18 133 55 133 93 0 22 54 129 161 321 13 24 70 108 145 215 86 123 326
                          379 424 454 19 14 44 34 55 45 28 26 164 125 221 161 26 17 64 40 83 53 36 22
                          124 66 283 141 125 58 280 107 419 131 26 5 64 14 85 20 53 15 381 49 478 50
                          198 0 568 -67 756 -137 219 -82 539 -270 735 -432 198 -163 472 -466 579 -639
                          16 -26 44 -69 61 -97 56 -86 124 -233 166 -359 33 -99 41 -139 46 -226 7 -115
                          21 -152 83 -203 42 -36 81 -44 240 -51 80 -4 168 -14 215 -26 44 -11 88 -20
                          97 -20 10 0 32 -6 50 -14 18 -8 71 -26 118 -41 143 -45 209 -74 346 -154 196
                          -115 378 -282 497 -456 22 -33 54 -80 70 -104 30 -43 132 -260 168 -356 51
                          -135 99 -383 99 -510 0 -165 -50 -481 -92 -582 -42 -103 -117 -247 -153 -299
                          -60 -84 -187 -195 -276 -242 -83 -45 -185 -77 -274 -87 -33 -4 -63 -12 -67
                          -19 -12 -17 -9 -375 2 -396 9 -16 18 -18 63 -14 295 31 590 172 795 383 80 83
                          180 225 235 336 45 90 118 306 132 390 4 22 14 63 22 90 7 28 19 132 25 232
                          19 301 -4 548 -70 754 -7 19 -23 70 -37 114 -29 91 -30 93 -80 195 -135 279
                          -321 517 -571 733 -214 185 -528 358 -789 436 -90 27 -269 68 -368 85 -43 7
                          -80 16 -83 18 -3 3 -17 41 -33 85 -30 84 -45 118 -160 353 -67 137 -86 171
                          -183 330 -41 67 -45 73 -137 200 -236 326 -574 633 -900 818 -160 91 -191 106
                          -336 162 -60 23 -123 48 -140 56 -74 35 -314 86 -530 114 -217 28 -490 26
                          -720 -5z M7325 5090 c-385 -4 -1259 -10 -1943 -14 -1011 -6 -1249 -9 -1275
                          -20 -195 -83 -247 -110 -319 -171 -117 -99 -198 -221 -239 -360 -21 -70 -24
                          -101 -24 -245 0 -145 3 -174 23 -236 30 -93 48 -128 105 -201 93 -118 209
                          -194 385 -253 l90 -30 502 0 502 0 64 -30 c129 -59 197 -163 197 -299 0 -125
                          -67 -234 -181 -292 l-47 -24 -1470 3 -1470 4 -92 28 c-144 44 -236 96 -375
                          213 -105 87 -209 261 -246 407 -23 94 -23 331 1 429 63 260 250 455 552 579
                          123 51 134 52 610 52 288 0 453 4 466 10 18 10 19 23 19 203 0 137 -3 196 -12
                          205 -9 9 -127 12 -468 12 -413 0 -465 -2 -546 -19 -417 -90 -730 -314 -923
                          -662 -102 -184 -157 -507 -133 -785 11 -133 33 -234 77 -355 32 -90 44 -112
                          118 -222 140 -207 315 -337 632 -466 28 -11 88 -30 135 -43 l85 -23 1560 0
                          1560 0 62 22 c337 122 523 387 523 749 0 273 -118 483 -340 608 -104 58 -141
                          73 -250 98 -77 17 -131 19 -560 21 l-475 3 -50 24 c-65 31 -145 107 -176 167
                          -35 70 -33 186 4 260 33 64 118 150 173 173 45 20 25 19 2524 41 1376 11 1379
                          12 1391 30 5 8 9 98 9 201 0 156 -3 189 -16 202 -8 9 -21 15 -27 14 -7 -1
                          -327 -5 -712 -8z M8478 5054 c-15 -8 -32 -23 -38 -34 -7 -13 -7 -384 0 -1207
                          l10 -1187 22 -23 c24 -26 42 -28 75 -10 12 7 130 119 263 250 143 143 246 237
                          254 234 7 -3 41 -70 76 -149 34 -78 89 -198 121 -265 32 -67 59 -126 59 -131
                          0 -5 9 -17 20 -27 19 -17 21 -17 72 5 29 12 103 46 165 76 62 30 117 54 123
                          54 17 0 130 60 130 69 0 11 -37 97 -105 246 -50 109 -135 326 -135 346 0 11 6
                          22 13 24 18 6 520 35 612 35 91 0 125 15 125 56 0 40 -22 64 -228 251 -108 98
                          -226 205 -262 238 -36 33 -155 141 -265 240 -109 99 -235 214 -279 255 -45 41
                          -121 111 -170 155 -49 44 -123 112 -165 150 -129 118 -344 311 -377 339 -36
                          29 -75 33 -116 10z M6240 4328 c-10 -4 -20 -15 -23 -25 -3 -10 -5 -249 -5
                          -530 0 -395 3 -515 13 -523 8 -7 314 -9 931 -8 l919 3 3 175 c1 96 0 185 -3
                          198 l-5 22 -704 0 c-633 0 -706 2 -721 16 -13 13 -15 37 -13 143 l3 126 710 3
                          c653 2 711 3 723 19 14 19 17 349 4 371 -7 9 -199 13 -911 15 -496 1 -911 -1
                          -921 -5z M6231 2931 c-11 -7 -13 -49 -13 -204 0 -108 3 -201 7 -207 4 -7 302
                          -10 925 -10 828 0 918 2 924 16 12 31 7 389 -6 402 -14 14 -1814 17 -1837 3z" fill="#ffffff" fillRule="evenodd">
                          </path>
                          <path d="M7063 6428 c-38 -46 -84 -103 -103 -128 -19 -25 -68 -85 -110 -135
                            -42 -49 -83 -100 -91 -112 -8 -12 -38 -48 -68 -81 -29 -33 -71 -85 -94 -115
                            -67 -87 -270 -338 -316 -391 -27 -31 -41 -56 -39 -70 l3 -21 870 -2 c479 -2
                            876 1 884 6 21 14 6 44 -82 155 -45 57 -101 130 -124 163 -23 32 -55 72 -71
                            89 -15 17 -57 69 -92 115 -90 119 -129 169 -223 289 -45 58 -93 121 -107 140
                            -13 19 -42 56 -64 81 -23 26 -51 58 -63 73 -12 14 -26 26 -31 26 -5 0 -41 -37
                            -79 -82z" fill="#0d7a34" fillRule="evenodd">
                          </path>
                      </g>
          </svg>
          </div>
           </GlitchSvg>
           <div>
            
            <ScrambleText text="PRESENTS" as="span" className="text-[14px] text-accent-green font-mono tracking-[0.18em]" from="random" easing="linear"/>
          <BlinkingCursor />
           </div>
        </motion.div>

        {/* Massive HackZ Wordmark with React Bits GlitchText */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            marginBottom: '14px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <GlitchText
            as="h1"
            speed={0.25}
            enableShadows={true}
            enableOnHover={!isGlitching}
            className="hero-glitch-wordmark font-pixel"
            style={{
              fontSize: 'clamp(50px, 11vw, 100px)',
              lineHeight: 1.1,
              margin: 0,
              fontFamily: 'var(--font-pixel)',
              color: 'var(--accent-green)',
              letterSpacing: '0.04em',
              textShadow: '0 0 4px rgba(51, 255, 51, 0.6), 0 0 10px rgba(51, 255, 51, 0.4)'
            }}
          >
            HACKZ
          </GlitchText>
        </motion.div>

        {/* Official Motto / Creed with Electric Color Accents */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(14px, 2.8vw, 18px)',
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            textShadow: '0 0 12px rgba(0, 0, 0, 0.8)',
          }}
        >
          <span style={{ color: 'var(--accent-green-bright)', textShadow: '0 0 10px rgba(57, 255, 20, 0.45)' }}>Zap.</span>
          <span style={{ color: 'var(--accent-green-mint)', textShadow: '0 0 10px rgba(0, 255, 136, 0.4)' }}>Zen.</span>
          <span style={{ color: 'var(--accent-green-volt)', textShadow: '0 0 10px rgba(132, 255, 0, 0.4)' }}>Zest.</span>
          <span style={{ color: 'var(--accent-green)', textShadow: '0 0 12px rgba(0, 255, 65, 0.5)' }}>HackZ</span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(15px, 2.5vw, 22px)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            opacity: 0.75,
            letterSpacing: '0.02em',
            maxWidth: '650px',
            marginBottom: '28px',
          }}
        >
          <p>24-Hour National Tech Marathon</p>
          <TextType text=" Innovate, Create, Dominate!" loop={true} cursorBlinkDuration={1} initialDelay={1000}/>
        </motion.div>

        {/* Date / Venue Sharp Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 20px',
            //border: '1px solid var(--border-default)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
            letterSpacing: '0.08em',
            marginBottom: '36px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <ScrambleText text="NOV 23–24, 2024" as="span" className="text-[clamp(14px,2.5vw,15px)] text-accent-green font-mono tracking-[0.08em]" from="random" easing="linear"/>
          <span style={{ color: 'var(--text-secondary)' }}>&middot;</span>
          <ScrambleText text="CEG CAMPUS, ANNA UNIVERSITY" as="span" className="text-[clamp(14px,2.5vw,15px)] text-text-primary font-mono tracking-[0.08em]" from="random" easing="linear"/>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Button
            variant="primary"
            href={EVENT_LINKS.registration}
            isExternal
            className="w-full sm:w-auto"
          >
             [ REGISTER NOW ]
          </Button>

          <Button
            variant="outline"
            href="#about"
            className="w-full sm:w-auto"
          >
            EXPLORE DETAILS ↓
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
