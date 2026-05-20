"use client";

import { useSkeleton } from "./useSkeleton";

export interface CircleProps {
  className: string;
}

export function Circle({ className }: CircleProps) {
  const { color, animation } = useSkeleton();
  return <div className={`rounded-full ${color} ${animation} ${className}`} />;
}
