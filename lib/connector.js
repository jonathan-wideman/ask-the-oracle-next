import store from '../data/store'

export function getOracles() {
  // These could instead be fetched from an API, CMS, etc.
  // Since getStaticProps will only be run at build, we can directly import json
  return store.oracles
}