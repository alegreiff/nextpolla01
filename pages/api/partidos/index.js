import { partidos } from "../../../data/schedule";

export default function handler(req, res) {
  res.status(200).json(partidos);
}
