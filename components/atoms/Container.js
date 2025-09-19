import { classNames } from "../../lib/util";

export function Container({
  children,
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      className={classNames(
        "mx-auto w-4/5 max-w-4xl flex flex-col",
        variant === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
