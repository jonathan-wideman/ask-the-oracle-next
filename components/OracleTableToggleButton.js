import { classNames, styleAnimationDelay } from "../lib/util";

export function OracleTableToggleButton({
  toggleTable,
  tableVisible,
  animationDelay = 0.5,
}) {
  return (
    <button
      onClick={() => toggleTable()}
      className={classNames(
        "fadein",
        "cursor-pointer underline",
        "hover:underline hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
        "focus-visible:underline focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow"
      )}
      style={styleAnimationDelay(animationDelay)}
    >
      {tableVisible ? "put away" : "consult"} the runic charts
    </button>
  );
}
