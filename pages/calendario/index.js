import React from "react";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import TablaBase from "../../components/tablas/TablaBase";
import { partidosColumnas } from "../../data/web/tablaHeaders";
import { estadoHora } from "../../zustand/horaPolla";
import { Button } from "@mui/material";

export default function Home() {
  const [partidos, setPartidos] = useState([]);
  const { hora, horaCatar, horaColombia, pais } = estadoHora();

  const handleButtonCatar = () => {
    horaCatar();
  };
  const handleButtonColombia = () => {
    horaColombia();
  };

  useEffect(() => {
    async function cargaPartidos() {
      const response = await fetch("/api/partidos");
      const matches = await response.json();
      setPartidos(matches);
    }

    cargaPartidos();
  }, []);
  return (
    <>
      {hora > 0 ? (
        <Button variant="contained" onClick={handleButtonCatar}>
          Cambiar a horario de Catar
        </Button>
      ) : (
        <Button variant="contained" onClick={handleButtonColombia}>
          Cambiar a horario de Colombia
        </Button>
      )}
      <TablaBase datos={partidos} hora={hora} pais={pais} />
    </>
  );
}
