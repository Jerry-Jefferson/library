"use client";

import { createContext } from "react";

export interface SkeletonContextProps {
  animation: string;
  color: string;
}

export const SkeletonContext = createContext<SkeletonContextProps | null>(null);
