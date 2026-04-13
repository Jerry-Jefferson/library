"use client";

import { useState } from "react";
import { MdFavorite } from "react-icons/md";
import { Button } from "../button/button";

export function Favourite() {
  const [isFavourite, setIsFavourite] = useState(false);

  function toggle() {
    setIsFavourite((prev) => !prev);
  }

  return (
    <Button
      variant="icon"
      onClick={toggle}
      className="min-w-[26px] min-h-[26px] md:min-w-[25px] md:min-h-[25px] lg:min-w-[24px] lg:min-h-[24px] flex-shrink-0 flex items-center justify-center"
    >
      <MdFavorite
        className={`
          transition-colors
          ${isFavourite ? "text-primary" : "text-secondary"} w-full h-full flex-shrink-0
        `}
      />
    </Button>
  );
}
