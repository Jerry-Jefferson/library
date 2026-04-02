import { IGenreSerialized } from "@/src/models/genre";

export interface BadgeProps {
  genres: IGenreSerialized[] | null;
  className?: string;
}

export function Badge({ genres, className = "" }: BadgeProps) {
  if (!genres) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${className}`}>
      {genres.map((genre) => (
        <span
          key={genre._id}
          className="inline-block text-primary font-bold text-base text-[clamp(10px,1.5vw+0.5rem,16px)]
          border border-primary rounded-full  
          px-2 py-0.5 sm:px-4 sm:py-1.5 whitespace-nowrap"
        >
          {genre.title}
        </span>
      ))}
    </div>
  );
}
