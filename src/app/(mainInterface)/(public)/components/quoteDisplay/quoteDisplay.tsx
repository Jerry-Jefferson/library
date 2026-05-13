import Quote from "@/public/quote.png";
import Sparkle from "@/public/sparkle.png";
import Image from "next/image";

export function QuoteDisplay({ quote }: { quote: string }) {
  return (
    <div className="bg-card-back border border-primary-hover rounded-md w-full sm:w-[40%] flex flex-col min-h-[200px]">
      <div className="relative flex items-center gap-4">
        <div className="relative leading-none">
          <Image src={Quote} alt="" width={80} height={80} className="block" />
          <Image
            src={Sparkle}
            alt=""
            className="absolute -bottom-2 -right-2"
            width={40}
            height={40}
          />
        </div>
        <p className="text-primary text-sm sm:text-lg font-bold">FEATURED QUOTE</p>
      </div>
      <div className="w-full flex text-center justify-center p-10">
        <p className="text-[clamp(1.25rem,4vw,2.25rem)] font-lobster leading-normal">{`"${quote || "A quote incoming..."}"`}</p>
      </div>
    </div>
  );
}
