import Link from "next/link";
import { classNames } from "../../lib/util";
import { JSX } from "react";

export function LinkVariant(
  {
    children,
    className,
    href,
    variant = "default",
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    href: string;
    variant?: "default";
  } & Partial<JSX.IntrinsicElements["a"]> // TODO: add Next Link types
) {
  return (
    <Link
      className={classNames(
        "underline",
        "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
        "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
