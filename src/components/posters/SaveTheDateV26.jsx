import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   V26 — "Magazine Editorial"
   Magazine (1:1.3) · Full-bleed people image with sepia warmth
   Masthead top, glassmorphism info panel bottom
   ───────────────────────────────────────────────────────── */

const SpiralLogo = ({ size = 32, color = '#00E7C3' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 10C28 10 10 28 10 50s18 40 40 40 40-18 40-40c0-16-10-30-24-36"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M50 25C36 25 25 36 25 50s11 25 25 25 25-11 25-25c0-10-6-19-15-23"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M50 38C43 38 38 43 38 50s5 12 12 12 12-5 12-12c0-5-3-9-7-11"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="50" cy="50" r="3" fill={color} />
  </svg>
);

const SaveTheDateV26 = () => {
  const [fullView, setFullView] = useState(false);

  const posterWidth = fullView ? 750 : 480;
  const posterHeight = posterWidth * 1.3;

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={() => setFullView(!fullView)}
        className="px-4 py-2 text-sm rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {fullView ? 'Poster View' : 'Full View'}
      </button>

      <motion.div
        layout
        style={{
          width: posterWidth,
          height: posterHeight,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* ── Full-bleed background image with sepia warmth ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/generated/hero-people.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.3) saturate(1.2)',
          }}
        />

        {/* ── Subtle vignette ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(10,22,40,0.3) 100%)',
          }}
        />

        {/* ── Bottom gradient for glassmorphism readability ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(10,22,40,0.6) 20%, transparent)',
          }}
        />

        {/* ── Top bar: Save the date with teal dot ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            position: 'absolute',
            top: posterWidth * 0.04,
            right: posterWidth * 0.05,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#00E7C3',
              boxShadow: '0 0 12px rgba(0,231,195,0.6)',
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: posterWidth * 0.018,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Save the date
          </span>
        </motion.div>

        {/* ── Logo: top-left ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            position: 'absolute',
            top: posterWidth * 0.04,
            left: posterWidth * 0.05,
            zIndex: 10,
          }}
        >
          <SpiralLogo size={posterWidth * 0.05} color="#ffffff" />
        </motion.div>

        {/* ── MASTHEAD: Magazine title ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            position: 'absolute',
            top: posterHeight * 0.08,
            left: 0,
            right: 0,
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: "'Clash Display', 'Syne', sans-serif",
              fontWeight: 700,
              fontSize: posterWidth * 0.1,
              color: '#ffffff',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              margin: 0,
              textShadow: '0 2px 30px rgba(0,0,0,0.4)',
            }}
          >
            EPIPHINY FLOW
          </h1>
          {/* Thin line under masthead */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              width: posterWidth * 0.3,
              height: 1,
              backgroundColor: 'rgba(255,255,255,0.3)',
              margin: `${posterWidth * 0.015}px auto 0`,
              transformOrigin: 'center',
            }}
          />
          {/* Issue line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: posterWidth * 0.016,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginTop: posterWidth * 0.015,
              }}
            >
              Diaspora Investment &middot; October 2026
            </span>
          </motion.div>
        </motion.div>

        {/* ── GLASSMORPHISM PANEL: bottom third ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: posterWidth * 0.06,
            left: posterWidth * 0.06,
            right: posterWidth * 0.06,
            zIndex: 10,
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.15)',
            padding: `${posterWidth * 0.05}px ${posterWidth * 0.06}px`,
          }}
        >
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{
              fontFamily: "'Instrument Serif', 'Cormorant Garamond', serif",
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: posterWidth * 0.052,
              color: '#ffffff',
              lineHeight: 1.25,
              margin: 0,
              marginBottom: posterWidth * 0.03,
            }}
          >
            Where ambition meets capital.
          </motion.h2>

          {/* Teal accent line */}
          <div
            style={{
              width: posterWidth * 0.06,
              height: 2,
              backgroundColor: '#00E7C3',
              marginBottom: posterWidth * 0.025,
            }}
          />

          {/* Event details row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: posterWidth * 0.02,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 600,
                  fontSize: posterWidth * 0.032,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  marginBottom: 4,
                }}
              >
                27 October 2026
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: posterWidth * 0.016,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Factory International &middot; Manchester
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 600,
                  fontSize: posterWidth * 0.025,
                  color: '#ffffff',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                Grow &middot; Scale &middot; Boost
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: posterWidth * 0.016,
                  color: '#00E7C3',
                }}
              >
                info@epiphinyflow.com
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            style={{
              display: 'flex',
              gap: posterWidth * 0.06,
              marginTop: posterWidth * 0.03,
              paddingTop: posterWidth * 0.02,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {[
              { value: '£2B+', label: 'Capital targeted 2026' },
              { value: '£1.2B', label: 'Launched 2025' },
            ].map((stat, i) => (
              <div key={i}>
                <span
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontWeight: 700,
                    fontSize: posterWidth * 0.03,
                    color: '#00E7C3',
                    marginRight: 8,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: posterWidth * 0.013,
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SaveTheDateV26;
