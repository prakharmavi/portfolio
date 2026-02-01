"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface AnimatedSubscribeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  subscribeStatus?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSubscribeButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedSubscribeButtonProps
>(({ subscribeStatus, onClick, className, children, ...props }, ref) => {
  const isControlled = subscribeStatus !== undefined;
  const [isSubscribed, setIsSubscribed] = useState<boolean>(
    subscribeStatus ?? false,
  );

  useEffect(() => {
    if (isControlled) {
      setIsSubscribed(subscribeStatus!);
    }
  }, [subscribeStatus, isControlled]);

  if (
    React.Children.count(children) !== 2 ||
    !React.Children.toArray(children).every(
      (child) => React.isValidElement(child) && child.type === "span",
    )
  ) {
    throw new Error(
      "AnimatedSubscribeButton expects two children, both of which must be <span> elements.",
    );
  }

  const childrenArray = React.Children.toArray(children);
  const initialChild = childrenArray[0];
  const changeChild = childrenArray[1];

  return (
    <button
      ref={ref}
      className={cn(
        "relative flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-primary-foreground",
        className,
      )}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isControlled) {
          setIsSubscribed(!isSubscribed);
        }
        onClick?.(e);
      }}
      {...props}
    >
      <span className="relative flex h-full w-full items-center justify-center font-semibold">
        {isSubscribed ? changeChild : initialChild}
      </span>
    </button>
  );
});

AnimatedSubscribeButton.displayName = "AnimatedSubscribeButton";
