"use client";

import { Button } from "@/src/components/client/button/button";
import { Collapse } from "@/src/components/client/collapse/collapse";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IAuthorSerialized } from "@/src/models/author";
import { BACK_PATHS_LABELS } from "@/src/shared/constants/backPathsLabels";
import { routes } from "@/src/shared/constants/routes";

export default function AuthorPage({
  author,
  from,
}: {
  author: IAuthorSerialized | null;
  from?: string;
}) {
  const backPath = from ?? routes.authors;
  if (!author) return <p>No author found</p>;

  return (
    <ItemCard name="book">
      <div className="flex items-start gap-10 border-b border-secondary pb-12">
        <div className="w-[35%] flex flex-col gap-4 pt-4">
          <ItemCard.Avatar src={author.imageUrl} alt={author.name} view="rounded" />
          <LinkButton href={backPath} className="py-4">
            Back to {BACK_PATHS_LABELS[routes.authors]}
          </LinkButton>
        </div>
        <div className="w-[65%] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ItemCard.Title content={author.name} className="font-bold" />
            <ItemCard.Information
              content={`${author.birthYear} - ${author.deathYear ?? "Present"}`}
              color="primary"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl">Biography</h2>
            <Collapse>
              {({ className, toggle, isShownFull, isTruncated, textRef }) => (
                <>
                  <ItemCard.Information
                    content={author.bio}
                    color="secondary"
                    className={className}
                    ref={textRef}
                  />
                  {isTruncated && (
                    <Button
                      variant="custom"
                      onClick={toggle}
                      className="hover:text-primary-hover text-primary text-[clamp(10px,0.5rem+1vw,16px)]"
                    >
                      {isShownFull ? "Collapse" : "Read more"}
                    </Button>
                  )}
                </>
              )}
            </Collapse>
          </div>
        </div>
      </div>
    </ItemCard>
  );
}
