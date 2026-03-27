"use client";
import { IAuthorSerialized } from "@/src/models/author";
import { routes } from "@/src/shared/constants/routes";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import DefaultAvatar from "@/public/default-avatar.png";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { Collapse } from "@/src/components/client/collapse/collapse";
import { ToggleButton } from "@/src/components/client/button/variants/toggleButton";

export default function AuthorPage({ author }: { author: IAuthorSerialized | null }) {
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
          <LinkButton href={routes.authors} className="py-4">
            Back to Authors Directory
          </LinkButton>
        </div>
        <div className="w-[65%] flex flex-col gap-6">
          <ItemCard.Title content={author.name} className="font-bold" />
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
                    <ToggleButton onClick={toggle}>
                      {isShownFull ? "Collapse" : "Read more"}
                    </ToggleButton>
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
