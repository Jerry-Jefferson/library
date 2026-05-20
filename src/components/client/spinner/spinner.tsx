export type SpinnerColor = "grey" | "green";

export interface SpinnerProps {
  width: string;
  color: SpinnerColor;
}

const colorVariants = {
  green: "border-t-primary-hover",
  grey: "border-t-secondary",
};

export function Spinner({ width, color }: SpinnerProps) {
  return (
    <div
      className={`aspect-square animate-spin rounded-full border-8 border-transparent ${colorVariants[color]}`}
      style={{ width: width }}
    />
  );
}
