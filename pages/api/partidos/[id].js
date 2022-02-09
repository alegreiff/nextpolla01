import { partidos } from "../../../data/schedule";

export default function handler(req, res) {
  const { id } = req.query;

  const matches = partidos.find((partido) => partido.match === Number(id));
  if (matches) {
    res.status(200).json(matches);
  } else {
    res.status(200).json({ error: "no hay correspondencias" });
  }
}
