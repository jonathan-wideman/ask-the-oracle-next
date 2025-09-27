import { getOracleListing } from "../data/oracles";
import store from "../data/store";

// Oracles

export function getOracle(slug) {
  return store.oracles.find((oracle) => oracle.slug === slug);
}

export function getOraclesBySlugs(slugs) {
  return store.oracles.filter((oracle) => slugs.includes(oracle.slug));
}

export function getOracles(categories) {
  // These could instead be fetched from an API, CMS, etc.
  // Since getStaticProps will only be run at build, we can directly import json
  return store.oracles.filter(
    (oracle) => !categories || categories.includes(oracle.category)
  );
}

export function getOraclesListings(categories) {
  return store.oracles
    .filter((oracle) => !categories || categories.includes(oracle.category))
    .map((oracle) => getOracleListing(oracle));
}

export function getOraclesCategories() {
  return [...new Set(store.oracles.map((oracle) => oracle.category))];
}

// Moves

export function getMoves(categories) {
  return store.moves.filter(
    (move) => !categories || categories.includes(move.category)
  );
}

export function getMovesListings(categories) {
  return store.moves
    .filter((move) => !categories || categories.includes(move.category))
    .map((move) => ({
      name: move.name,
      category: move.category,
    }));
}

export function getAllMovesNames() {
  return store.moves.map((move) => move.name);
}

export function getMovesCategories() {
  return [...new Set(store.moves.map((move) => move.category))];
}
