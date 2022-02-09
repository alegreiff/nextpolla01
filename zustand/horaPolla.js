import create from "zustand";
import { devtools } from "zustand/middleware";

let useStore = (set) => ({
  hora: 8,
  horaColombia: () => set((state) => ({ hora: 8 })),
  horaCatar: () => set((state) => ({ hora: 0 })),
});

useStore = devtools(useStore, { name: "AUTH" });

export const estadoHora = create(useStore);
