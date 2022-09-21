// Next.js API dynamic route support: https://nextjs.org/docs/api-routes/dynamic-api-routes

import { Random } from "random-js";
import { getOracles } from "../../../../lib/connector";

export default function handler(req, res) {
  const { slug, value } = req.query

  const oracle = getOracles().find(oracle => oracle.slug === slug)

  if (oracle == null) { res.status(404).json({ message: 'Not Found' }) }

  let index = value
  if (index === 'random') {
    const rng = new Random()
    const max = oracle.max ?? 100
    index = rng.die(max) - 1
  }
  const result = oracle.results[index]

  if (result == null) { res.status(404).json({ message: 'Not Found' }) }

  // if we found a result in the roll table, we can be assured the index is an int
  const roll = parseInt(index) + 1

  res.status(200).json({ roll, result })
}
