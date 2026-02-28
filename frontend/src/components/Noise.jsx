// Noise.jsx
export const NoiseFilter = () => (
  <svg className="hidden">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
    </filter>
  </svg>
);
