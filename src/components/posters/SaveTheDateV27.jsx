import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   V27 — "Typographic Poster with People Strip"
   Stories/Tall (9:16) · Dark navy · Typography hero
   Thin horizontal people-image strip cuts through type
   like a film strip — the soul peeking through.
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

const SaveTheDateV27 = () => {
  const [fullView, setFullView] = useState(false);

  const posterWidth = fullView ? 500 : 340;
  const posterHeight = (posterWidth / 9) * 16;
  const stripHeight = 80;
  const pad = posterWidth * 0.07;

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
          backgroundColor: '#0A1628',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* ── Subtle grid texture overlay ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: `${posterWidth * 0.1}px ${posterWidth * 0.1}px`,
            zIndex: 1,
          }}
        />

        {/* ── Top logo bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: posterHeight * 0.07,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${pad}px`,
            zIndex: 10,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SpiralLogo size={posterWidth * 0.06} />
            <span
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 600,
                fontSize: posterWidth * 0.032,
                color: '#ffffff',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Epiphiny Flow
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#00E7C3',
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: posterWidth * 0.022,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Save the date
            </span>
          </div>
        </motion.div>

        {/* ── TYPOGRAPHY HERO SECTION ── */}
        <div
          style={{
            position: 'absolute',
            top: posterHeight * 0.12,
            left: pad,
            right: pad,
            zIndex: 5,
          }}
        >
          {/* "Where" */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: posterWidth * 0.16,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 0.95,
                display: 'block',
              }}
            >
              Where
            </span>
          </motion.div>

          {/* "ambition" */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: posterWidth * 0.16,
                color: '#ffffff',
                lineHeight: 0.95,
                display: 'block',
              }}
            >
              ambition
            </span>
          </motion.div>
        </div>

        {/* ── PEOPLE IMAGE STRIP — the bold move ── */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: posterHeight * 0.36,
            left: 0,
            right: 0,
            height: stripHeight,
            overflow: 'hidden',
            zIndex: 6,
            transformOrigin: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: stripHeight * 3,
              marginTop: -stripHeight,
              backgroundImage: 'url(/generated/hero-people.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 35%',
            }}
          />
          {/* Teal edge lines */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #00E7C3, transparent)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #00E7C3, transparent)',
            }}
          />
        </motion.div>

        {/* ── "MEETS" — below the strip ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          style={{
            position: 'absolute',
            top: posterHeight * 0.36 + stripHeight + posterWidth * 0.03,
            left: pad,
            right: pad,
            zIndex: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: posterWidth * 0.19,
              color: 'rgba(255,255,255,0.12)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              display: 'block',
            }}
          >
            MEETS
          </span>
          {/* Solid overlay for "MEETS" */}
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: posterWidth * 0.19,
              color: '#ffffff',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.3))',
              backgroundClip: 'text',
            }}
          >
            MEETS
          </span>
        </motion.div>

        {/* ── "capital." ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{
            position: 'absolute',
            top: posterHeight * 0.36 + stripHeight + posterWidth * 0.22,
            left: pad,
            right: pad,
            zIndex: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: posterWidth * 0.18,
              color: '#00E7C3',
              lineHeight: 0.9,
              display: 'block',
            }}
          >
            capital.
          </span>
        </motion.div>

        {/* ── Bottom info section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: posterHeight * 0.04,
            left: pad,
            right: pad,
            zIndex: 10,
          }}
        >
          {/* Teal divider */}
          <div
            style={{
              width: posterWidth * 0.12,
              height: 2,
              backgroundColor: '#00E7C3',
              marginBottom: posterWidth * 0.04,
            }}
          />

          {/* Date */}
          <div
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 600,
              fontSize: posterWidth * 0.05,
              color: '#ffffff',
              letterSpacing: '0.15em',
              marginBottom: posterWidth * 0.02,
            }}
          >
            27 OCTOBER 2026
          </div>

          {/* Event name */}
          <div
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 600,
              fontSize: posterWidth * 0.03,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: posterWidth * 0.04,
            }}
          >
            Grow &middot; Scale &middot; Boost
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: posterWidth * 0.08,
              marginBottom: posterWidth * 0.04,
            }}
          >
            {[
              { value: '£2B+', label: 'Capital targeted' },
              { value: '£1.2B', label: 'At launch 2025' },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontWeight: 700,
                    fontSize: posterWidth * 0.045,
                    color: '#00E7C3',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: posterWidth * 0.018,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Venue + Contact */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingTop: posterWidth * 0.03,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: posterWidth * 0.02,
                  color: 'rgba(255,255,255,0.35)',
                  lineHeight: 1.5,
                }}
              >
                Factory International @ Aviva Studios
                <br />
                Manchester, M3 4JQ
              </div>
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: posterWidth * 0.02,
                color: '#00E7C3',
              }}
            >
              Robert@epiphinyflow.com
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SaveTheDateV27;
