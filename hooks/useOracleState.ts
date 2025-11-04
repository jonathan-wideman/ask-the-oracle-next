import { useState, useRef, useEffect } from "react";
import { useDiceContext } from "../contexts/DiceContext";
import { OracleData } from "../data/oracles";

export const DEFAULT_ORACLE_INITIAL_STATE = "consulting the oracle...";

export const useOracleState = (
  oracle: OracleData,
  rollOnCreate = false,
  initialResult = undefined,
  initialDelay = 50
) => {
  const [tableVisible, setTableVisible] = useState<boolean>(false);
  const [result, setResult] = useState<string>(
    initialResult ?? DEFAULT_ORACLE_INITIAL_STATE
  );
  const { roll } = useDiceContext();
  const [rolling, setRolling] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetAnimation = (delay: number) => {
    timeoutRef.current = setTimeout(() => setRolling(false), delay);
  };
  useEffect(() => {
    if (rollOnCreate) rollOracle(initialDelay);

    // Clear the timeout interval when the component unmounts
    return () => clearTimeout(timeoutRef?.current ?? undefined);
  }, []);

  const rollOracle = (delay = 10) => {
    setRolling(true);
    resetAnimation(delay);
    setResult(roll(oracle));
  };
  const toggleTable = () => setTableVisible((visible) => !visible);

  return {
    tableVisible,
    toggleTable,
    result,
    rolling,
    rollOracle,
  };
};
