import { useContext } from "react";
import { SkeletonContext } from "./skeletonContext";

export function useSkeleton() {
  const context = useContext(SkeletonContext);

  if (!context) throw new Error("useSkeleton must be used inside a provider");

  return context;
}
