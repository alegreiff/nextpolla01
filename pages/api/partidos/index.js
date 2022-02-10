import { partidos } from "../../../data/api/schedule";

export default function handler(req, res) {
  res.status(200).json(partidos);
}
