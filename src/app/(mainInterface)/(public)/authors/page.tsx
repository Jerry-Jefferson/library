"use client";

import { getAuthors } from "@/lib/modules/authors/authors";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import DefaultAvatar from "@/public/default-avatar.png";
import { useEffect, useState } from "react";
import { IAuthorSerialized } from "@/src/models/author";
import Link from "next/link";

export default function Authors() {
  const [authors, setAuthors] = useState<IAuthorSerialized[]>([]);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  return (
    <div className="w-full min-h-dvh flex justify-center">
      <div className="w-4/5 gap-4 flex flex-col mt-10">
        <h2 className="text-6xl font-bold">Authors Directory</h2>
        <p className="text-xl text-secondary">
          Meet the brilliant minds behind our collection of over 50,000 titles.
        </p>
        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10">
          {authors.map((author: IAuthorSerialized) => (
            <ItemCard key={author._id} name="Author">
              <div className="bg-card-author flex flex-col justify-between gap-15 p-6 rounded-xl h-full border border-neutral-dark">
                <div className="flex flex-col items-center gap-4 grow">
                  <div className="w-35 h-35">
                    <ItemCard.Avatar
                      src={author.imageUrl ?? DefaultAvatar}
                      alt={author.name}
                      view="circle"
                    />
                  </div>
                  <ItemCard.Title content={author.name} className="font-bold text-center" />
                  <ItemCard.Information
                    color="secondary"
                    content={author.bio}
                    className="text-center whitespace-normal"
                  />
                </div>
                <Link
                  className="border border-secondary rounded-md inline-block hover:bg-primary-hover hover:text-background px-4 py-2 transition-colors font-bold text-center"
                  href={`/posts/${author._id}`}
                >
                  View profile
                </Link>
              </div>
            </ItemCard>
          ))}
        </div>
      </div>
    </div>
  );
}
