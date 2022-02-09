import { partidos } from "../../../../data/schedule";
import { errores } from "../../../../data/errores";

export default function handler(req, res) {
  const { grupo } = req.query;
  let matches = partidos.filter((partido) => partido.grupo);
  matches = matches.filter((match) => match.grupo === grupo.toUpperCase());
  console.log(matches);

  if (matches.length) {
    res.status(200).json(matches);
  } else {
    res.status(200).json(errores);
  }
}
