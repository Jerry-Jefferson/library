import Image, { StaticImageData } from "next/image";

export interface AuthPageContainerProps {
  children: React.ReactNode;
  alt: string;
  src: StaticImageData;
}

export function AuthPageContainer({ children, alt, src }: AuthPageContainerProps) {
  return (
    <div className="flex w-full h-screen">
      <div className="relative w-[50%] h-full">
        <Image fill alt={alt} src={src} />
      </div>
      <div className="flex justify-center items-center w-[50%]">{children}</div>
    </div>
  );
}
