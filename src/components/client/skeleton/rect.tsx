"use client";

import { useSkeleton } from "./useSkeleton";

export interface RectProps {
  className: string;
  width?: string;
}

export function Rect({ className, width }: RectProps) {
  const { color, animation } = useSkeleton();
  return (
    <div
      className={`rounded-md w-full ${color} ${animation} ${className}`}
      style={{ width: width }}
    />
  );
}
