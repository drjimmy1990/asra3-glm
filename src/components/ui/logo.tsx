import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoIcon({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Asra3 Logo"
      width={size}
      height={size}
      className={cn("rounded-lg object-contain", className)}
      priority
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      <LogoIcon size={36} className="transition-transform duration-300 group-hover:scale-105" />
      <span className="text-xl font-bold tracking-tight">
        asra3<span className="text-primary">.com</span>
      </span>
    </div>
  );
}
