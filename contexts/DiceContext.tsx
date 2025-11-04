import { Random } from "random-js";
import { ReactNode, createContext, useContext } from "react";
import { OracleData } from "../data/oracles";

export type DiceContextType = { roll: (oracle: OracleData) => string };
const defaultContext: DiceContextType = { roll: () => "" };
export const DiceContext = createContext<DiceContextType>(defaultContext);

export function useDiceContext() {
  return useContext(DiceContext);
}

export function DiceProvider({ children }: { children: ReactNode }) {
  const rng = new Random();

  function roll(oracle: OracleData) {
    const max = oracle.max ?? 100;
    const index = rng.die(max) - 1;
    return oracle.results[index];
  }

  return (
    <DiceContext.Provider
      value={{
        roll,
      }}
    >
      {children}
    </DiceContext.Provider>
  );
}
