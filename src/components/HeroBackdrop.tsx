export default function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 left-[45%] -z-10 hidden overflow-hidden lg:block"
    >
      <div className="absolute -inset-y-12 -right-12 left-6 bg-[linear-gradient(100deg,transparent_5%,#213d65_23%,#98402f_40%,#e7a541_58%,#a6463a_73%,#334f82_90%)] opacity-75 blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-background/15" />
    </div>
  );
}
