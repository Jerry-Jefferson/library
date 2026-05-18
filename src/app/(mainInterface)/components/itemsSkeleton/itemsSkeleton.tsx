import Skeleton from "@/src/components/client/skeleton/skeleton";

export interface ItemsSkeletonProps {
  gridClassName: string;
  className: string;
  itemsNumber: number;
  withSort?: boolean;
}

export function ItemsSkeleton({
  gridClassName,
  className,
  itemsNumber,
  withSort = true,
}: ItemsSkeletonProps) {
  return (
    <div className="w-full flex bg-background opacity-0 animate-fade-in animation-delay-300">
      <Skeleton animation="pulse" color="grey">
        <div className="w-full gap-4 flex flex-col">
          {withSort ? (
            <div className="flex gap-5 w-full justify-center sm:justify-end mt-5">
              <div className="flex flex-col gap-3 max-w-[2/4] sm:flex-row">
                <div className="min-w-85 max-w-85">
                  <Skeleton.Rect className="h-[58px]" />
                </div>
                <div className="min-w-48">
                  <Skeleton.Rect className="h-[58px]" />
                </div>
              </div>
            </div>
          ) : null}
          <div className={`w-full gap-8 grid ${gridClassName}`}>
            {Array.from({ length: itemsNumber }).map((_, index) => (
              <Skeleton.Rect key={index} className={`${className}`} />
            ))}
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
