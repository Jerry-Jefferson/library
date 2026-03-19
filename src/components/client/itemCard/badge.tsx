export interface BadgeProps {
  genres: string[];
  className?: string;
}

export function Badge({ genres, className }: BadgeProps) {
  return (
    <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${className || ""}`}>
      {genres.map((genre) => (
        <span
          key={genre}
          className="inline-block text-primary font-bold text-base text-[clamp(10px,1.5vw+0.5rem,16px)]
          border border-primary rounded-full  
          px-2 py-0.5 sm:px-4 sm:py-1.5 whitespace-nowrap"
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
