import Link from "next/link";
import { classNames } from "../../lib/util";

export function LinkVariant({
  children,
  className,
  variant = "default",
  ...props
}) {
  return (
    <Link
      className={classNames(
        // "mx-auto w-4/5 max-w-4xl flex flex-col",
        // variant === "center" && "items-center text-center",
        "underline",
        "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
        "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
