// Next.js API dynamic route support: https://nextjs.org/docs/api-routes/dynamic-api-routes

import { getOracles } from "../../../lib/connector";

export default function handler(req, res) {
  res.status(200).json({oracles: getOracles()})
}
