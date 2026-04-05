export function CreationFormLayout({
  children,
  imageLoader,
}: {
  children: React.ReactNode;
  imageLoader: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 w-full">
      <div className="bg-card-back border border-secondary rounded-md w-[70%] p-8 flex flex-col gap-4">
        {children}
      </div>
      <div className="bg-card-back border border-secondary rounded-md w-[30%] p-10">
        {imageLoader}
      </div>
    </div>
  );
}
