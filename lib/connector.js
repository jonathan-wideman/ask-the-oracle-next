import store from '../data/store'

export function getOracles(categories) {
  // These could instead be fetched from an API, CMS, etc.
  // Since getStaticProps will only be run at build, we can directly import json
  return store.oracles.filter(oracle => !categories || categories.includes(oracle.category))
}

export function getMoves(categories) {
  return store.moves.filter(move => !categories || categories.includes(move.category))
}