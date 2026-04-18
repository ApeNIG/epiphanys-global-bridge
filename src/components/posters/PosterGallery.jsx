import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SaveTheDateV24 from './SaveTheDateV24';
import SaveTheDateV25 from './SaveTheDateV25';
import SaveTheDateV26 from './SaveTheDateV26';
import SaveTheDateV27 from './SaveTheDateV27';
import SaveTheDateV28 from './SaveTheDateV28';

/* ─────────────────────────────────────────────────────────
   PosterGallery — Browse all Save the Date poster designs
   V1–V23: archived (listed but not rendered)
   V24–V28: live components
   ───────────────────────────────────────────────────────── */

const POSTERS = [
  // V1–V23: Previous iterations (archived, component not available)
  { id: 'v1', label: 'V1', title: 'Initial concept', archived: true },
  { id: 'v2', label: 'V2', title: 'Typography exploration', archived: true },
  { id: 'v3', label: 'V3', title: 'Color study', archived: true },
  { id: 'v4', label: 'V4', title: 'Layout grid', archived: true },
  { id: 'v5', label: 'V5', title: 'Building hero', archived: true },
  { id: 'v6', label: 'V6', title: 'Split layout', archived: true },
  { id: 'v7', label: 'V7', title: 'Gradient experiment', archived: true },
  { id: 'v8', label: 'V8', title: 'People focus', archived: true },
  { id: 'v9', label: 'V9', title: 'Dark mode', archived: true },
  { id: 'v10', label: 'V10', title: 'Warm tones', archived: true },
  { id: 'v11', label: 'V11', title: 'Minimal', archived: true },
  { id: 'v12', label: 'V12', title: 'Mixed type', archived: true },
  { id: 'v13', label: 'V13', title: 'Conference card', archived: true },
  { id: 'v14', label: 'V14', title: 'Editorial pass', archived: true },
  { id: 'v15', label: 'V15', title: 'Teal accent', archived: true },
  { id: 'v16', label: 'V16', title: 'Glassmorphism test', archived: true },
  { id: 'v17', label: 'V17', title: 'Magazine layout', archived: true },
  { id: 'v18', label: 'V18', title: 'People + stats', archived: true },
  { id: 'v19', label: 'V19', title: 'Typography stack', archived: true },
  { id: 'v20', label: 'V20', title: 'Cream + serif', archived: true },
  { id: 'v21', label: 'V21', title: 'Refined split', archived: true },
  { id: 'v22', label: 'V22', title: 'Poster vertical', archived: true },
  { id: 'v23', label: 'V23', title: 'Pre-compound baseline', archived: true },
  // V24–V27: Current (compound designs)
  {
    id: 'v24',
    label: 'V24',
    title: 'People + Gradient Fusion',
    aspect: '1:1',
    component: SaveTheDateV24,
  },
  {
    id: 'v25',
    label: 'V25',
    title: 'Split People + Typography',
    aspect: '1:1.45',
    component: SaveTheDateV25,
  },
  {
    id: 'v26',
    label: 'V26',
    title: 'Magazine Editorial',
    aspect: '1:1.3',
    component: SaveTheDateV26,
  },
  {
    id: 'v27',
    label: 'V27',
    title: 'Typographic Poster with People Strip',
    aspect: '9:16',
    component: SaveTheDateV27,
  },
  {
    id: 'v28',
    label: 'V28',
    title: 'The Handshake',
    aspect: '9:16',
    component: SaveTheDateV28,
  },
];

const PosterGallery = () => {
  const [activeId, setActiveId] = useState('v24');

  const active = POSTERS.find((p) => p.id === activeId);
  const ActiveComponent = active?.component;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#080E1A',
        padding: '40px 20px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 40 }}>
        <h1
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 700,
            fontSize: 28,
            color: '#ffffff',
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}
        >
          Poster Gallery
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
          }}
        >
          Epiphiny Flow &mdash; Save the Date &mdash; 28 iterations and counting
        </p>
      </div>

      {/* Navigation pills */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          marginBottom: 40,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
        }}
      >
        {POSTERS.map((poster) => {
          const isActive = poster.id === activeId;
          const isLive = !poster.archived;
          return (
            <button
              key={poster.id}
              onClick={() => !poster.archived && setActiveId(poster.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: isActive
                  ? '1px solid #00E7C3'
                  : '1px solid rgba(255,255,255,0.08)',
                backgroundColor: isActive
                  ? 'rgba(0,231,195,0.12)'
                  : 'transparent',
                color: poster.archived
                  ? 'rgba(255,255,255,0.2)'
                  : isActive
                  ? '#00E7C3'
                  : 'rgba(255,255,255,0.6)',
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                cursor: poster.archived ? 'default' : 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: poster.archived ? 'line-through' : 'none',
              }}
              title={poster.title}
            >
              {poster.label}
              {isLive && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    backgroundColor: '#00E7C3',
                    marginLeft: 6,
                    verticalAlign: 'middle',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active poster info */}
      {active && (
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: '#00E7C3',
            }}
          >
            {active.label}
          </span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            {active.title}
          </span>
          {active.aspect && (
            <span
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                padding: '2px 8px',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {active.aspect}
            </span>
          )}
        </div>
      )}

      {/* Poster display */}
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {ActiveComponent ? (
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ActiveComponent />
            </motion.div>
          ) : (
            <motion.div
              key="archived"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 400,
                border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: 8,
              }}
            >
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                Archived &mdash; component not available
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PosterGallery;
