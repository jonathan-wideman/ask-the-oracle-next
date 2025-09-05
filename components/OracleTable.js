import { Fragment } from "react";
import { classNames, styleAnimationDelay } from "../lib/util";
import oracleStyles from "../styles/Oracle.module.css";
import utilityStyles from "../styles/utility.module.css";

export function OracleTable({ oracle, tableVisible }) {
  if (!tableVisible) return null;

  return (
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
  );
}
