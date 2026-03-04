"use client";

import FavGreen from "@/public/favgreen.png";
import FavGrey from "@/public/favgrey.png";
import Image from "next/image";
import { useState } from "react";

export function Favourite() {
  const [isFavourite, setIsFavourite] = useState(false);
  function toggle() {
    setIsFavourite((prev) => !prev);
  }

  return (
    <button
      className="cursor-pointer relative w-[10%] max-w-[40px] min-w-[24px] aspect-square"
      onClick={toggle}
    >
      <Image fill alt="favourites" src={isFavourite ? FavGreen : FavGrey} />
    </button>
  );
}
