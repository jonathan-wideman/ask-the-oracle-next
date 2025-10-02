import { useState } from "react";
import { useOracleState } from "../hooks/useOracleState";
import { classNames, toTitleCase } from "../lib/util";
import { OracleTable } from "./OracleTable";

export function OracleChooser({ oracleListings, onSelect, onCancel }) {
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
        "bg-zinc-950/50 px-12 py-5 min-w-86 rounded-3xl",
        "fadein"
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="text-xl text-center fadein">Choose a new Oracle</div>
        {selectedCategory !== null && (
          <div className="text-lg text-center fadein">
            {toTitleCase(selectedCategory)}
          </div>
        )}
      </div>

      {selectedCategory === null && (
        <div className="flex flex-col gap-1">
          {Object.keys(oraclesByCategory).map((category, index) => (
            <div
              key={category}
              className={classNames(
                "underline",
                "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
                "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
                "fadein"
              )}
              // style={styleAnimationDelay(index * 0.025 + 0.25)}
              onClick={() => setSelectedCategory(category)}
            >
              {toTitleCase(category)}
            </div>
          ))}
        </div>
      )}

      {selectedCategory !== null && (
        <div className="flex flex-col gap-1">
          {oracleListings
            .filter((oracle) => oracle.category === selectedCategory)
            .map((oracle, index) => (
              <div key={oracle.id}>
                <div
                  className={classNames(
                    "font-bold",
                    "underline",
                    "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
                    "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
                    "fadein"
                  )}
                  onClick={() => onSelect(oracle.slug)}
                >
                  {oracle.title}
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        {selectedCategory !== null && (
          <button
            className={classNames(
              "underline",
              "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
              "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
              "fadein"
            )}
            onClick={() => setSelectedCategory(null)}
          >
            choose a different category
          </button>
        )}

        <button
          className={classNames(
            "underline",
            "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
            "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
            "fadein"
          )}
          onClick={() => onCancel()}
        >
          nevermind
        </button>
      </div>
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
                "absolute top-6 right-8 cursor-pointer",
                "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
                "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow"
              )}
              onClick={() => onDelete()}
            >
              🗙
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
