export const clasificados = [
  { id: 1, oficial: true, confederacion: "ASIA", pais: "Catar" },
  { id: 2, oficial: true, confederacion: "ASIA", pais: "Arabia Saudita" },
  { id: 3, oficial: true, confederacion: "ASIA", pais: "Japón" },
  { id: 4, oficial: true, confederacion: "ASIA", pais: "Irán" },
  { id: 5, oficial: true, confederacion: "ASIA", pais: "Corea del Sur" },
  { id: 6, oficial: true, confederacion: "ÁFRICA", pais: "" },
  { id: 7, oficial: true, confederacion: "ÁFRICA", pais: "" },
  { id: 8, oficial: true, confederacion: "ÁFRICA", pais: "" },
  { id: 9, oficial: true, confederacion: "ÁFRICA", pais: "" },
  { id: 10, oficial: true, confederacion: "ÁFRICA", pais: "" },
  { id: 11, oficial: true, confederacion: "CONCACAF", pais: "" },
  { id: 12, oficial: true, confederacion: "CONCACAF", pais: "" },
  { id: 13, oficial: true, confederacion: "CONCACAF", pais: "" },
  { id: 14, oficial: true, confederacion: "CONMEBOL", pais: "Brasil" },
  { id: 15, oficial: true, confederacion: "CONMEBOL", pais: "Argentina" },
  { id: 16, oficial: true, confederacion: "CONMEBOL", pais: "Ecuador" },
  { id: 17, oficial: true, confederacion: "CONMEBOL", pais: "Uruguay" },
  { id: 18, oficial: true, confederacion: "UEFA", pais: "Alemania" },
  { id: 19, oficial: true, confederacion: "UEFA", pais: "Dinamarca" },
  { id: 20, oficial: true, confederacion: "UEFA", pais: "Francia" },
  { id: 21, oficial: true, confederacion: "UEFA", pais: "Bélgica" },
  { id: 22, oficial: true, confederacion: "UEFA", pais: "Croacia" },
  { id: 23, oficial: true, confederacion: "UEFA", pais: "España" },
  { id: 24, oficial: true, confederacion: "UEFA", pais: "Serbia" },
  { id: 25, oficial: true, confederacion: "UEFA", pais: "Inglaterra" },
  { id: 26, oficial: true, confederacion: "UEFA", pais: "Suiza" },
  { id: 27, oficial: true, confederacion: "UEFA", pais: "Países Bajos" },
  { id: 28, oficial: true, confederacion: "UEFA", pais: "" },
  { id: 29, oficial: true, confederacion: "UEFA", pais: "" },
  { id: 30, oficial: true, confederacion: "UEFA", pais: "" },
  { id: 31, oficial: true, confederacion: "CONMEBOL/ASIA", pais: "" },
  { id: 32, oficial: true, confederacion: "CONCACAF/OCEANIA", pais: "" },
];

export const uefa = [
  ["Escocia", "Ucrania", "Gales"],
  ["Polonia", "Suecia"],
  ["Macedonia del Norte", "Portugal"],
];

export const africa = [
  [
    { pais: "Senegal", opcion: 54 },
    { pais: "Egipto", opcion: 46 },
  ],
  [
    { pais: "Túnez", opcion: 55 },
    { pais: "Mali", opcion: 45 },
  ],
  [
    { pais: "Argelia", opcion: 58 },
    { pais: "Camerún", opcion: 42 },
  ],
  [
    { pais: "Nigeria", opcion: 51 },
    { pais: "Ghana", opcion: 49 },
  ],
  [
    { pais: "Marruecos", opcion: 60 },
    { pais: "RD del Congo", opcion: 40 },
  ],
];

export const suramerica = [
  //{ pais: "Ecuador", opcion: 80 },
  //{ pais: "Uruguay", opcion: 60 },
  { pais: "Perú", opcion: 50 },
  { pais: "Chile", opcion: 30 },
  { pais: "Colombia", opcion: 20 },
  //{ pais: "Bolivia", opcion: 10 },
];
export const asia = [
  //{ pais: "Arabia Saudita", opcion: 90 },
  //{ pais: "Japón", opcion: 80 },
  { pais: "Australia", opcion: 50 },
  { pais: "Emiratos Árabes", opcion: 10 },
  { pais: "Líbano", opcion: 10 },
  { pais: "Irak", opcion: 10 },
];

export const centroamerica = [
  { pais: "Canadá", opcion: 80 },
  { pais: "Estados Unidos", opcion: 60 },
  { pais: "México", opcion: 60 },
  { pais: "Panamá", opcion: 40 },
  { pais: "Costa Rica", opcion: 30 },
];
export const oceania = [
  //{ pais: "Vanuatu", opcion: 10 },
  //{ pais: "Fiji", opcion: 10 },
  { pais: "Islas Salomón", opcion: 10 },
  { pais: "Nueva Zelanda", opcion: 80 },
  { pais: "Tahití", opcion: 20 },
  //{ pais: "Nueva Caledonia", opcion: 5 },
  //{ pais: "Islas Cook", opcion: 5 },

  { pais: "Papúa Nueva Guinea", opcion: 10 },
];

/* 



*/
export const buscaEquipo = (equipos) => {
  return equipos[Math.floor(Math.random() * equipos.length)];
};

export const clasifUefa = () => {
  let clasif = [];
  uefa.forEach((equipos) => {
    clasif.push(buscaEquipo(equipos));
  });
  return clasif;
};

// Utility function to find ceiling of r in arr[l..h]
function findCeil(arr, r, l, h) {
  let mid;
  while (l < h) {
    mid = l + ((h - l) >> 1); // Same as mid = (l+h)/2
    r > arr[mid] ? (l = mid + 1) : (h = mid);
  }
  return arr[l] >= r ? l : -1;
}

// The main function that returns a random number
// from arr[] according to distribution array
// defined by freq[]. n is size of arrays.
export function myRand(arr, freq) {
  let n = arr.length;
  // Create and fill prefix array
  let prefix = [];
  let i;
  prefix[0] = freq[0];
  for (i = 1; i < n; ++i) prefix[i] = prefix[i - 1] + freq[i];

  // prefix[n-1] is sum of all frequencies.
  // Generate a random number with
  // value from 1 to this sum
  let r = Math.floor(Math.random() * prefix[n - 1]) + 1;

  // Find index of ceiling of r in prefix array
  let indexc = findCeil(prefix, r, 0, n - 1);
  return arr[indexc];
}
