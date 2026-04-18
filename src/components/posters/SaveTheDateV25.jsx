import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   V25 — "Split People + Typography"
   Poster (1:1.45) · Left: people image · Right: cream typography
   The split IS the concept. Thin teal bridge line where they meet.
   ───────────────────────────────────────────────────────── */

const SpiralLogo = ({ size = 32, color = '#0A1628' }) => (
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

const SaveTheDateV25 = () => {
  const [fullView, setFullView] = useState(false);

  const posterWidth = fullView ? 700 : 440;
  const posterHeight = posterWidth * 1.45;
  const splitAt = 0.45; // 45% left

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
          display: 'flex',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* ── LEFT: People image ── */}
        <div
          style={{
            width: `${splitAt * 100}%`,
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/generated/hero-people.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'saturate(0.7) contrast(1.15)',
            }}
          />
          {/* Subtle dark overlay at bottom for date readability */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '15%',
              background: 'linear-gradient(to top, rgba(10,22,40,0.7), transparent)',
            }}
          />
          {/* Logo overlaid on image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute',
              top: posterWidth * 0.05,
              left: posterWidth * 0.04,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <SpiralLogo size={posterWidth * 0.045} color="#ffffff" />
            <span
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 600,
                fontSize: posterWidth * 0.02,
                color: '#ffffff',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Epiphiny Flow
            </span>
          </motion.div>
        </div>

        {/* ── TEAL BRIDGE LINE ── */}
        <div
          style={{
            width: 2,
            height: '100%',
            backgroundColor: '#00E7C3',
            flexShrink: 0,
            zIndex: 5,
          }}
        />

        {/* ── RIGHT: Cream typography ── */}
        <div
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#F5F0E8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: `${posterWidth * 0.08}px ${posterWidth * 0.06}px`,
            position: 'relative',
          }}
        >
          {/* Save the date pill */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              position: 'absolute',
              top: posterWidth * 0.05,
              right: posterWidth * 0.05,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
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
                fontSize: posterWidth * 0.015,
                color: 'rgba(10,22,40,0.4)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Save the date
            </span>
          </motion.div>

          {/* Typography stack */}
          <div style={{ marginBottom: posterHeight * 0.06 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: posterWidth * 0.065,
                  color: '#0A1628',
                  lineHeight: 1.0,
                  display: 'block',
                }}
              >
                Where
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: posterWidth * 0.065,
                  color: '#0A1628',
                  lineHeight: 1.0,
                  display: 'block',
                }}
              >
                ambition
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <span
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  fontSize: posterWidth * 0.09,
                  color: '#0A1628',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  display: 'block',
                  marginTop: posterWidth * 0.01,
                }}
              >
                MEETS
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
            >
              <span
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  fontSize: posterWidth * 0.085,
                  color: '#00E7C3',
                  lineHeight: 1.1,
                  display: 'block',
                }}
              >
                capital.
              </span>
            </motion.div>
          </div>

          {/* Grow Scale Boost */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            style={{ marginBottom: posterWidth * 0.04 }}
          >
            <span
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 600,
                fontSize: posterWidth * 0.02,
                color: '#0A1628',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Grow &middot; Scale &middot; Boost
            </span>
          </motion.div>

          {/* Decorative teal line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{
              width: posterWidth * 0.08,
              height: 2,
              backgroundColor: '#00E7C3',
              transformOrigin: 'left',
              marginBottom: posterWidth * 0.03,
            }}
          />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              display: 'flex',
              gap: posterWidth * 0.06,
            }}
          >
            {[
              { value: '£2B+', label: 'Targeted' },
              { value: '£1.2B', label: 'At launch' },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontWeight: 700,
                    fontSize: posterWidth * 0.04,
                    color: '#0A1628',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: posterWidth * 0.013,
                    color: 'rgba(10,22,40,0.45)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom bar spanning both halves ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: posterHeight * 0.055,
            backgroundColor: '#0A1628',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${posterWidth * 0.04}px`,
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 600,
              fontSize: posterWidth * 0.02,
              color: '#00E7C3',
              letterSpacing: '0.2em',
            }}
          >
            27 OCTOBER 2026
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: posterWidth * 0.014,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Factory International @ Aviva Studios, Manchester
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: posterWidth * 0.014,
              color: '#00E7C3',
            }}
          >
            Robert@epiphinyflow.com
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SaveTheDateV25;
