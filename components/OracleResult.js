import { classNames } from "../lib/util";

export function OracleResult({ result, rolling, rollOracle }) {
  return (
    <div>
      <button
        onClick={() => rollOracle()}
        className={classNames(
          "m-4 px-4 py-8 text-xl border border-zinc-700 rounded-2xl",
          "hover:border-zinc-300 hover:shadow-glow hover:shadow-zinc-800",
          "focus-visible:border-zinc-300 focus-visible:shadow-glow focus-visible:shadow-zinc-800",
          rolling ? "opacity-0" : "fadein"
        )}
      >
        {result}
      </button>
    </div>
  );
}
