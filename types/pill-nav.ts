export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type PillNavProps = {
  logo?: string;
  logoAlt?: string;
  brandName?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
};
