import { clasificados, clasifUefa } from "../../../data/api/clasificados";

let equipos = clasificados.filter((equipo) => equipo.pais != "");
equipos = equipos.map((equipo) => [
  equipo.pais,
  equipo.confederacion,
  equipo.oficial,
]);

const uefa = clasifUefa();

uefa.forEach((eq) => {
  equipos.push([eq, "UEFA", false]);
});

export default function handler(req, res) {
  res.status(200).json(equipos);
}
