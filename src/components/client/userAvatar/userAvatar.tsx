"use client";

export type AvatarProps = {
  name?: string;
  fallback?: string;
};

export function Avatar({ name, fallback = "U" }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : fallback;

  return (
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-black ">
      {initials}
    </div>
  );
}
