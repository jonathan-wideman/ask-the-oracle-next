import { styleAnimationDelay } from "../lib/util";
import utilityStyles from "../styles/utility.module.css";

export function OracleTableToggleButton({
  toggleTable,
  tableVisible,
  animationDelay = 0.5,
}) {
  return (
    <button
      onClick={() => toggleTable()}
      className={utilityStyles.fadein}
      style={styleAnimationDelay(animationDelay)}
    >
      {tableVisible ? "put away" : "consult"} the runic charts
    </button>
  );
}
