import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   V24 — "People + Gradient Fusion"
   Square (1:1) · Dark navy base
   People image dissolves into fluid gradient via CSS mask
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

const SaveTheDateV24 = () => {
  const [fullView, setFullView] = useState(false);

  const posterWidth = fullView ? 800 : 500;
  const posterHeight = posterWidth; // 1:1

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Toggle */}
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
          background: '#0A1628',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* ── People image: top 55% ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '60%',
            backgroundImage: 'url(/generated/hero-people.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))',
            zIndex: 2,
          }}
        />

        {/* ── Fluid gradient image: bottom 50%, overlapping ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '55%',
            backgroundImage: 'url(/generated/fluid-gradient.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0))',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0))',
            zIndex: 1,
          }}
        />

        {/* ── Dark gradient overlay for bottom text area ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(10,22,40,0.85) 30%, transparent)',
            zIndex: 3,
          }}
        />

        {/* ── Top-left logo ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: posterWidth * 0.04,
            left: posterWidth * 0.04,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <SpiralLogo size={posterWidth * 0.05} />
          <span
            style={{
              fontFamily: "'Clash Display', 'Syne', sans-serif",
              fontWeight: 600,
              fontSize: posterWidth * 0.022,
              color: '#ffffff',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Epiphiny Flow
          </span>
        </motion.div>

        {/* ── "Save the date" pill ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            position: 'absolute',
            top: posterWidth * 0.04,
            right: posterWidth * 0.04,
            zIndex: 10,
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
              fontSize: posterWidth * 0.016,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Save the date
          </span>
        </motion.div>

        {/* ── Headline: where images merge ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            position: 'absolute',
            top: '48%',
            left: 0,
            right: 0,
            zIndex: 10,
            textAlign: 'center',
            padding: `0 ${posterWidth * 0.08}px`,
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: posterWidth * 0.058,
              color: '#ffffff',
              lineHeight: 1.2,
              textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)',
              margin: 0,
            }}
          >
            Where ambition meets capital.
          </h1>
        </motion.div>

        {/* ── Date ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            position: 'absolute',
            top: '62%',
            left: 0,
            right: 0,
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 600,
              fontSize: posterWidth * 0.026,
              color: '#00E7C3',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
            }}
          >
            27 &middot; October &middot; 2026
          </span>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{
            position: 'absolute',
            bottom: posterWidth * 0.15,
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            gap: posterWidth * 0.08,
          }}
        >
          {[
            { value: '£2B+', label: 'Capital targeted' },
            { value: '£1.2B', label: 'At launch' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  fontSize: posterWidth * 0.035,
                  color: '#ffffff',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: posterWidth * 0.014,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Event title ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            position: 'absolute',
            bottom: posterWidth * 0.08,
            left: 0,
            right: 0,
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 600,
              fontSize: posterWidth * 0.03,
              color: '#ffffff',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Grow &middot; Scale &middot; Boost
          </span>
        </motion.div>

        {/* ── Venue: bottom-right ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute',
            bottom: posterWidth * 0.03,
            right: posterWidth * 0.04,
            zIndex: 10,
            textAlign: 'right',
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: posterWidth * 0.013,
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.5,
            }}
          >
            Factory International @ Aviva Studios
            <br />
            Manchester, M3 4JQ
          </div>
        </motion.div>

        {/* ── Contact ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute',
            bottom: posterWidth * 0.03,
            left: posterWidth * 0.04,
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: posterWidth * 0.013,
              color: '#00E7C3',
            }}
          >
            info@epiphinyflow.com
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SaveTheDateV24;
