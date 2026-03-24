import Link from "next/link";

export interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkButton({ href, children, className = "" }: LinkButtonProps) {
  return (
    <Link
      className={`border border-secondary rounded-md inline-block text-[clamp(10px,0.5rem+1vw,16px)]
      hover:bg-primary-hover hover:text-background px-4 py-2 transition-colors font-bold text-center 
      ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
