import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  src?: string | null;
  alt?: string;
  inverted?: boolean;
}

const sizes = {
  sm: { width: 130, height: 40, className: "h-7 w-auto sm:h-8 text-lg" },
  md: { width: 160, height: 48, className: "h-8 w-auto sm:h-10 text-xl" },
  lg: { width: 200, height: 60, className: "h-10 w-auto sm:h-12 text-2xl" },
};

export default function Logo({
  size = "md",
  className = "",
  src,
  alt = "",
  inverted = false,
}: LogoProps) {
  const imageSrc = src?.trim() || "";
  const { width, height, className: imgClass } = sizes[size];

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt || "Logo"}
          width={width}
          height={height}
          className={imgClass}
          priority
        />
      ) : alt ? (
        <span
          className={`font-semibold tracking-tight ${imgClass} ${
            inverted ? "text-white" : "text-brand-dark dark:text-white"
          }`}
        >
          {alt}
        </span>
      ) : null}
    </Link>
  );
}
