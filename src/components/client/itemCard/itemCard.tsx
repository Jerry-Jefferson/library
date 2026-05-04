"use client";

import { ReactNode } from "react";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { CardContext } from "./cardContext";
import { Information } from "./information";
import { Title } from "./title";
import { Favorite } from "./favorite";

export interface ItemCardProps {
  children: ReactNode;
  name: string;
}
export default function ItemCard({ children, name }: ItemCardProps) {
  return (
    <CardContext value={{ name }}>
      <div className="@container relative w-full max-w-[1200px] min-w-[150px]">{children}</div>
    </CardContext>
  );
}

ItemCard.Title = Title;
ItemCard.Information = Information;
ItemCard.Avatar = Avatar;
ItemCard.Favorite = Favorite;
ItemCard.Badge = Badge;
