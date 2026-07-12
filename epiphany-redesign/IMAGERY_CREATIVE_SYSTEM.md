# Epiphiny Flow — V3 Imagery & Creative System

**Scope:** interior pages (Advisory, Investment, Community, About). The homepage is the exception and keeps its human photography.
**Decided:** 2026-07-12. **Status:** governs all interior-page creative.

---

## 1. The principle

The homepage is the **human front door** — it carries the diaspora photography (real people, London/Manchester settings). The interior pages are deliberately **people-free**. Their cohesion with the homepage is not carried by photography; it is carried by four things:

1. **One colour world** — teal, dark, cream, purple used identically everywhere.
2. **The type system** — the same Playfair / Manrope / Sora roles on every page.
3. **The connection motif** — the globe/network from the homepage hero, expressed as a **structural route** that runs down each interior page.
4. **The section grammar** — overline → editorial heading → diagram/rows → dark evidence band → CTA.

> Rule of thumb: a viewer should know it is Epiphiny Flow from the type and the teal route alone, before any image loads. That is what makes people-free pages feel like the same brand as the people-led homepage. Human warmth is the front door; the interior is the architecture behind it.

---

## 2. The recognisability line (the only test for "can we use this image?")

The line is drawn by **recognisability, not by "AI vs not AI":**

- If a viewer would read it as a **real person or a real scene** (a named face, a lifestyle shot, a crowd, an interior with people) → it must be **real photography**, researched and licensed. Never AI-generate it. AI lifestyle reads as slop to the human eye even when an automated realism check passes it.
- If a viewer would **not** read it as a photo — texture, grain, gradient, pattern, diagram, type, an abstract mark → **AI or procedural generation is fine.**

On interior pages we mostly stay on the safe side of this line by not using people at all.

---

## 3. Allowed creative types (in priority order)

### A. The connection route (PRIMARY signature — use on every page)
The homepage globe, re-expressed as a **continuous teal route** that structures the whole page: an origin node under the hero, a node at each content block, a waypoint node in the dark evidence band, a destination node at the CTA. Pure SVG, no raster.
- Each page gets its **own route narrative** — do not clone the layout:
  - **Advisory** → the engagement route (organisation types → process stations → outcome)
  - **Investment** → the capital pipeline (sourcing → diligence → allocation → returns)
  - **Community** → the access network (join → participate → exchange → support)
  - **About** → the origin story (founding → network → credibility → today)
- Colour: `#2A9D8F` on light, `#00E7C3` on dark. Dashed, ~2px. Nodes: teal-deep dot + white centre + faint outer ring on primary nodes.

### B. Diagrams & data visuals (the antidote to text-heaviness)
Convert prose into structure. This is the main tool for de-densifying the current pages.
- Process timelines / metro-station diagrams, flow diagrams, numbered frameworks.
- Stat cards, sparklines, a "snapshot" glass card on the dark band.
- The connection-map as a **diagram** (nodes + arcs), never a literal photoreal globe on interior pages.

### C. Editorial typography as imagery
Type is a first-class visual, not just words.
- Giant Playfair pull-quotes as full sections.
- Oversized pale ghost numerals behind content rows.
- Display-scale outcome figures (Manrope 800) as the endpoint of a row.

### D. Abstract textural assets (safe-side AI / procedural — sparing)
Assets a viewer will not read as a photo. Allowed via §2.
- Subtle grain / noise overlays, soft gradient meshes (teal→transparent), fine geometric grids, halftone or dot fields.
- Keep low-opacity and atmospheric; never let them become decoration that competes with the route or type.

### E. Real place & architecture photography — NO people (use sparingly)
Where a genuine photograph adds warmth or place, use **real, licensed** architecture / cityscape shots with **no identifiable people**.
- Subjects: Manchester, London, Lagos, Nairobi, Accra skylines / landmarks / interiors-without-people.
- Treatment: graded into the colour world (duotone toward teal/dark, or desaturated + warm), never a raw stock look.
- Source real (see §5). Do **not** AI-generate these — a fabricated "real place" trips the recognisability line.

### F. Treated homepage people-accents (the optional warmth hybrid)
If a page feels too cold, reuse an **already-approved homepage photograph** as a small, treated accent (duotone + grain, thumbnail scale, inside a testimonial or evidence block).
- Uses **existing** shots only. No new people generation, ever. This keeps human warmth without turning an interior page back into a photo page.

---

## 4. Forbidden

- **New AI-generated people or lifestyle scenes** (soft-life, networking, crowds, interiors-with-people) — reads as slop, trips §2.
- **Any named person's likeness**, AI or composited.
- **Generic stock-corporate photography** (handshakes, glass-office clichés, smiling-at-laptop).
- **A photoreal globe raster** dropped on interior pages — the globe stays a code/diagram expression here; the homepage owns the 3D hero.
- **A second accent colour** fighting the teal. Purple is a quiet secondary for stat/metadata only.
- **Em-dashes** anywhere (house rule).

---

## 5. Sourcing (for §3E real photography)

- Free-commercial: Unsplash, Pexels, and **Nappy.co** (strong for Black / diaspora subjects) — but architecture/place shots preferred here since people are off-limits on interior pages.
- Licensed stock where a specific city/landmark is needed.
- File on arrival to `~/experiments/epiphiny/refs/` as `YYYY-MM-DD_descriptive-name.ext`.

---

## 6. The locked type system (resolved 2026-07-12)

| Role | Font | Notes |
|------|------|-------|
| Homepage flagship hero statement | **Sora** 600 | Reserved for the homepage hero only |
| Interior page hero + all section headings | **Playfair Display** 600 | The editorial/trust voice; carries interior heroes |
| Organisation / feature names (h3) | **Playfair Display** 600 | e.g. "Startups", "Scale-ups" |
| Body copy, overlines, labels, station tags | **Manrope** 400–700 | |
| All numbers / stats / ghost numerals | **Manrope** 800 | NOT Sora — homepage parity |
| Logo wordmark | **Outfit** 600 | Matches the live header wordmark |

> Why the interior hero is Playfair, not Sora: the DDDT gate flagged that a sans-heavy hero reads "startup-tech" and undermines institutional trust for founder/government buyers. Serif hero = trust. Sora stays the homepage's louder front-door voice.

---

## 7. Colour tokens

| Token | Hex | Role |
|-------|-----|------|
| Teal | `#00E7C3` | The accent / route on dark. One weapon, not confetti. |
| Teal-deep | `#2A9D8F` | The route / nodes on light backgrounds. |
| Dark | `#15171A` | Evidence bands, CTA fields, footer. |
| Cream | `#F5F0E8` | Alternating section background (process). |
| Purple | `#8B5CF6` | Secondary metadata / timeline tags only. Never a co-lead. |
| Off-white | `#FFFFFF` / near | Base. Avoid pure black text fields on white — use `#15171A`. |
