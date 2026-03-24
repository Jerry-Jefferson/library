"use client";

export interface ToggleButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function ToggleButton({ className, onClick, children }: ToggleButtonProps) {
  return (
    <div>
      <button
        className={`hover:text-primary-hover text-primary text-[clamp(10px,0.5rem+1vw,16px)] cursor-pointer ${className}`}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
