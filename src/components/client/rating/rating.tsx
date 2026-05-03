"use client";

import { useId, useState } from "react";

export interface RatingProps {
  rating: number;
  max?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export type StarProps = {
  id: string;
  fill: number;
  onMouseEnter?: () => void;
  onClick?: () => void;
};

export function Star({ fill, id, ...props }: StarProps) {
  return (
    <svg viewBox="0 0 576 512" className="w-5 h-5" {...props}>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill}%`} stopColor="var(--primary)" />
          <stop offset={`${fill}%`} stopColor="var(--secondary)" />
        </linearGradient>
      </defs>

      <path
        fill={`url(#${id})`}
        d="M287.9 17.8L354 150.2 499.2 171.5C522.6 174.8 531.9 202.8 514.7 218.5L404 313.6 430.6 458.3C434.8 481.4 410.2 498.8 389.6 487.8L288 439.6 186.4 487.8C165.8 498.8 141.2 481.4 145.4 458.3L172 313.6 61.3 218.5C44.1 202.8 53.4 174.8 76.8 171.5L222 150.2 288.1 17.8Z"
      />
    </svg>
  );
}

export function Rating({ rating, max = 5, interactive = false, onChange }: RatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const baseId = useId();

  const displayRating = hover ?? rating;

  return (
    <div className="flex items-center gap-3">
      <span className="text-md font-medium ">
        {interactive ? displayRating : rating.toFixed(1)}
      </span>

      <div
        className={`flex items-center gap-1 ${interactive ? "cursor-pointer" : ""}`}
        onMouseLeave={() => setHover(null)}
      >
        {Array.from({ length: max }).map((_, i) => {
          const value = i + 1;

          const fill = Math.max(0, Math.min(100, (displayRating - i) * 100));

          return (
            <Star
              key={i}
              id={`${baseId}-${i}`}
              fill={fill}
              onMouseEnter={() => interactive && setHover(value)}
              onClick={() => interactive && onChange?.(value)}
            />
          );
        })}
      </div>
    </div>
  );
}
