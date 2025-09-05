import { classNames } from "../lib/util";
import oracleStyles from "../styles/Oracle.module.css";
import utilityStyles from "../styles/utility.module.css";

export function OracleResult({ result, rolling, rollOracle }) {
  return (
    <div>
      <button
        onClick={() => rollOracle()}
        className={classNames(
          oracleStyles.result,
          rolling ? utilityStyles.transparent : utilityStyles.fadein
        )}
      >
        {result}
      </button>
    </div>
  );
}
