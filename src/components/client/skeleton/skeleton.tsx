import { ReactNode } from "react";
import { Circle } from "./circle";
import { Line } from "./line";
import { Rect } from "./rect";
import { SkeletonContext } from "./skeletonContext";

export type ColorVariant = "green" | "grey";
export type AnimationVariant = "pulse" | "none";

export interface SkeletonProps {
  children: ReactNode;
  animation: AnimationVariant;
  color: ColorVariant;
}

const colorVariants: Record<ColorVariant, string> = {
  green: "bg-primary-hover",
  grey: "bg-secondary",
};

const animationVariants: Record<AnimationVariant, string> = {
  pulse: "animate-pulse",
  none: "",
};

export default function Skeleton({ children, animation, color }: SkeletonProps) {
  const contextValue = {
    animation: animationVariants[animation],
    color: colorVariants[color],
  };
  return <SkeletonContext value={contextValue}>{children}</SkeletonContext>;
}

Skeleton.Circle = Circle;
Skeleton.Line = Line;
Skeleton.Rect = Rect;
