import { classNames } from "../lib/util";

export function OracleResult({ result, rolling, rollOracle }) {
  return (
    <div>
      <button
        onClick={() => rollOracle()}
        className={classNames(
          "m-4 px-10 py-6 text-xl border border-zinc-700 rounded-3xl",
          "hover:border-zinc-300 hover:shadow-glow hover:shadow-zinc-800",
          "focus-visible:border-zinc-300 focus-visible:shadow-glow focus-visible:shadow-zinc-800",
          "cursor-pointer",
          "hover:underline hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
          "focus-visible:underline focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
          rolling ? "opacity-0" : "fadein"
        )}
      >
        {result}
      </button>
    </div>
  );
}

export function OracleResultAlt({
  result,
  rolling,
  rollOracle,
  title,
  toggleTable,
  className,
}) {
  return (
    <div>
      <button
        onClick={() => rollOracle()}
        className={classNames(
          "relative",
          // "group",
          "px-12 py-5 text-xl min-w-86",
          "bg-zinc-950/50",
          "rounded-3xl",
          "cursor-pointer",
          "hover:shadow-glow-outer hover:shadow-zinc-700",
          "focus-visible:shadow-glow-outer focus-visible:shadow-zinc-700",
          "hover:underline hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
          "focus-visible:underline focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
          rolling ? "opacity-0" : "fadein",
          className
        )}
      >
        {result}
        <div
          onClick={(event) => {
            event.stopPropagation();
            toggleTable();
          }}
          className={classNames(
            "text-sm text-zinc-400",
            // "absolute -bottom-2 left-0 right-0 text-center text-nowrap w-max",
            // "absolute -bottom-2 left-0 right-0 text-center text-nowrap",
            "absolute -bottom-2.5 text-center text-nowrap left-1/2 -translate-x-1/2",
            // "group-hover:text-zinc-200",
            // "group-focus-visible:text-zinc-200"
            "group",
            "hover:text-zinc-200",
            "focus-visible:text-zinc-200"
          )}
        >
          <span
            className={classNames(
              "text-zinc-700",
              "group-hover:text-zinc-500",
              "group-focus-visible:text-zinc-500"
            )}
          >
            · ⊰
          </span>
          <span
            className={classNames(
              "bg-zinc-950 rounded-4xl px-4 py-1.5",
              "font-code"
            )}
          >
            {title?.toUpperCase()}
          </span>
          <span
            className={classNames(
              "text-zinc-700",
              "group-hover:text-zinc-500",
              "group-focus-visible:text-zinc-500"
            )}
          >
            ⊱ ·
          </span>
        </div>
      </button>
    </div>
  );
}
