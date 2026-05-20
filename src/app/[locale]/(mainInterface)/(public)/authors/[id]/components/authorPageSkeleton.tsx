import Skeleton from "@/src/components/client/skeleton/skeleton";

export function AuthorPageSkeleton() {
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
                <Skeleton.Rect className="h-[65px]" width="500px" />
                <Skeleton.Rect className="h-[30px]" width="150px" />
              </div>
              <div className="flex flex-col gap-4">
                <Skeleton.Rect className="h-[32px]" width="100px" />
                <Skeleton.Rect className="h-[420px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton.Rect className="h-[250px]" />
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
