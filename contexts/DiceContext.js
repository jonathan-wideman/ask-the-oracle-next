import { Random } from "random-js";
import { React, createContext, useContext, useState } from "react"

export const DiceContext = createContext()

export function useDiceContext() {
  return useContext(DiceContext)
}

export function DiceProvider({ children }) {

  const rng = new Random()

  function roll(oracle) {
    const max = oracle.max ?? 100
    const index = rng.die(max) - 1
    return oracle.results[index]
  }

  return (
    <DiceContext.Provider value={{
      roll
    }}>
      {children}
    </DiceContext.Provider>
  )
}