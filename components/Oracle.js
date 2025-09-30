import { useState } from "react";
import { useOracleState } from "../hooks/useOracleState";
import { classNames, toTitleCase } from "../lib/util";
import { LinkVariant } from "./atoms/LinkVariant";
import { OracleTable } from "./OracleTable";

export function OracleChooser({ oracleListings, onSelectOracle }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const oraclesByCategory = oracleListings.reduce(
    (acc, oracle) => ({
      ...acc,
      [oracle.category]: [...(acc[oracle.category] || []), oracle],
    }),
    {}
  );

  return (
    <div
      className={classNames(
        "flex flex-col gap-4",
        "bg-zinc-950/50 px-12 py-5 min-w-86 rounded-3xl"
      )}
    >
      <div className="text-lg text-center">Pick an Oracle</div>
      {selectedCategory === null &&
        Object.keys(oraclesByCategory).map((category, index) => (
          <div
            key={category}
            className={classNames("text-xl font-bold", "fadein")}
            // style={styleAnimationDelay(index * 0.025 + 0.25)}
            onClick={() => setSelectedCategory(category)}
          >
            {toTitleCase(category)}
          </div>
        ))}

      {selectedCategory !== null && (
        <div
          className={classNames("text-xl font-bold", "fadein")}
          onClick={() => {
            setSelectedCategory(null);
          }}
        >
          Back
        </div>
      )}

      {selectedCategory !== null &&
        oracleListings
          .filter((oracle) => oracle.category === selectedCategory)
          .map((oracle, index) => (
            <div key={oracle.id}>
              <div
                className={classNames("font-bold", "fadein")}
                onClick={() => onSelectOracle(oracle.slug)}
              >
                {oracle.title}
              </div>
            </div>
          ))}
    </div>
  );
}

export function Oracle({
  oracle,
  rollOnCreate = false,
  initialResult,
  onDelete,
  className,
}) {
  const { rollOracle, tableVisible, toggleTable, result, rolling } =
    useOracleState(oracle, rollOnCreate, initialResult);

  return (
    <div
      className={classNames(
        "relative flex flex-col gap-4 bg-zinc-950/50 px-12 py-5 min-w-86 rounded-3xl",
        className
      )}
    >
      <button
        onClick={() => rollOracle()}
        className={classNames(
          "text-xl",
          "cursor-pointer",
          "hover:underline hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
          "focus-visible:underline focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
          rolling ? "opacity-0" : "fadein"
        )}
      >
        {result}
      </button>
      {tableVisible && (
        <>
          <div className="text-lg text-center" onClick={toggleTable}>
            {oracle.title}
          </div>
          {onDelete && (
            <div
              className={classNames(
                "absolute top-6 right-6 cursor-pointer",
                "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
                "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow"
              )}
              onClick={() => onDelete()}
            >
              X
            </div>
          )}
          <OracleTable
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
