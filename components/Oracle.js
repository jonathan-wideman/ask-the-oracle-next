import { useOracleState } from "../hooks/useOracleState";
import { OracleResult } from "./OracleResult";
import { OracleTable } from "./OracleTable";
import { OracleTableToggleButton } from "./OracleTableToggleButton";

export function Oracle({
  oracle,
  rollOnCreate = false,
  initialResult = undefined,
}) {
  const { rollOracle, tableVisible, toggleTable, result, rolling } =
    useOracleState(oracle, rollOnCreate, initialResult);

  return (
    <div className="text-center mb-8">
      <OracleResult result={result} rolling={rolling} rollOracle={rollOracle} />
      <OracleTable oracle={oracle} tableVisible={tableVisible} />
      <OracleTableToggleButton
        toggleTable={toggleTable}
        tableVisible={tableVisible}
      />
    </div>
  );
}
