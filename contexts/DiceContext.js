import { Random } from "random-js";
import { React, createContext, useContext, useState } from "react"

export const DiceContext = createContext()

export function useDiceContext() {
  return useContext(DiceContext)
}

export function DiceProvider({ children }) {

  const rng = new Random()

  // FIXME: look up result in table
  const lookup = (value) => `foo ${value}`

  function roll(oracle) {
    //FIXME: generate max rool, better roll tables at build time
    const max = oracle.max ?? 100
    const value = rng.die(max)
    return lookup(value)
  }

  return (
    <DiceContext.Provider value={{
      roll
    }}>
      {children}
    </DiceContext.Provider>
  )
}