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
