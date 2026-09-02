import { useEffect, useRef, useCallback } from "react";
import Globe from "react-globe.gl";

/* ── Connection arcs: UK hub → diaspora cities ──
   London and Manchester are the hubs. Africa and the USA are the two corridors
   the board asked to see weighted (2026-09-02). */
const ARCS = [
  // UK → Africa
  { startLat: 51.5, startLng: -0.1, endLat: 6.5, endLng: 3.4 },     // London → Lagos
  { startLat: 51.5, startLng: -0.1, endLat: 9.1, endLng: 7.4 },     // London → Abuja
  { startLat: 51.5, startLng: -0.1, endLat: -1.3, endLng: 36.8 },   // London → Nairobi
  { startLat: 51.5, startLng: -0.1, endLat: 5.6, endLng: -0.2 },    // London → Accra
  { startLat: 51.5, startLng: -0.1, endLat: -26.2, endLng: 28.0 },  // London → Johannesburg
  { startLat: 51.5, startLng: -0.1, endLat: -33.9, endLng: 18.4 },  // London → Cape Town
  { startLat: 53.5, startLng: -2.2, endLat: 6.5, endLng: 3.4 },     // Manchester → Lagos
  { startLat: 53.5, startLng: -2.2, endLat: -33.9, endLng: 18.4 },  // Manchester → Cape Town
  { startLat: 6.5, startLng: 3.4, endLat: -1.3, endLng: 36.8 },     // Lagos → Nairobi
  { startLat: 6.5, startLng: 3.4, endLat: -33.9, endLng: 18.4 },    // Lagos → Cape Town
  // UK → USA
  { startLat: 51.5, startLng: -0.1, endLat: 40.7, endLng: -74.0 },  // London → New York
  { startLat: 51.5, startLng: -0.1, endLat: 34.1, endLng: -118.2 }, // London → Los Angeles
  { startLat: 51.5, startLng: -0.1, endLat: 29.8, endLng: -95.4 },  // London → Houston
  { startLat: 53.5, startLng: -2.2, endLat: 40.7, endLng: -74.0 },  // Manchester → New York
  // Corridor closes the triangle: USA ↔ Africa
  { startLat: 40.7, startLng: -74.0, endLat: 6.5, endLng: 3.4 },    // New York → Lagos
  { startLat: 29.8, startLng: -95.4, endLat: 5.6, endLng: -0.2 },   // Houston → Accra
  // Caribbean leg. These exist to carry ink across the lower-left of the disc,
  // which was bare in every frame of the cycle, and they are honest routes
  // rather than decoration: the Caribbean diaspora is core to the remit.
  { startLat: 40.7, startLng: -74.0, endLat: 18.0, endLng: -76.8 }, // New York → Kingston
  { startLat: 18.0, startLng: -76.8, endLat: 5.6, endLng: -0.2 },   // Kingston → Accra
  { startLat: 34.1, startLng: -118.2, endLat: 40.7, endLng: -74.0 },// Los Angeles → New York
  { startLat: -26.2, startLng: 28.0, endLat: -1.3, endLng: 36.8 },  // Johannesburg → Nairobi
  // Rest of world
  { startLat: 51.5, startLng: -0.1, endLat: 25.2, endLng: 55.3 },   // London → Dubai
  { startLat: 51.5, startLng: -0.1, endLat: 18.0, endLng: -76.8 },  // London → Kingston
].map((a, i) => ({
  // Stagger each arc's starting position in the dash cycle. Every arc shared one
  // animate time, so all eighteen travelled in lockstep and hit the London hub
  // together, which is what read as a hairball rather than a network.
  ...a,
  gap: (i * 0.37) % 1,
}));

/* ── City markers — larger, bolder ── */
const POINTS = [
  { lat: 51.5, lng: -0.1, size: 0.7, color: "#00E7C3" },     // London
  { lat: 53.5, lng: -2.2, size: 0.45, color: "#00E7C3" },    // Manchester
  { lat: 6.5, lng: 3.4, size: 0.6, color: "#00E7C3" },       // Lagos
  { lat: 9.1, lng: 7.4, size: 0.4, color: "#00E7C3" },       // Abuja
  { lat: -1.3, lng: 36.8, size: 0.45, color: "#00E7C3" },    // Nairobi
  { lat: 25.2, lng: 55.3, size: 0.4, color: "#00E7C3" },     // Dubai
  { lat: 5.6, lng: -0.2, size: 0.4, color: "#00E7C3" },      // Accra
  { lat: -26.2, lng: 28.0, size: 0.4, color: "#00E7C3" },    // Johannesburg
  { lat: -33.9, lng: 18.4, size: 0.5, color: "#00E7C3" },    // Cape Town
  { lat: 18.0, lng: -76.8, size: 0.35, color: "#00E7C3" },   // Kingston
  { lat: 40.7, lng: -74.0, size: 0.6, color: "#00E7C3" },    // New York
  { lat: 34.1, lng: -118.2, size: 0.5, color: "#00E7C3" },   // Los Angeles
  { lat: 29.8, lng: -95.4, size: 0.45, color: "#00E7C3" },   // Houston
];

/* ── Ring pulses — the anchor cities on each corridor ── */
const RINGS = [
  { lat: 51.5, lng: -0.1, maxR: 4, propagationSpeed: 1.5, repeatPeriod: 1400 },     // London
  { lat: 6.5, lng: 3.4, maxR: 3.5, propagationSpeed: 1.5, repeatPeriod: 1800 },     // Lagos
  { lat: 40.7, lng: -74.0, maxR: 3.5, propagationSpeed: 1.5, repeatPeriod: 1600 },  // New York
  { lat: -33.9, lng: 18.4, maxR: 3, propagationSpeed: 1.5, repeatPeriod: 2600 },    // Cape Town
  { lat: -1.3, lng: 36.8, maxR: 3, propagationSpeed: 1.5, repeatPeriod: 2200 },     // Nairobi
  { lat: 25.2, lng: 55.3, maxR: 2.5, propagationSpeed: 1.5, repeatPeriod: 2000 },   // Dubai
  { lat: -26.2, lng: 28.0, maxR: 2.5, propagationSpeed: 1.5, repeatPeriod: 2400 },  // Johannesburg
  { lat: 34.1, lng: -118.2, maxR: 2.5, propagationSpeed: 1.5, repeatPeriod: 2100 }, // Los Angeles
];

const GLOBE_SIZE = 520;

/* ── Camera ──
   Centred so the London hub sits inside the disc rather than up against the
   right limb, which is what made the arcs look like they were spilling off the
   edge. At altitude 2.1 roughly 80 degrees of longitude either side of centre
   is visible, so centring on -30 keeps Houston and New York on the left,
   London and Lagos through the middle, and Cape Town and Nairobi on the right.
   Latitude 15 sits between London at 51.5N and Cape Town at 33.9S so neither
   is pushed to a pole. */
const VIEW_LAT = 15;
const VIEW_LNG = -30;
const SWAY_DEGREES = 18; // never enough to bring the empty Pacific into frame
const SWAY_PERIOD_MS = 44000;

const GlobeV3 = () => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  const setupGlobe = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.pointOfView({ lat: VIEW_LAT, lng: VIEW_LNG, altitude: 2.1 }, 0);

    // FREE ROTATION IS OFF, DELIBERATELY. Every node on this globe sits in one
    // Atlantic band — the Americas, the UK, Africa — so a full 360 spin spends
    // half its cycle showing empty Pacific with the arcs bunched off the limb.
    // That is exactly what it did: autoRotate meant the framing set above was
    // only a starting position, and a minute later the hero was a black sphere.
    // Replaced with a bounded sway that never leaves the populated face.
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = false;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;
    }

    // Transparent background
    const renderer = globe.renderer();
    if (renderer) {
      renderer.setClearColor(0x000000, 0);
    }

    // Lighting: enough to read continents clearly on white bg
    const scene = globe.scene();
    if (scene) {
      scene.children.forEach((child: any) => {
        if (child.type === "DirectionalLight") {
          child.intensity = 1.6;
          child.position.set(5, 3, 5);
        }
        if (child.type === "AmbientLight") {
          child.intensity = 2.2;
        }
      });
    }

    // The bounded sway. A slow sine on longitude only, so the globe still feels
    // alive but the camera is mathematically incapable of leaving the corridor:
    // longitude stays within VIEW_LNG +/- SWAY_DEGREES, i.e. -48 to -12.
    const start = performance.now();
    const step = (now: number) => {
      const phase = ((now - start) % SWAY_PERIOD_MS) / SWAY_PERIOD_MS;
      const lng = VIEW_LNG + SWAY_DEGREES * Math.sin(phase * 2 * Math.PI);
      globe.pointOfView({ lat: VIEW_LAT, lng, altitude: 2.1 }, 0);
      frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const timer = setTimeout(setupGlobe, 100);
    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [setupGlobe]);

  return (
    <div
      ref={containerRef}
      className="absolute -right-[60px] md:-right-[30px] top-[20px] hidden lg:block pointer-events-auto"
      style={{
        width: `${GLOBE_SIZE}px`,
        height: `${GLOBE_SIZE}px`,
        opacity: 0,
        animation: "heroFadeUp 1.8s cubic-bezier(0.16,1,0.3,1) 500ms forwards",
      }}
    >
      <Globe
        ref={globeRef}
        width={GLOBE_SIZE}
        height={GLOBE_SIZE}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#00E7C3"
        atmosphereAltitude={0.18}
        // Arcs — refined, deliberate, animated
        arcsData={ARCS}
        arcColor={() => ["rgba(0,231,195,0.85)", "rgba(0,212,179,0.6)"]}
        arcStroke={0.9}
        arcDashLength={0.5}
        arcDashGap={0.3}
        arcDashInitialGap={(d: any) => d.gap}
        arcDashAnimateTime={4200}
        arcAltitudeAutoScale={0.22}
        // Points — bold city nodes
        pointsData={POINTS}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.015}
        pointRadius="size"
        pointColor="color"
        pointsMerge={true}
        // Rings — pulse activity across the network
        ringsData={RINGS}
        ringLat="lat"
        ringLng="lng"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        ringColor={() => (t: number) => `rgba(0, 231, 195, ${1 - t})`}
        ringAltitude={0.003}
      />
    </div>
  );
};

export default GlobeV3;
