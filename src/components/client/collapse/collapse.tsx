"use client";

import { RefObject, useLayoutEffect, useRef, useState } from "react";

export interface CollapseProps<T> {
  children: (data: {
    isShownFull: boolean;
    isTruncated: boolean;
    textRef: RefObject<T | null>;
    toggle: () => void;
    className: string;
  }) => React.ReactNode;
}

export function Collapse<T extends HTMLElement>({ children }: CollapseProps<T>) {
  const [isShownFull, setShownFull] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const textRef = useRef<T>(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      const { scrollHeight, offsetHeight } = textRef.current;
      setIsTruncated(scrollHeight > offsetHeight);
    }
  }, []);

  function toggle() {
    setShownFull((prev) => !prev);
  }

  const className = isShownFull
    ? "line-clamp-none"
    : "line-clamp-6 sm:line-clamp-7 md:line-clamp-10 lg:line-clamp-12 xl:line-clamp-14";

  return <>{children({ isShownFull, toggle, className, isTruncated, textRef })}</>;
}
