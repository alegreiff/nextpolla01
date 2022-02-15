/**
 * Propiedades especiales:
 * auth: true = requiere hacer login
 * auth: false = solo visible antes de hacer login
 * visible: true = siempre visible
 */
export const menu = [
  { id: 0, titulo: "Acceso", enlace: "/acceso", tipo: "home", auth: true },
  { id: 100, titulo: "Inicio", enlace: "/", tipo: "home", auth: true },
  {
    id: 101,
    titulo: "Calendario",
    enlace: "/calendario",
    tipo: "content",
    auth: false,
    visible: true,
  },
  {
    id: 102,
    titulo: "Formularios",
    enlace: "/formularios",
    tipo: "content",
    auth: true,
  },
  {
    id: 105,
    titulo: "Equipos",
    enlace: "/equipos",
    tipo: "content",
    auth: false,
    visible: true,
  },
];
