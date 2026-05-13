"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface TooltipProps {
  children: React.ReactNode;
  helpText?: string;
  bgColor?: string;
  textColor?: string;
  fullWidth?: boolean;
  className?: string;
}

export function Tooltip({
  children,
  helpText,
  bgColor = "bg-neutral-800",
  textColor = "text-white",
  fullWidth = false,
  className = "",
}: TooltipProps) {
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>(null);

  function handleMouseEnter() {
    timerRef.current = setTimeout(() => setCoords({ top: 0, left: 0 }), 600);
  }
  function handleMouseLeave() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setCoords(null);
  }

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!coords || !trigger || !tooltip) return;
    if (coords.top !== 0) return;

    function calculatePosition(element: HTMLElement, tip: HTMLElement) {
      const triggerRect = element.getBoundingClientRect();
      const tooltipRect = tip.getBoundingClientRect();

      let top = triggerRect.top - tooltipRect.height - 10;
      let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

      if (top < 10) {
        top = triggerRect.bottom + 10;
      }

      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }

      const newTop = top + window.scrollY;
      const newLeft = left + window.scrollX;

      setCoords({ top: newTop, left: newLeft });
    }

    calculatePosition(trigger, tooltip);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [coords, helpText]);

  if (!helpText?.trim()) return <>{children}</>;
  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${fullWidth ? "block w-full" : "grid place-items-center"} ${className}`}
    >
      {children}

      {coords &&
        createPortal(
          <div
            ref={tooltipRef}
            style={{
              position: "absolute",
              maxWidth: "250px",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              opacity: coords.top === 0 ? 0 : 1,
              pointerEvents: "none",
            }}
            className={`z-[9999] px-3 py-1.5 rounded shadow-lg text-sm transition-opacity duration-200 ${bgColor} ${textColor}`}
          >
            {helpText}
          </div>,
          document.body
        )}
    </div>
  );
}
