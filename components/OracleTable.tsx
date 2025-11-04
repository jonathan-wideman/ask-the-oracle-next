import { Fragment } from "react";
import { classNames, styleAnimationDelay } from "../lib/util";
import { OracleData } from "../data/oracles";

export function OracleTable({
  oracle,
  className,
}: {
  oracle: OracleData;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "grid grid-cols-[auto_auto] text-left text-sm gap-x-4 gap-y-2",
        "fadein",
        className
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
