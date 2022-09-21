// Next.js API dynamic route support: https://nextjs.org/docs/api-routes/dynamic-api-routes

import { getOracles } from "../../../../lib/connector";

export default function handler(req, res) {
  const { slug } = req.query

  const oracle = getOracles().find(oracle => oracle.slug === slug)

  if (oracle == null) { res.status(404).json({ message: 'Not Found' }) }

  res.status(200).json({ oracle })
}
