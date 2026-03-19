"use client";

import { ReactNode } from "react";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { CardContext } from "./cardContext";
import { Favourite } from "./favourite";
import { Information } from "./information";
import { Rating } from "./rating";
import { Title } from "./title";

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
ItemCard.Rating = Rating;
ItemCard.Information = Information;
ItemCard.Avatar = Avatar;
ItemCard.Favourite = Favourite;
ItemCard.Badge = Badge;
