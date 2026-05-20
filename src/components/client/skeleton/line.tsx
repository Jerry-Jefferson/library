"use client";

import { useSkeleton } from "./useSkeleton";

export interface LineProps {
  className: string;
}

export function Line({ className }: LineProps) {
  const { color, animation } = useSkeleton();
  return <div className={`h-[2] rounded-md ${color} ${animation} ${className}`} />;
}
