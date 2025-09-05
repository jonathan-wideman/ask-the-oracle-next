import { Fragment } from "react/jsx-runtime";
import oracleStyles from "../styles/Oracle.module.css";
import utilityStyles from "../styles/utility.module.css";
import { classNames, styleAnimationDelay } from "../lib/util";
import { useOracleState } from "../hooks/useOracleState";

export function Oracle({ oracle, rollOnCreate = false, initialResult = undefined }) {
  const { rollOracle, tableVisible, toggleTable, result, rolling } =
    useOracleState(oracle, rollOnCreate, initialResult);

  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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

      {tableVisible ? (
        <div className={classNames(oracleStyles.table, utilityStyles.fadein)}>
          {oracle.table.map((row, index) => (
            <Fragment key={index}>
              <span
                className={utilityStyles.fadein}
                style={styleAnimationDelay(index * 0.025 + 0.1)}
              >
                {row.roll}
              </span>
              <span
                className={utilityStyles.fadein}
                style={styleAnimationDelay(index * 0.025 + 0.1)}
              >
                {row.result}
              </span>
            </Fragment>
          ))}
        </div>
      ) : null}
      <button
        onClick={() => toggleTable()}
        className={utilityStyles.fadein}
        style={styleAnimationDelay(0.5)}
      >
        {tableVisible ? "put away" : "consult"} the runic charts
      </button>
    </div>
  );
}
