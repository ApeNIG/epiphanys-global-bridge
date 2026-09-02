import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

/* ─────────────────────────────────────────────────────────
   V28 — "The Handshake"
   Stories/Tall (9:16) · Dark navy · Actual logo + Sora font
   Two hands reaching toward each other — a handshake forming
   in the negative space between diaspora and opportunity.
   ───────────────────────────────────────────────────────── */

const SaveTheDateV28 = () => {
  const [fullView, setFullView] = useState(false);

  const posterWidth = fullView ? 500 : 340;
  const posterHeight = (posterWidth / 9) * 16;
  const pad = posterWidth * 0.07;

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={() => setFullView(!fullView)}
        className="px-4 py-2 text-sm rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
        style={{ fontFamily: "'Sora', sans-serif" }}
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
        {/* ── Subtle radial glow behind handshake ── */}
        <div
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: posterWidth * 0.9,
            height: posterWidth * 0.9,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,231,195,0.08) 0%, transparent 70%)',
            zIndex: 1,
          }}
        />

        {/* ── Subtle grid texture ── */}
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

        {/* ── Top logo bar with ACTUAL logo ── */}
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
            <img
              src={logo}
              alt="Epiphiny Flow"
              style={{
                width: posterWidth * 0.065,
                height: posterWidth * 0.065,
                objectFit: 'contain',
              }}
            />
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: posterWidth * 0.032,
                color: '#ffffff',
                letterSpacing: '0.05em',
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
                fontFamily: "'Sora', sans-serif",
                fontSize: posterWidth * 0.02,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Save the date
            </span>
          </div>
        </motion.div>

        {/* ── Handshake SVG illustration ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: posterHeight * 0.12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: posterWidth * 0.85,
            height: posterWidth * 0.55,
            zIndex: 5,
          }}
        >
          <svg
            viewBox="0 0 400 220"
            fill="none"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Left arm reaching right */}
            <motion.path
              d="M20 140 C40 138, 60 130, 90 120 C110 113, 130 108, 150 106 C160 105, 170 104, 180 105"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 1.0 }}
            />
            {/* Left hand */}
            <motion.path
              d="M180 105 C185 100, 192 96, 198 98 C204 100, 206 106, 204 110 M180 105 C182 108, 186 112, 192 113 C198 114, 204 112, 204 110 M192 113 C194 118, 196 122, 200 123 M198 98 C202 94, 208 92, 212 96"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            />
            {/* Right arm reaching left */}
            <motion.path
              d="M380 130 C360 128, 340 122, 310 115 C290 110, 270 107, 250 106 C240 105, 230 105, 220 106"
              stroke="#00E7C3"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 1.0 }}
            />
            {/* Right hand */}
            <motion.path
              d="M220 106 C215 101, 208 98, 204 100 C200 102, 198 107, 200 110 M220 106 C218 109, 214 113, 208 114 C202 115, 198 113, 200 110 M208 114 C206 119, 204 122, 200 123 M204 100 C200 96, 194 94, 190 98"
              stroke="#00E7C3"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
            {/* Connection spark at handshake point */}
            <motion.circle
              cx="200"
              cy="110"
              r="12"
              fill="none"
              stroke="#00E7C3"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0, 1.5, 2.5] }}
              transition={{ delay: 1.8, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.circle
              cx="200"
              cy="110"
              r="4"
              fill="#00E7C3"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6] }}
              transition={{ delay: 1.6, duration: 0.5 }}
            />
            {/* Radiating lines from handshake */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 200 + Math.cos(rad) * 20;
              const y1 = 110 + Math.sin(rad) * 20;
              const x2 = 200 + Math.cos(rad) * 35;
              const y2 = 110 + Math.sin(rad) * 35;
              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#00E7C3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: [0, 0.5, 0], pathLength: 1 }}
                  transition={{ delay: 1.8 + i * 0.05, duration: 0.6 }}
                />
              );
            })}
            {/* Labels */}
            <motion.text
              x="60"
              y="170"
              fill="rgba(255,255,255,0.3)"
              fontSize="11"
              fontFamily="'Sora', sans-serif"
              letterSpacing="0.15em"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              DIASPORA
            </motion.text>
            <motion.text
              x="280"
              y="170"
              fill="rgba(0,231,195,0.4)"
              fontSize="11"
              fontFamily="'Sora', sans-serif"
              letterSpacing="0.15em"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              OPPORTUNITY
            </motion.text>
          </svg>
        </motion.div>

        {/* ── Headline ── */}
        <div
          style={{
            position: 'absolute',
            top: posterHeight * 0.46,
            left: pad,
            right: pad,
            zIndex: 5,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: posterWidth * 0.115,
                color: '#ffffff',
                lineHeight: 1.0,
                display: 'block',
                letterSpacing: '-0.02em',
              }}
            >
              Where
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
          >
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: posterWidth * 0.115,
                color: '#ffffff',
                lineHeight: 1.0,
                display: 'block',
                letterSpacing: '-0.02em',
              }}
            >
              ambition
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: posterWidth * 0.115,
                color: '#00E7C3',
                lineHeight: 1.0,
                display: 'block',
                letterSpacing: '-0.02em',
              }}
            >
              meets capital.
            </span>
          </motion.div>
        </div>

        {/* ── Subline ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: posterHeight * 0.66,
            left: pad,
            right: pad,
            zIndex: 5,
          }}
        >
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: posterWidth * 0.028,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              maxWidth: posterWidth * 0.75,
            }}
          >
            Advisory, investment and community — connecting diaspora
            professionals with the knowledge, funding and networks to build
            across borders.
          </p>
        </motion.div>

        {/* ── Bottom info section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
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
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: posterWidth * 0.05,
              color: '#ffffff',
              letterSpacing: '0.1em',
              marginBottom: posterWidth * 0.02,
            }}
          >
            27 OCTOBER 2026
          </div>

          {/* Pillars */}
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 500,
              fontSize: posterWidth * 0.025,
              color: 'rgba(255,255,255,0.4)',
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
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: posterWidth * 0.045,
                    color: '#00E7C3',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: posterWidth * 0.016,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 400,
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
                  fontFamily: "'Sora', sans-serif",
                  fontSize: posterWidth * 0.018,
                  color: 'rgba(255,255,255,0.35)',
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                Factory International @ Aviva Studios
                <br />
                Manchester, M3 4JQ
              </div>
            </div>
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: posterWidth * 0.018,
                color: '#00E7C3',
                fontWeight: 500,
              }}
            >
              info@epiphinyflow.com
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SaveTheDateV28;
