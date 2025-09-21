"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AvatarFrame from "./AvatarFrame";

type Props = {
  url?: string;
  className?: string;
};

const DynamicHero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <AvatarFrame sizeClass="size-44 md:size-64" />,
});

export default function Hero3DClient(props: Props) {
  const [shouldRender3D, setShouldRender3D] = useState(false);
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    type NavExtras = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const nav = navigator as NavExtras;
    const saveData = nav.connection?.saveData === true;
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
    // Render 3D unless user explicitly saves data or on very low-memory devices
    setShouldRender3D(!(saveData || (isMobile && lowMem)));
  }, []);

  if (!shouldRender3D) return <AvatarFrame sizeClass="size-44 md:size-64" />;
  return <DynamicHero3D {...props} />;
}
