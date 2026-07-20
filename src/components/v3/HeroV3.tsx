import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { parseStatValue } from "@/hooks/useCountUp";
import heroPortrait from "@/assets/v3/cta-boardroom.png";

import heroManchester from "@/assets/v2/spiral-staircase-man.jpg";
import GlobeV3 from "./GlobeV3";

/* ── Animated counter for a single stat ── */
const AnimatedStat = ({
  num,
  label,
  delay,
}: {
  num: string;
  label: string;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(num); // fallback = static value
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const { number, prefix, suffix } = parseStatValue(num);
          const duration = 1800;
          const start = performance.now();

          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
            const val = Math.floor(number * ease);
            setDisplay(`${prefix}${val.toLocaleString()}${suffix}`);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div
      ref={ref}
      className="flex items-baseline gap-2 opacity-0 translate-y-4"
      style={{
        animation: `heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms forwards`,
      }}
    >
      <span className="text-[34px] md:text-[44px] font-bold text-[#15171A] font-sans tracking-tight tabular-nums">
        {display}
      </span>
      <span className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};


/* ── OrthoGlobe removed — replaced by GlobeV3 component ── */
const _OrthoGlobeRemoved = () => {
  const R = 380;
  const CX = 450, CY = 420;
  const PHI0 = 54 * Math.PI / 180;
  const LAM0 = -2 * Math.PI / 180;
  const col = "#3a6e66";
  const colLight = "#5a9e92";

  const proj = (lat: number, lon: number) => {
    const p = lat * Math.PI / 180, l = lon * Math.PI / 180;
    const cosc = Math.sin(PHI0) * Math.sin(p) + Math.cos(PHI0) * Math.cos(p) * Math.cos(l - LAM0);
    return {
      x: CX + R * Math.cos(p) * Math.sin(l - LAM0),
      y: CY - R * (Math.cos(PHI0) * Math.sin(p) - Math.sin(PHI0) * Math.cos(p) * Math.cos(l - LAM0)),
      v: cosc > 0.01,
    };
  };

  const toPath = (coords: [number, number][], close = false) => {
    const pts = coords.map(([a, b]) => proj(a, b));
    const segs: string[] = [];
    let cur: string[] = [];
    pts.forEach((p) => {
      if (p.v) { cur.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`); }
      else { if (cur.length > 1) segs.push("M" + cur.join("L")); cur = []; }
    });
    if (cur.length > 1) segs.push("M" + cur.join("L") + (close ? "Z" : ""));
    return segs.join(" ");
  };

  // ── Graticule ──
  const lats = [-60,-45,-30,-15,0,15,30,45,60,75].map(lat => {
    const c: [number,number][] = [];
    for (let ln = -180; ln <= 180; ln += 2) c.push([lat, ln]);
    return toPath(c);
  });
  const lons = [-150,-120,-90,-60,-30,0,30,60,90,120,150,180].map(lon => {
    const c: [number,number][] = [];
    for (let lt = -90; lt <= 90; lt += 2) c.push([lt, lon]);
    return toPath(c);
  });

  // ── Continent outlines (high density for stippled detail) ──
  const africa: [number,number][] = [
    [35.8,-5.8],[36,-4],[36,-2],[36,0],[36.5,1],[36.8,3],[37,5],[37.5,8],[37,10],
    [36,11],[35,11],[34,11],[33,13],[32.5,14],[32,15],[31.8,17],[31.5,18],[31.5,20],
    [31.5,22],[31.5,24],[31.5,25],[31,27],[30.5,29],[30,31],[30,32.5],
    [29,33],[28,33],[27,34],[26,35],[25,36],[24,35.5],[23,36],[22,36.5],
    [21,37],[20,38],[19,38.5],[18,38],[17,39],[16,40],[15,42],[14,42.5],
    [13,43],[12.5,43.5],[12,44],[11.5,45],[11,46],[11,47],[11.5,49],[11.5,50],
    [11.5,51],[10.5,51],[9,50],[8,48],[6,46],[4,45],[2,45],[1,44],
    [0,43],[-0.5,42],[-1,41],[-2,41],[-3,40],[-4,39.5],[-5,39.5],
    [-6,39.5],[-7,39.5],[-8,39.5],[-9,40],[-10,40],[-11,40],[-12,40.5],
    [-13,40.5],[-14,40.5],[-15,40.5],[-16,39],[-17,38],[-18,38],
    [-19,36],[-20,35],[-21,35],[-23,35.5],[-25,35],[-27,33],[-28,32],
    [-30,31],[-31,30],[-32,29],[-33,28],[-33.5,27],[-34,26],[-34.5,24],
    [-34.5,22],[-34.5,20],[-34,19],[-34,18],[-33,18],[-32,17.5],
    [-31,17.5],[-30,17],[-29,16],[-28,15],[-27,15],[-25,14.5],[-24,14],
    [-22,14],[-20,13.5],[-19,13],[-17,12],[-16,12],[-15,12],[-13,12.5],
    [-12,13.5],[-11,13],[-10,13],[-9,13],[-8,13],[-7,12.5],[-6,12],
    [-5,11.5],[-4,11],[-3,10],[-2,10],[-1,9],[0,9.5],[1,9.5],[2,9.5],
    [3,9.5],[4,9],[4.5,8],[5,7],[5.5,6],[6,5],[6,3],[6,2],[6,1],
    [5.5,0],[5,-1],[5,-2],[5,-3],[5,-4],[5,-5],[5.5,-5.5],[6,-6],
    [6.5,-7],[7,-8],[7,-9],[7.5,-10],[8,-12],[8,-13],[8.5,-13.5],
    [9,-14],[10,-15],[11,-15.5],[12,-16],[12.5,-16.5],[13,-16.5],
    [14,-17],[14.5,-17],[15.5,-17],[16,-16.5],[17,-16],[18,-16],
    [19.5,-17],[21,-17],[22.5,-16.5],[24,-16],[25.5,-15],[26,-14.5],
    [27,-14],[28,-13],[29,-11],[30,-10],[30.5,-9],[31,-8],[31.5,-6],
    [32,-5],[33,-5],[34,-5],[35,-5.5],[35.8,-5.8],
  ];
  const britain: [number,number][] = [
    [50,-5.5],[50.3,-5],[50.5,-4],[50.7,-3.5],[51,-3],[51,-2],[51.2,-1],
    [51.3,0],[51.5,1],[51.8,1.5],[52,1.5],[52.5,1.3],[52.8,1],[53,0.5],
    [53,0],[53.3,-0.3],[53.5,-0.5],[53.8,-0.8],[54,-1],[54.3,-1.3],
    [54.5,-1.5],[54.8,-1.5],[55,-1.5],[55.3,-1.8],[55.5,-2],[55.8,-2.5],
    [56,-3],[56.5,-3],[57,-2],[57.3,-2],[57.5,-3],[57.5,-4],[57.8,-3.5],
    [58,-3],[58.3,-3],[58.5,-3],[58.6,-4],[58.5,-5],[58.3,-5.5],
    [58,-5.5],[57.5,-6],[57,-6],[56.8,-5.8],[56.5,-5.5],[56,-5],
    [55.8,-5],[55.5,-5],[55,-4.5],[54.8,-4],[54.5,-3.5],[54.3,-3.3],
    [54,-3],[53.8,-3.2],[53.5,-3],[53.3,-3.3],[53,-3.5],[52.8,-3.8],
    [52.5,-4],[52.3,-4.3],[52,-4.5],[51.8,-4.8],[51.5,-5],[51.3,-5],
    [51,-5],[50.5,-5.3],[50,-5.5],
  ];
  const ireland: [number,number][] = [
    [55.3,-6],[55.2,-6.5],[55,-7],[54.8,-7.5],[54.5,-8],[54.3,-9],
    [54,-9.5],[53.7,-10],[53.5,-10],[53.2,-10.3],[53,-10],[52.7,-10.3],
    [52.5,-10.5],[52.2,-10.3],[52,-10],[51.8,-9.8],[51.5,-9.5],
    [51.6,-9],[51.8,-8.5],[52,-7.5],[52,-7],[52.3,-6.8],[52.5,-6.5],
    [52.8,-6.3],[53,-6],[53.3,-6],[53.5,-6],[53.8,-6],[54,-6],
    [54.5,-6],[55,-6],[55.3,-6],
  ];
  const iberia: [number,number][] = [
    [43.5,-8],[43.2,-8.3],[43,-8.5],[42.8,-8.8],[42.5,-9],[42,-9],
    [41,-9],[40,-9.3],[39.5,-9.5],[39,-9.3],[38.5,-9],[38,-9],
    [37.5,-9],[37,-9],[36.8,-8],[36.5,-7],[36.3,-6.5],[36,-6],
    [36.2,-5.5],[36.5,-5],[36.8,-4],[37,-3],[37,-2],[37.3,-1.5],
    [37.5,-1],[38,-0.5],[38.5,0],[39,0],[39.5,0],[40,0.5],[40.5,1],
    [41,1],[41.5,2],[42,2.5],[42,3],[43,3],[43.2,2],[43.3,1],
    [43.5,0],[43.5,-1],[43.5,-2],[43.5,-3],[43.5,-5],[43.5,-6],
    [43.5,-7],[43.5,-8],
  ];
  const italy: [number,number][] = [
    [44,7.5],[44.3,8],[44.5,8],[45,7.5],[45.5,7],[46,7],[46,8],
    [46,10],[46,12],[45.5,13],[45,12.5],[44.5,12],[44.3,12.5],
    [44,12.5],[43.8,13],[43.5,13.5],[43.2,13.8],[43,14],[42.5,14],
    [42,14],[41.8,15],[41.5,15],[41,16],[40.8,16.5],[40.5,17],
    [40.3,17.5],[40,18],[39.8,18],[39.5,18],[39.3,17.5],[39,17],
    [38.8,16.5],[38.5,16],[38.3,16],[38,16],[37.8,15.5],[37.5,15.5],
    [37.8,14],[38,13],[38.3,12.5],[38.5,11],[39,9],[39.5,9],
    [40,9],[40.5,9.3],[41,9.5],[41.5,9.8],[42,10],[42.5,10],
    [43,10],[43.5,10],[43.8,9],[44,7.5],
  ];
  const sicily: [number,number][] = [
    [38.5,13],[38.2,13.3],[38,13.5],[37.8,13.3],[37.5,13],[37.3,13.5],
    [37,14],[37.2,14.5],[37.5,15],[37.8,15.3],[38,15.5],[38.3,14],[38.5,13],
  ];
  const scandinavia: [number,number][] = [
    [55,10],[55.5,11],[56,12],[56.5,11.5],[57,11],[57.5,11],[58,11],
    [58.5,11],[59,10.5],[59.5,8],[60,5],[60.5,5],[61,5],[61.5,5.5],
    [62,6],[62.5,7],[63,8],[63.5,9],[64,10],[64.5,11],[65,12],
    [65.5,13],[66,14],[67,14.5],[68,15],[68.5,16],[69,18],[69.5,19],
    [70,20],[70.3,22],[70.5,25],[71,28],[70.8,29],[70.5,30],
    [70,30],[69,30],[68.5,29],[68,28],[67.5,27],[67,26],[66.5,26],
    [66,26],[65,27],[64,28],[63,28],[62,28],[61,27],[60,25],
    [60,23],[60,22],[59.5,21],[59,20],[58.5,19],[58,18],[57.5,17],
    [57,16],[56.5,15],[56,14],[55.5,12],[55,10],
  ];
  const balkans: [number,number][] = [
    [46,14],[45.5,15],[45,16],[45,18],[45,20],[44.5,21],[44,22],
    [43.5,22.5],[43,23],[42.5,23.5],[42,24],[41.5,24],[41,24],
    [40.5,24],[40,24],[39.5,23.5],[39,23.5],[38.5,24],[38,24],
    [37.5,23],[37,22],[36.7,22.5],[36.5,23],[36.8,24],[37,25],
    [37.5,25.5],[38,26],[38.5,26],[39,26],[39.5,26],[40,26],
    [40.5,27],[41,29],[41.5,29],[42,28],[42.5,28],[43,28],
    [43.5,28],[44,28],[44.5,27.5],[45,27],[45.5,26],[46,24],
    [46,22],[46,20],[46,18],[46,16],[46,14],
  ];
  const greece: [number,number][] = [
    [39,23],[38.5,22],[38,22],[37.5,21.5],[37,22],[36.5,22.5],
    [36,22.5],[35.5,24],[35.5,25],[36,25.5],[37,24],[38,24],[39,23],
  ];
  const crete: [number,number][] = [
    [35.5,24],[35.3,24.5],[35,25],[35.2,26],[35.5,26],[35.5,25.5],[35.5,24],
  ];
  const arabia: [number,number][] = [
    [30,32.5],[29.5,33],[29,33.5],[28.5,34],[28,34],[27.5,34.5],
    [27,35],[26,36],[25,37],[24,36.5],[23,36],[22,37],[21,38],
    [20,39],[19,39.5],[18,40],[17,41],[16,41.5],[15,42],[14,42.5],
    [13,43],[12.5,43.5],[12,44],[12.5,45.5],[13,47],[13.5,48],
    [14,49],[15,50],[16,51],[17,52],[18,53],[19,54.5],[20,56],
    [21,57.5],[22,59],[22.5,58.5],[23,58],[23.5,57],[24,56],
    [24.5,55.5],[25,55],[25.5,54],[26,52],[26,51],[26.5,50.5],
    [27,50],[27.5,49.5],[28,49],[28.5,48.5],[29,48],[29.5,48],
    [30,48],[30.5,47.5],[31,47],[31.5,46],[32,45],[32.5,43],
    [33,40],[33,38],[33,36],[32.5,35.5],[32,35],[31.5,34.5],
    [31,34],[30.5,33],[30,32.5],
  ];
  const madagascar: [number,number][] = [
    [-12,49],[-13,48.5],[-14,48],[-15,47.5],[-16,47],[-17,46],
    [-18,45],[-19,44.5],[-20,44],[-21.5,44],[-23,44],[-24.5,44],
    [-25,44],[-25,45],[-25,46],[-24,46.5],[-23,47],[-22,48],
    [-20,49],[-19,49.5],[-18,50],[-17,50],[-16,50],[-15,49.8],
    [-14,49.5],[-13,49.2],[-12,49],
  ];

  const continents = [africa, britain, ireland, iberia, italy, sicily, scandinavia, balkans, greece, crete, arabia, madagascar];

  // ── Geodesic mesh nodes (scattered across visible globe) ──
  const meshNodes: [number,number][] = [
    [60,-20],[55,-15],[50,-25],[45,-20],[40,-15],[35,-20],[30,-25],
    [65,0],[55,5],[50,15],[45,25],[40,30],[35,35],[30,40],
    [60,30],[55,40],[50,50],[45,55],[40,45],[35,50],
    [25,10],[20,20],[15,30],[10,20],[5,15],[0,25],[-5,20],
    [-10,30],[-15,25],[-20,20],[-25,25],[-30,20],[-35,25],
    [25,45],[20,50],[15,35],[10,40],[5,35],[0,30],
    [-5,35],[-10,45],[-15,50],[-20,40],[-25,30],[-30,15],
    [70,15],[65,35],[60,50],[55,55],[50,60],
    [20,-10],[15,-5],[10,5],[5,-10],[0,-5],[-5,5],[-10,0],
  ];

  // Build mesh triangulation (connect nearby nodes)
  const meshLines: [number, number][] = [];
  const projMesh = meshNodes.map(([a,b]) => proj(a,b));
  for (let i = 0; i < projMesh.length; i++) {
    if (!projMesh[i].v) continue;
    for (let j = i+1; j < projMesh.length; j++) {
      if (!projMesh[j].v) continue;
      const dx = projMesh[i].x - projMesh[j].x;
      const dy = projMesh[i].y - projMesh[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120 && dist > 30) meshLines.push([i, j]);
    }
  }

  // ── City nodes ──
  const cities = [
    { lat: 51.5, lon: -0.1, r: 4, primary: true },
    { lat: 6.5, lon: 3.4, r: 3.5, primary: true },
    { lat: -1.3, lon: 36.8, r: 3 },
    { lat: 25.2, lon: 55.3, r: 3 },
    { lat: 5.6, lon: -0.2, r: 2.5 },
  ].map(c => ({ ...c, ...proj(c.lat, c.lon) }));

  // ── Connection arcs ──
  const arcPath = (c1: typeof cities[0], c2: typeof cities[0]) => {
    if (!c1.v || !c2.v) return "";
    const mx = (c1.x + c2.x) / 2, my = (c1.y + c2.y) / 2;
    const dx = c2.x - c1.x, dy = c2.y - c1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / dist, ny = dx / dist;
    const lift = dist * 0.18;
    return `M${c1.x.toFixed(1)},${c1.y.toFixed(1)} Q${(mx + nx * lift).toFixed(1)},${(my + ny * lift).toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)}`;
  };
  const connections = [[0,1],[0,2],[0,3],[1,4],[1,2]];

  return (
    <div
      className="absolute -right-[180px] md:-right-[100px] -top-[20px] w-[820px] h-[820px] hidden lg:block pointer-events-none opacity-0"
      style={{ animation: "heroFadeUp 1.8s cubic-bezier(0.16,1,0.3,1) 500ms forwards" }}
    >
      <svg viewBox="0 0 900 850" className="w-full h-full" fill="none">
        <defs>
          <clipPath id="globe-clip"><circle cx={CX} cy={CY} r={R} /></clipPath>
          <radialGradient id="globe-shading" cx="40%" cy="35%">
            <stop offset="0%" stopColor="white" stopOpacity="0.03" />
            <stop offset="100%" stopColor={col} stopOpacity="0.04" />
          </radialGradient>
        </defs>

        {/* Sphere silhouette */}
        <circle cx={CX} cy={CY} r={R} stroke={col} strokeWidth="1.2" opacity="0.2" fill="none" />
        <circle cx={CX} cy={CY} r={R} fill="url(#globe-shading)" />

        <g clipPath="url(#globe-clip)">

          {/* Graticule — latitude */}
          {lats.map((d, i) => d && (
            <path key={`lat${i}`} d={d} stroke={col} strokeWidth="0.5" opacity="0.1" />
          ))}

          {/* Graticule — longitude */}
          {lons.map((d, i) => d && (
            <path key={`lon${i}`} d={d} stroke={col} strokeWidth="0.5" opacity="0.08" />
          ))}

          {/* Continent fills */}
          {continents.map((c, i) => {
            const d = toPath(c, true);
            return d ? <path key={`fill${i}`} d={d} fill={col} opacity="0.12" stroke="none" /> : null;
          })}

          {/* Continent outlines — stippled coastlines */}
          {continents.map((c, i) => {
            const d = toPath(c, true);
            return d ? (
              <path
                key={`coast${i}`} d={d}
                stroke={col} strokeWidth="1.5" fill="none" opacity="0.45"
                strokeDasharray="1.5 2" strokeLinecap="round"
              />
            ) : null;
          })}

          {/* Connection arcs */}
          {connections.map(([a, b], i) => {
            const d = arcPath(cities[a], cities[b]);
            return d ? (
              <path
                key={`conn${i}`} d={d}
                stroke={colLight} strokeWidth="1" fill="none" opacity="0.3"
                strokeDasharray="6 4" strokeLinecap="round"
              />
            ) : null;
          })}

          {/* Geodesic mesh lines */}
          {meshLines.map(([a, b], i) => {
            const p1 = projMesh[a], p2 = projMesh[b];
            return (
              <line
                key={`mesh${i}`}
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={col} strokeWidth="0.4" opacity="0.1"
              />
            );
          })}

          {/* Mesh nodes (small dots) */}
          {projMesh.filter(p => p.v).map((p, i) => (
            <circle key={`mn${i}`} cx={p.x} cy={p.y} r={1.5} fill={col} opacity="0.15" />
          ))}

          {/* City nodes */}
          {cities.filter(c => c.v).map((c, i) => (
            <g key={`city${i}`}>
              <circle cx={c.x} cy={c.y} r={c.r * 3} fill={colLight} opacity="0.06" />
              <circle cx={c.x} cy={c.y} r={c.r} fill={col} opacity="0.6" />
              <circle cx={c.x} cy={c.y} r={c.r * 0.4} fill="white" opacity="0.6" />
              {c.primary && (
                <circle cx={c.x} cy={c.y} r={c.r + 2} stroke={colLight} strokeWidth="0.6" fill="none" opacity="0.2">
                  <animate attributeName="r" values={`${c.r + 2};${c.r + 8};${c.r + 2}`} dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0.03;0.2" dur="4s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

/* ── Hero ── */
const HeroV3 = () => {
  return (
    <section className="bg-white relative overflow-hidden">
      {/* Keyframes — injected once */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroHighlight {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes heroPhotoReveal {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dashCardSlide {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sparkDraw {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,231,195,0.3); }
          50% { box-shadow: 0 0 20px 4px rgba(0,231,195,0.15); }
        }
        /* Flying blocks — spawn from boost, travel right */
        @keyframes blockFly1 {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.4); }
          15%  { opacity: 1; transform: translate(80px, -10px) scale(1); }
          100% { opacity: 0.85; transform: translate(min(55vw, 700px), -60px) scale(1); }
        }
        @keyframes blockFly2 {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.3); }
          15%  { opacity: 1; transform: translate(60px, 5px) scale(1); }
          100% { opacity: 0.65; transform: translate(min(45vw, 580px), 30px) scale(1); }
        }
        @keyframes blockFly3 {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.3); }
          15%  { opacity: 0.9; transform: translate(100px, -5px) scale(1); }
          100% { opacity: 0.5; transform: translate(min(65vw, 850px), -20px) scale(1); }
        }
        @keyframes blockFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes globeFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-12px) rotate(2deg); }
        }
      `}</style>

      {/* Editorial grid background — subtle */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #15171A 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 pt-16 md:pt-24 pb-0 relative">
        {/* Animated globe — right side */}
        <GlobeV3 />

        {/* Overline — entrance 1 */}
        <div
          className="flex items-center gap-4 mb-8 opacity-0"
          style={{
            animation:
              "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 100ms forwards",
          }}
        >
          <div className="w-12 h-[2px] bg-[#00E7C3]" />
          <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
            Advisory · Fund · Community
          </span>
        </div>

        {/* Headline — entrance 2 (line by line) */}
        <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold text-[#15171A] leading-[0.95] max-w-[950px] tracking-[-0.03em]" style={{ fontFamily: "'Sora', sans-serif" }}>
          <span
            className="block opacity-0"
            style={{
              animation:
                "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 250ms forwards",
            }}
          >
            Grow, scale &amp;
          </span>
          <span
            className="block opacity-0"
            style={{
              animation:
                "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 400ms forwards",
            }}
          >
            <span className="relative inline-block">
              <span className="relative z-10 text-[#15171A]">boost</span>
              {/* Animated gradient highlight */}
              <span
                className="absolute bottom-[0.05em] left-[-4px] right-[-4px] h-[0.45em] -z-0 rounded-sm"
                style={{
                  background: "linear-gradient(90deg, #00E7C3 0%, #00d4b3 60%, #00E7C3 100%)",
                  opacity: 0.3,
                  animation:
                    "heroHighlight 0.8s cubic-bezier(0.16,1,0.3,1) 800ms forwards",
                  width: 0,
                }}
              />
            </span>{" "}
            the UK
          </span>
          <span
            className="block opacity-0"
            style={{
              animation:
                "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 550ms forwards",
            }}
          >
            economy
          </span>
        </h1>

        {/* Sub-copy + CTA — entrance 3 */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-12 gap-8 lg:gap-16 opacity-0"
          style={{
            animation:
              "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 700ms forwards",
          }}
        >
          <p className="text-[17px] text-gray-500 max-w-[440px] leading-[1.7]">
            Supporting diasporic communities, founders and businesses to access
            increased investment, funding and networking opportunities, so they
            can scale locally, nationally and globally.
          </p>

          <a
            href="/auth"
            className="inline-flex items-center gap-3 bg-[#15171A] text-[#00E7C3] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#2a2d32] transition-colors group w-fit"
          >
            Get Started
            <span className="w-8 h-8 rounded-full bg-[#00E7C3]/10 flex items-center justify-center group-hover:bg-[#00E7C3]/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>

        {/* Stat bar — staggered entrance + counter animation */}
        <div className="mt-14 flex flex-wrap items-baseline gap-x-12 gap-y-4 border-t border-gray-200 pt-8">
          {[
            { num: "£74bn", label: "Added to the UK economy a year" },
            { num: "17%", label: "Of UK businesses are minority-led" },
            { num: "3M", label: "People employed" },
          ].map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              num={stat.num}
              label={stat.label}
              delay={900 + i * 120}
            />
          ))}
        </div>
      </div>

      {/* Photo Strip — staggered reveal */}
      <div className="relative z-10 -mb-28 md:-mb-36 mt-14">
        <div className="grid grid-cols-12 gap-3 px-3 md:px-6">
          <div
            className="col-span-12 md:col-span-7 rounded-2xl overflow-hidden h-[300px] md:h-[480px] group opacity-0 relative"
            style={{
              animation:
                "heroPhotoReveal 1s cubic-bezier(0.16,1,0.3,1) 1100ms forwards",
            }}
          >
            <div className="w-full h-full">
              <img
                src={heroPortrait}
                alt="Diaspora investor overlooking the City of London"
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: 'scale(1.15) translateY(-28%)', transformOrigin: 'top center' }}
              />
            </div>
            {/* Editorial text overlay — top-left for visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
            <div className="absolute top-5 left-5 right-5 md:top-8 md:left-8">
              <div className="text-[10px] font-semibold tracking-[4px] uppercase text-[#00E7C3] font-sans mb-2">
                Grow
              </div>
              <div className="w-10 h-[2px] bg-[#00E7C3] mb-3" />
              <p className="font-serif text-[18px] md:text-[24px] text-white leading-[1.3] max-w-[360px]">
                Where ambition meets{" "}
                <em className="not-italic text-[#00E7C3]">opportunity</em>
              </p>
            </div>

          </div>
          <div
            className="col-span-6 md:col-span-3 rounded-2xl overflow-hidden h-[200px] md:h-[480px] opacity-0 relative bg-[#F5F0E8] flex flex-col items-center justify-start"
            style={{
              animation:
                "heroPhotoReveal 1s cubic-bezier(0.16,1,0.3,1) 1300ms forwards",
            }}
          >
            {/* Ascending Path — teal path narrowing upward */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 300 480"
              preserveAspectRatio="xMidYMax slice"
            >
              <polygon points="90,480 210,480 165,30 135,30" fill="#2A9D8F" opacity="0.35" />
              <polygon points="110,480 190,480 160,50 140,50" fill="#2A9D8F" opacity="0.55" />
            </svg>
            {/* Glow at top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#2A9D8F]/30 rounded-full blur-[24px]" />
            {/* Editorial quote + text — top-aligned so visible above fold */}
            <div className="relative z-10 pt-5 pl-5 pr-5 md:pt-8 md:pl-8 flex flex-col items-start">
              <div className="text-[10px] font-semibold tracking-[4px] uppercase text-[#2A9D8F] font-sans mb-2">
                Scale
              </div>
              <div className="w-10 h-[2px] bg-[#2A9D8F] mb-3" />
              <p className="font-serif text-[18px] md:text-[24px] text-[#15171A] leading-[1.3] max-w-[220px]">
                Your capital,{" "}
                <em className="not-italic text-[#2A9D8F]">deployed</em> with
                purpose.
              </p>
            </div>
          </div>
          <div
            className="col-span-6 md:col-span-2 rounded-2xl overflow-hidden h-[200px] md:h-[480px] group relative opacity-0"
            style={{
              animation:
                "heroPhotoReveal 1s cubic-bezier(0.16,1,0.3,1) 1500ms forwards",
            }}
          >
            <div className="w-full h-full">
              <img
                src={heroManchester}
                alt="Entrepreneur in Manchester"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            {/* Editorial text overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
            <div className="absolute top-5 left-5 right-5 md:top-8 md:left-8">
              <div className="text-[10px] font-semibold tracking-[4px] uppercase text-[#00E7C3] font-sans mb-2">
                Boost
              </div>
              <div className="w-10 h-[2px] bg-[#00E7C3] mb-3" />
              <p className="font-serif text-[18px] md:text-[24px] text-white leading-[1.3]">
                Build across{" "}
                <em className="not-italic text-[#00E7C3]">borders</em>
              </p>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[9px] font-semibold tracking-[2px] uppercase text-white/60 drop-shadow-lg">
                Manchester · London · Lagos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroV3;
