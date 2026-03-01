import Image from "next/image";

export interface BookCardProps {
  title: string;
  authorName: string;
}

export function BookCard({ title, authorName }: BookCardProps) {
  return (
    <div className="snap-center flex-shrink-0 max-w-[150px]">
      <div className="relative hover:border hover:border-primary rounded-xl h-[210px] min-w-[150px] overflow-hidden">
        <Image fill className="object-cover" alt="book cover" src="/HP.jpg" />
      </div>
      <p className="pt-2 truncate">{title}</p>
      <p className="text-sm text-secondary truncate">{authorName}</p>
    </div>
  );
}
