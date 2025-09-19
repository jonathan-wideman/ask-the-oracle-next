import { Fragment } from "react";
import { classNames, styleAnimationDelay } from "../lib/util";

export function OracleTable({ oracle, tableVisible }) {
  if (!tableVisible) return null;

  return (
    <div
      className={classNames(
        "grid grid-cols-[auto_auto] mt-8 mb-4 px-8 py-4 text-left text-sm gap-x-4 gap-y-2 border border-zinc-700 rounded-2xl",
        "fadein"
      )}
    >
      {oracle.table.map((row, index) => (
        <Fragment key={index}>
          <span
            className="fadein"
            style={styleAnimationDelay(index * 0.025 + 0.1)}
          >
            {row.roll}
          </span>
          <span
            className="fadein"
            style={styleAnimationDelay(index * 0.025 + 0.1)}
          >
            {row.result}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
