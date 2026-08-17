import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Force white logo on dark backgrounds (e.g. hero header) */
  inverted?: boolean;
}

const sizes = {
  sm: { width: 130, height: 40, className: "h-7 w-auto sm:h-8" },
  md: { width: 160, height: 48, className: "h-8 w-auto sm:h-10" },
  lg: { width: 200, height: 60, className: "h-10 w-auto sm:h-12" },
};

export default function Logo({
  size = "md",
  className = "",
  inverted = false,
}: LogoProps) {
  const { width, height, className: imgClass } = sizes[size];

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      {inverted ? (
        <Image
          src="/images/logo-white.png"
          alt="HS Group"
          width={width}
          height={height}
          className={imgClass}
          priority
        />
      ) : (
        <>
          <Image
            src="/images/logo-black.png"
            alt="HS Group"
            width={width}
            height={height}
            className={`${imgClass} dark:hidden`}
            priority
          />
          <Image
            src="/images/logo-white.png"
            alt="HS Group"
            width={width}
            height={height}
            className={`${imgClass} hidden dark:block`}
            priority
          />
        </>
      )}
    </Link>
  );
}
