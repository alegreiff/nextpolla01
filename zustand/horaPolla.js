import create from "zustand";
import { devtools } from "zustand/middleware";

let useStore = (set) => ({
  hora: 8,
  pais: "Colombia",
  horaColombia: () => set((state) => ({ hora: 8, pais: "Colombia" })),
  horaCatar: () => set((state) => ({ hora: 0, pais: "Catar" })),
});

useStore = devtools(useStore, { name: "AUTH" });

export const estadoHora = create(useStore);
