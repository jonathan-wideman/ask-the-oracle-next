import { styleAnimationDelay } from "../lib/util";

export function OracleTableToggleButton({
  toggleTable,
  tableVisible,
  animationDelay = 0.5,
}) {
  return (
    <button
      onClick={() => toggleTable()}
      className="fadein"
      style={styleAnimationDelay(animationDelay)}
    >
      {tableVisible ? "put away" : "consult"} the runic charts
    </button>
  );
}
