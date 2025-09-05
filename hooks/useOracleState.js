import { useState, useRef, useEffect } from "react";
import { useDiceContext } from "../contexts/DiceContext";

export const DEFAULT_ORACLE_INITIAL_STATE = "consulting the oracle...";

export const useOracleState = (
  oracle,
  rollOnCreate = false,
  initialResult = undefined,
  initialDelay = 50,
) => {
  const [tableVisible, setTableVisible] = useState(
    initialResult ?? DEFAULT_ORACLE_INITIAL_STATE
  );
  const [result, setResult] = useState(initialResult);
  const { roll } = useDiceContext();
  const [rolling, setRolling] = useState(false);

  const timeoutRef = useRef(null);
  const resetAnimation = (delay) => {
    timeoutRef.current = setTimeout(() => setRolling(false), delay);
  };
  useEffect(() => {
    if (rollOnCreate) rollOracle(initialDelay);

    // Clear the timeout interval when the component unmounts
    return () => clearTimeout(timeoutRef.current);
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
