"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
  children,
  className,
}: MagicCardProps) {
  return (
    <div className={cn("group relative rounded-[inherit]", className)}>
      <div className="absolute inset-0 rounded-[inherit] bg-border" />
      <div className="absolute inset-px rounded-[inherit] bg-background" />
      <div className="relative">{children}</div>
    </div>
  );
}
