import Skeleton from "@/src/components/client/skeleton/skeleton";

export function BookPageSkeleton() {
  return (
    <div className="w-full flex justify-center bg-background opacity-0 animate-fade-in animation-delay-300">
      <Skeleton animation="pulse" color="grey">
        <div className="w-7/8 sm:w-4/5 gap-4 flex flex-col mt-10 mb-10">
          <div className="flex items-start gap-5 sm:gap-10 border-b border-secondary pb-12">
            <div className="w-[35%] flex flex-col gap-4 pt-4">
              <Skeleton.Rect className="h-[540px]" />
              <Skeleton.Rect className="h-[57px]" />
            </div>
            <div className="w-[65%] flex flex-col gap-6 pt-4">
              <div className="flex flex-col gap-2">
                <Skeleton.Rect className="h-[60px]" width="500px" />
                <Skeleton.Rect className="h-[30px]" width="200px" />
              </div>
              <div className="flex gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton.Rect key={index} className="h-[37px]" width="92px" />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <Skeleton.Rect className="h-[36px]" width="180px" />
                <Skeleton.Rect className="h-[400px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton.Rect className="h-[32px]" width="250px" />
              <Skeleton.Rect className="h-[24px]" width="300px" />
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full sm:w-[40%] flex flex-col">
                <Skeleton.Rect className="h-[400px]" />
              </div>
              <div className="w-full sm:w-[60%] flex flex-col gap-4">
                <Skeleton.Rect className="h-[181px]" />
                <Skeleton.Rect className="h-[181px]" />
              </div>
            </div>
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
