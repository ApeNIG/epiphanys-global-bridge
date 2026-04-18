import { useEffect, useRef, useCallback } from "react";
import Globe from "react-globe.gl";

/* ── Connection arcs: UK hub → diaspora cities ── */
const ARCS = [
  { startLat: 51.5, startLng: -0.1, endLat: 6.5, endLng: 3.4 },
  { startLat: 51.5, startLng: -0.1, endLat: -1.3, endLng: 36.8 },
  { startLat: 51.5, startLng: -0.1, endLat: 25.2, endLng: 55.3 },
  { startLat: 51.5, startLng: -0.1, endLat: 5.6, endLng: -0.2 },
  { startLat: 53.5, startLng: -2.2, endLat: 6.5, endLng: 3.4 },
  { startLat: 6.5, startLng: 3.4, endLat: -1.3, endLng: 36.8 },
  { startLat: 51.5, startLng: -0.1, endLat: -26.2, endLng: 28.0 },
  { startLat: 51.5, startLng: -0.1, endLat: 18.0, endLng: -76.8 },
];

/* ── City markers — larger, bolder ── */
const POINTS = [
  { lat: 51.5, lng: -0.1, size: 0.7, color: "#00E7C3" },
  { lat: 53.5, lng: -2.2, size: 0.45, color: "#00E7C3" },
  { lat: 6.5, lng: 3.4, size: 0.6, color: "#00E7C3" },
  { lat: -1.3, lng: 36.8, size: 0.45, color: "#00E7C3" },
  { lat: 25.2, lng: 55.3, size: 0.4, color: "#00E7C3" },
  { lat: 5.6, lng: -0.2, size: 0.4, color: "#00E7C3" },
  { lat: -26.2, lng: 28.0, size: 0.4, color: "#00E7C3" },
  { lat: 18.0, lng: -76.8, size: 0.35, color: "#00E7C3" },
];

/* ── Ring pulses — all key cities, not just two ── */
const RINGS = [
  { lat: 51.5, lng: -0.1, maxR: 4, propagationSpeed: 1.5, repeatPeriod: 1400 },
  { lat: 6.5, lng: 3.4, maxR: 3.5, propagationSpeed: 1.5, repeatPeriod: 1800 },
  { lat: -1.3, lng: 36.8, maxR: 3, propagationSpeed: 1.5, repeatPeriod: 2200 },
  { lat: 25.2, lng: 55.3, maxR: 2.5, propagationSpeed: 1.5, repeatPeriod: 2000 },
  { lat: -26.2, lng: 28.0, maxR: 2.5, propagationSpeed: 1.5, repeatPeriod: 2400 },
];

const GLOBE_SIZE = 520;

const GlobeV3 = () => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setupGlobe = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // UK at centre, Africa visible below — the diaspora corridor
    globe.pointOfView({ lat: 38, lng: 5, altitude: 2.1 }, 0);

    // Barely-there rotation — premium feel
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.15;
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
  }, []);

  useEffect(() => {
    const timer = setTimeout(setupGlobe, 100);
    return () => clearTimeout(timer);
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
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#00E7C3"
        atmosphereAltitude={0.18}
        // Arcs — refined, deliberate, animated
        arcsData={ARCS}
        arcColor={() => ["rgba(0,231,195,0.85)", "rgba(0,212,179,0.6)"]}
        arcStroke={0.9}
        arcDashLength={0.6}
        arcDashGap={0.25}
        arcDashAnimateTime={3000}
        arcAltitudeAutoScale={0.3}
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
