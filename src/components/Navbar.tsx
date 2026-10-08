import PillNav from "@/components/pill-nav/PillNav";

const items = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6">
      <PillNav
        items={items}
        baseColor="#f5f5f5"
        pillColor="#18181b"
        pillTextColor="#f5f5f5"
        hoveredPillTextColor="#18181b"
      />
    </header>
  );
}
