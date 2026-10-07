import maps from "@/components/navbar-glass-maps.json";

/** Static optical maps: generated offline by scripts/generate_navbar_glass.py. */
export default function NavbarGlassFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        {Object.entries(maps).map(([size, map]) => (
          <filter
            key={size}
            id={`navbar-glass-${size}`}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="softenedBackdrop" />
            <feImage href={map} width="100%" height="100%" preserveAspectRatio="none" result="lens" />
            <feDisplacementMap in="softenedBackdrop" in2="lens" scale="20" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="1.25" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
