"use client";

import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";

export interface VirtualizerListProps<T> {
  children: (item: T) => ReactNode;
  itemSize?: number;
  items: T[];
  isWindowScroll?: boolean;
  columns?: number;
}

export function VirtualizerList<T>({
  children,
  itemSize,
  items,
  isWindowScroll = false,
  columns = 1,
}: VirtualizerListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState(0);

  useLayoutEffect(() => {
    if (isWindowScroll && parentRef.current) {
      setOffsetTop(parentRef.current.offsetTop);
    }
  }, [isWindowScroll]);

  const rows = Math.ceil(items.length / columns);
  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemSize ?? 250,
    enabled: !isWindowScroll,
  });

  const windowVirtualizer = useWindowVirtualizer({
    count: rows,
    estimateSize: () => itemSize ?? 250,
    overscan: 5,
    scrollMargin: offsetTop,
    enabled: isWindowScroll,
  });

  const activeVirtualizer = isWindowScroll ? windowVirtualizer : rowVirtualizer;
  const virtualItems = activeVirtualizer.getVirtualItems();
  return (
    <div
      ref={parentRef}
      style={{
        overflowAnchor: "none",
      }}
      className={`w-full ${
        isWindowScroll
          ? ""
          : "h-full min-h-75 overflow-y-auto contain-strict [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      }`}
    >
      <div
        style={{
          height: activeVirtualizer.getTotalSize(),
        }}
        className="w-full relative"
      >
        <div
          style={{
            transform: `translateY(${
              (virtualItems[0]?.start ?? 0) - (isWindowScroll ? offsetTop : 0)
            }px)`,
          }}
          className="absolute top-0 left-0 w-full"
        >
          {virtualItems.map((virtualRow) => {
            const startIdx = virtualRow.index * columns;
            const rowItems = items.slice(startIdx, startIdx + columns);
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={activeVirtualizer.measureElement}
                className="grid gap-6 mb-6"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
              >
                {rowItems.map((item, index) => (
                  <div key={`${virtualRow.key}-${index}`}>{children(item)}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
