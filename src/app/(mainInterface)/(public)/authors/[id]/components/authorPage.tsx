"use client";
import { useSearchParams } from "next/navigation";
import { IAuthorSerialized } from "@/src/models/author";
import { routes } from "@/src/shared/constants/routes";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import DefaultAvatar from "@/public/default-avatar.png";
import LinkButton from "@/src/components/server/linkButton/linkButton";

export default function AuthorPage({ author }: { author: IAuthorSerialized | null }) {
  const searchParams = useSearchParams();
  const backPath = searchParams.get("from") || routes.authors;
  if (!author) return <p>No author found</p>;

  return (
    <ItemCard name="book">
      <div className="flex gap-10 border-b border-secondary pb-12">
        <div className="w-[35%] flex flex-col gap-4 pt-4">
          <ItemCard.Avatar
            src={author.imageUrl ?? DefaultAvatar}
            alt={author.name}
            view="rounded"
          />
          <LinkButton href={backPath} className="py-4">
            Back to {backPath === routes.authors ? "Authors Directory" : "Home"}
          </LinkButton>
        </div>
        <div className="w-[65%] flex flex-col gap-6">
          <ItemCard.Title content={author.name} className="font-bold" />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl">Information</h2>
            <ItemCard.Information content={author.bio} color="secondary" />
          </div>
        </div>
      </div>
    </ItemCard>
  );
}
