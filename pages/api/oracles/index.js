// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getOracles } from "../../../lib/connector";

export default function handler(req, res) {
  res.status(200).json({oracles: getOracles()})
}
