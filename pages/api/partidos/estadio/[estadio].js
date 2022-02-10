import { partidos } from "../../../../data/api/schedule";
import { errores } from "../../../../data/api/errores";

export default function handler(req, res) {
  const { estadio } = req.query;

  let matches = partidos.filter((match) => match.estadio === Number(estadio));
  console.log(matches);

  if (matches.length) {
    res.status(200).json(matches);
  } else {
    res.status(200).json(errores);
  }
}
