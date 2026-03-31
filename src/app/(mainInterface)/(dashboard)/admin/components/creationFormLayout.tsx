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
        {/* <div className="flex justify-between gap-6">
          <input placeholder="Enter the title" />
          <input placeholder="Enter the age" />
        </div>
        <div className="flex justify-between gap-6">
          <input placeholder="Enter the birth date" />
          <input placeholder="Enter the death date" />
        </div> */}
        {/* <textarea className="w-full resize-none" placeholder="Enter synopsis" rows={10}></textarea> */}
        {/* <div className="flex justify-between gap-6">
          <Button padding="medium">Save</Button>
          <Button padding="medium" colorVariant="secondary">
            Cancel
          </Button>
        </div> */}
      </div>
      <div className="bg-card-back border border-secondary rounded-md w-[30%] p-10">
        {/* <div className="border border-secondary border-dashed rounded-md w-full h-full flex flex-col justify-center items-center">
          <input type="file" />
          <p>PNG or JPG, max 10MB</p>
        </div> */}
        {imageLoader}
      </div>
    </div>
  );
}
