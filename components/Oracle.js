import { useOracleState } from "../hooks/useOracleState";
import { classNames } from "../lib/util";
import { OracleResult, OracleResultAlt } from "./OracleResult";
import { OracleTable, OracleTableAlt } from "./OracleTable";
import { OracleTableToggleButton } from "./OracleTableToggleButton";

export function Oracle({
  oracle,
  rollOnCreate = false,
  initialResult = undefined,
}) {
  const { rollOracle, tableVisible, toggleTable, result, rolling } =
    useOracleState(oracle, rollOnCreate, initialResult);

  return (
    // <div className="text-center mb-8">
    <div>
      {/* <OracleResult result={result} rolling={rolling} rollOracle={rollOracle} /> */}
      <OracleResultAlt
        result={result}
        rolling={rolling}
        rollOracle={rollOracle}
        toggleTable={toggleTable}
        title={oracle.title}
      />
      <OracleTable oracle={oracle} tableVisible={tableVisible} />
      {/* <OracleTableToggleButton
        toggleTable={toggleTable}
        tableVisible={tableVisible}
      /> */}
    </div>
  );
}

export function OracleAlt({ oracle, rollOnCreate = false, initialResult }) {
  const { rollOracle, tableVisible, toggleTable, result, rolling } =
    useOracleState(oracle, rollOnCreate, initialResult);

  return (
    <div className="relative flex flex-col gap-4 bg-zinc-950/50 px-12 py-5 min-w-86 rounded-3xl">
      <button
        onClick={() => rollOracle()}
        className={classNames(
          "text-xl",
          "cursor-pointer",
          "hover:underline hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
          "focus-visible:underline focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow"
        )}
      >
        {result}
      </button>
      {tableVisible && (
        <>
          <div className="text-lg">{oracle.title}</div>
          <OracleTableAlt
            oracle={oracle}
            tableVisible={tableVisible}
            className="mb-4"
          />
        </>
      )}
      <OracleTitlePill title={oracle.title} onClick={toggleTable} />
    </div>
  );
}

export function OracleTitlePill({ title, onClick }) {
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={classNames(
        "text-sm text-zinc-400",
        // "absolute -bottom-2 left-0 right-0 text-center text-nowrap w-max",
        // "absolute -bottom-2 left-0 right-0 text-center text-nowrap",
        "absolute -bottom-2.5 text-center text-nowrap left-1/2 -translate-x-1/2",
        // "group-hover:text-zinc-200",
        // "group-focus-visible:text-zinc-200"
        "group",
        "hover:text-zinc-200",
        "focus-visible:text-zinc-200"
      )}
    >
      <span
        className={classNames(
          "text-zinc-700",
          "group-hover:text-zinc-500",
          "group-focus-visible:text-zinc-500"
        )}
      >
        · ⊰
      </span>
      <span
        className={classNames(
          "bg-zinc-950 rounded-4xl px-4 py-1.5",
          "font-code"
        )}
      >
        {title?.toUpperCase()}
      </span>
      <span
        className={classNames(
          "text-zinc-700",
          "group-hover:text-zinc-500",
          "group-focus-visible:text-zinc-500"
        )}
      >
        ⊱ ·
      </span>
    </div>
  );
}
