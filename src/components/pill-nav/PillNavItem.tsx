import Link from "next/link";
import type { PillNavItem as NavItem } from "@/types/pill-nav";

type Props = {
  item: NavItem;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

export default function PillNavItem({ item, active, onEnter, onLeave }: Props) {
  return (
    <li>
      <Link
        href={item.href}
        className={`pill${active ? " is-active" : ""}`}
        aria-label={item.ariaLabel || item.label}
        aria-current={active ? "page" : undefined}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
      >
        <span className="hover-circle" aria-hidden="true" />
        <span className="label-stack">
          <span className="pill-label">{item.label}</span>
          <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
        </span>
      </Link>
    </li>
  );
}
