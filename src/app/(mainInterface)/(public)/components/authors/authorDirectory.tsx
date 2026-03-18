"use client";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { IAuthorSerialized } from "@/src/models/author";
import DefaultAvatar from "@/public/default-avatar.png";
import LinkButton from "@/src/components/server/linkButton/linkButton";

export default function AuthorDirectory({ authors }: { authors: IAuthorSerialized[] | null }) {
  if (!authors) return <p>No books found</p>;
  return (
    <div className="w-full min-h-dvh flex justify-center bg-background">
      <div className="w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">Authors Directory</h2>
        <p className="text-xl text-secondary">
          Meet the brilliant minds behind our collection of over 50,000 titles.
        </p>
        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10">
          {authors.map((author: IAuthorSerialized) => (
            <ItemCard key={author._id} name="Author">
              <div className="bg-card-back flex flex-col justify-between gap-15 p-6 rounded-xl h-full border border-neutral-dark">
                <div className="flex flex-col items-center gap-4 grow">
                  <ItemCard.Avatar
                    src={author.imageUrl ?? DefaultAvatar}
                    alt={author.name}
                    view="circle"
                  />
                  <ItemCard.Title content={author.name} className="font-bold text-center" />
                  <ItemCard.Information
                    color="secondary"
                    content={author.bio}
                    className="text-center whitespace-normal"
                  />
                </div>
                <LinkButton href={`/authors/${author._id}`}>View Information</LinkButton>
              </div>
            </ItemCard>
          ))}
        </div>
      </div>
    </div>
  );
}
