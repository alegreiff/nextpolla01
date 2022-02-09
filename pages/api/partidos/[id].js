import { partidos } from "../../../data/schedule";
import { estadios } from "../../../data/cities";

export default function handler(req, res) {
  const { id } = req.query;

  let match = partidos.find((partido) => partido.match === Number(id));

  if (match) {
    const estadio = estadios.find((estadio) => estadio.id === match.estadio);
    match.estadio = estadio;
    res.status(200).json(match);
  } else {
    res.status(200).json({ error: "no hay correspondencias" });
  }
}
