import Skeleton from "@/src/components/client/skeleton/skeleton";

export function HomePageSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6 opacity-0 animate-fade-in animation-delay-300">
      <Skeleton animation="pulse" color="grey">
        <div className="flex flex-col gap-4">
          <Skeleton.Rect className="h-[40px]" width="100px" />
          <Skeleton.Rect className="h-[266px]" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton.Rect className="h-[40px]" width="100px" />
          <Skeleton.Rect className="h-[266px]" />
        </div>
      </Skeleton>
    </div>
  );
}
