import React, { useEffect, useState } from "react";
import {
  clasificados,
  uefa,
  africa,
  myRand,
  suramerica,
  centroamerica,
  oceania,
  asia,
} from "../../data/api/clasificados";
import Grid from "@mui/material/Grid";
import { Alert, Box, Button, Chip } from "@mui/material";

import EuroPath from "../../public/europath.jpeg";
import Image from "next/image";
import estilos from "./equipos.module.css";
import { BotonEquipoClasificado } from "../../components/elementos/BotonEquipoClasificado";

export default function PageEquipos() {
  const [ceros, setCeros] = useState(false);
  const [uefaLeyenda, setUefaLeyenda] = useState("Definir Europa");
  const [conmebolLeyenda, setConmebolLeyenda] = useState(
    "Definir cupo a repechaje Conmebol"
  );
  const [asiaLeyenda, setAsiaLeyenda] = useState(
    "Definir cupo a repechaje Asia"
  );
  const [concacafLeyenda, setConcacafLeyenda] = useState("Definir Concacaf");
  const [africaLeyenda, setAfricaLeyenda] = useState("Definir África");
  const [oceaniaLeyenda, setOceaniaLeyenda] = useState(
    "Definir cupo a repechaje Oceanía"
  );
  const [conmebolAsiaLeyenda, setConmebolAsiaLeyenda] = useState(
    "Definir repesca Conmebol - Asia"
  );
  const [concacafOceaniaLeyenda, setConcacafOceaniaLeyenda] = useState(
    "Definir repesca Concacaf - Oceanía"
  );

  const [teamsQualif, setTeamsQualif] = useState([]);
  const [repescaA, setRepescaA] = useState([]);
  const [repescaB, setRepescaB] = useState([]);
  const [paisesAfrica, setPaisesAfrica] = useState([]);

  useEffect(() => {
    const tempora = clasificados.filter((equipo) => equipo.pais != "");
    setTeamsQualif(tempora);
    setRepescaA([]);
    setRepescaB([]);
  }, []);

  useEffect(() => {
    if (ceros) {
      const tempora = clasificados.filter((equipo) => equipo.pais != "");
      setTeamsQualif(tempora);
      setRepescaA([]);
      setRepescaB([]);
    }
    setCeros(false);
  }, [ceros]);

  useEffect(() => {
    let tempoAfrica = [];
    africa.forEach((llave) => {
      llave.forEach((pais) => {
        tempoAfrica.push(pais.pais);
      });
    });
    setPaisesAfrica(tempoAfrica);
  }, []);

  const addPais = (pais) => {
    const nuevo = { pais, oficial: false, confederacion: "UEFA" };
    let nuevas = [...teamsQualif, nuevo];
    setTeamsQualif((state) => [...teamsQualif, nuevo]);
    return true;
  };

  const buscaEquipo = (equipos) => {
    return equipos[Math.floor(Math.random() * equipos.length)];
  };

  const clasifUefa = () => {
    const resetUefa = teamsQualif.filter((item) => item.id != 50);
    setTeamsQualif(resetUefa);

    uefa.forEach((equipos) => {
      let pais = buscaEquipo(equipos);
      let nuevo = { id: 50, oficial: false, confederacion: "UEFA", pais };
      setTeamsQualif((estado) => [...estado, nuevo]);
    });
    setUefaLeyenda("Volver a barajar Europa");
  };

  const clasifAfrica = () => {
    const resetAfrica = teamsQualif.filter((item) => item.id != 100);
    setTeamsQualif(resetAfrica);
    let cupos = [];
    africa.forEach((llave) => {
      let arreglo = [];
      let frecuencia = [];

      llave.forEach((pais) => {
        arreglo.push(pais.pais);
        frecuencia.push(pais.opcion);
      });

      let pais = myRand(arreglo, frecuencia);
      cupos.push({ id: 100, oficial: false, confederacion: "ÁFRICA", pais });
    });

    cupos.forEach((item) => {
      setTeamsQualif((estado) => [...estado, item]);
    });
    setAfricaLeyenda("Volver a barajar África");
  };

  const aleatoriosAsia = () => {
    const resetAsia = teamsQualif.filter(
      (item) => item.id != 77 && item.id != 98
    );
    setConmebolAsiaLeyenda("Definir repesca Conmebol - Asia");
    setTeamsQualif(resetAsia);
    const resetRepescaA = repescaA.filter(
      (item) => item.confederacion != "ASIA"
    );
    setRepescaA(resetRepescaA);
    let arreglo = [];
    let frecuencia = [];

    //let asiaGrupoA = [asia[0], asia[1], asia[2]];
    let asiaGrupoA = [asia[0]];

    let asiaGrupoB = [asia[1]];

    asiaGrupoA.forEach((item) => {
      arreglo.push(item.pais);
      frecuencia.push(item.opcion);
    });

    let cupos = [];
    let pais = myRand(arreglo, frecuencia);
    /* cupos.push({ id: 77, oficial: false, confederacion: "ASIA", pais });
    arreglo = arreglo.filter((eq) => eq != pais);
    pais = myRand(arreglo, frecuencia);
    cupos.push({ id: 77, oficial: false, confederacion: "ASIA", pais });*/
    //arreglo = arreglo.filter((eq) => eq != pais);

    cupos.forEach((item) => {
      setTeamsQualif((estado) => [...estado, item]);
    });

    pais = myRand(arreglo, frecuencia);
    let nuevo = { pais, opcion: 50 };
    asiaGrupoB.push(nuevo);
    let arregloB = [];
    let frecuenciaB = [];
    asiaGrupoB.forEach((item) => {
      arregloB.push(item.pais);
      frecuenciaB.push(item.opcion);
    });
    console.log(arregloB);
    let repesca = myRand(arregloB, frecuenciaB);
    console.log("ASIA", repesca);
    let nuevoRepesca = {
      id: 98,
      oficial: false,
      confederacion: "ASIA",
      pais: repesca,
      opcion: 20,
    };
    setRepescaA((estado) => [...estado, nuevoRepesca]);
    setAsiaLeyenda("Volver a barajar Asia");
  };

  const aleatoriosOceania = () => {
    const resetRepescaBX = teamsQualif.filter((item) => item.id != 99);
    setTeamsQualif(resetRepescaBX);
    const resetRepescaB = repescaB.filter(
      (item) => item.confederacion != "OCEANÍA"
    );
    setConcacafOceaniaLeyenda("Definir repesca Concacaf - Oceanía");

    setRepescaB(resetRepescaB);
    let arreglo = [];
    let frecuencia = [];
    oceania.forEach((item) => {
      arreglo.push(item.pais);
      frecuencia.push(item.opcion);
    });
    let cupos = [];
    let pais = myRand(arreglo, frecuencia);
    let nuevo = {
      id: 99,
      oficial: false,
      confederacion: "OCEANÍA",
      pais,
      opcion: 35,
    };
    setRepescaB((estado) => [...estado, nuevo]);
    setOceaniaLeyenda("Volver a barajar Oceanía");
  };

  const aleatoriosConcacaf = () => {
    const resetConcacaf = teamsQualif.filter(
      (item) => item.id != 54 && item.id != 99
    );
    setConcacafOceaniaLeyenda("Definir repesca Concacaf - Oceanía");
    setTeamsQualif(resetConcacaf);
    const resetRepescaB = repescaB.filter(
      (item) => item.confederacion != "CONCACAF"
    );
    setRepescaB(resetRepescaB);
    let arreglo = [];
    let frecuencia = [];
    centroamerica.forEach((item) => {
      arreglo.push(item.pais);
      frecuencia.push(item.opcion);
    });
    let cupos = [];
    let pais = myRand(arreglo, frecuencia);
    cupos.push({ id: 54, oficial: false, confederacion: "CONCACAF", pais });
    arreglo = arreglo.filter((eq) => eq != pais);

    pais = myRand(arreglo, frecuencia);
    cupos.push({ id: 54, oficial: false, confederacion: "CONCACAF", pais });
    arreglo = arreglo.filter((eq) => eq != pais);

    //pais = myRand(arreglo, frecuencia);
    //cupos.push({ id: 54, oficial: false, confederacion: "CONCACAF", pais });

    arreglo = arreglo.filter((eq) => eq != pais);

    pais = myRand(arreglo, frecuencia);
    let nuevo = {
      id: 99,
      oficial: false,
      confederacion: "CONCACAF",
      pais,
      opcion: 75,
    };
    setRepescaB((estado) => [...estado, nuevo]);
    cupos.forEach((item) => {
      setTeamsQualif((estado) => [...estado, item]);
    });
    setConcacafLeyenda("Volver a barajar Concacaf");
  };

  const defineConmebol = () => {
    const resetConmebol = teamsQualif.filter(
      (item) => item.id != 55 && item.id != 98
    );
    setConmebolAsiaLeyenda("Definir repesca Conmebol - Asia");
    setTeamsQualif(resetConmebol);
    const resetRepescaA = repescaA.filter(
      (item) => item.confederacion != "CONMEBOL"
    );
    setRepescaA(resetRepescaA);
    let arreglo = [];
    let frecuencia = [];
    suramerica.forEach((item) => {
      arreglo.push(item.pais);
      frecuencia.push(item.opcion);
    });
    let cupos = [];
    let pais = myRand(arreglo, frecuencia);
    /*cupos.push({ id: 55, oficial: false, confederacion: "CONMEBOL", pais });
    arreglo = arreglo.filter((eq) => eq != pais);
    pais = myRand(arreglo, frecuencia);
    cupos.push({ id: 55, oficial: false, confederacion: "CONMEBOL", pais }); */
    arreglo = arreglo.filter((eq) => eq != pais);
    pais = myRand(arreglo, frecuencia);
    let nuevo = {
      id: 98,
      oficial: false,
      confederacion: "CONMEBOL",
      pais,
      opcion: 80,
    };
    setRepescaA((estado) => [...estado, nuevo]);

    cupos.forEach((item) => {
      setTeamsQualif((estado) => [...estado, item]);
    });
    setConmebolLeyenda("Volver a barajar Conmebol");
  };

  const defineRepescaA = () => {
    const resetResultadoRepescaA = teamsQualif.filter((item) => item.id != 98);
    setTeamsQualif(resetResultadoRepescaA);
    let arreglo = [];
    let frecuencia = [];
    repescaA.forEach((item) => {
      arreglo.push(item.pais);
      frecuencia.push(item.opcion);
    });
    let pais = myRand(arreglo, frecuencia);
    let nuevo = {
      id: 98,
      oficial: false,
      confederacion: repescaA.find((p) => p.pais === pais).confederacion + " *",
      pais,
    };
    setTeamsQualif((estado) => [...estado, nuevo]);
    setConmebolAsiaLeyenda("Volver a barajar esta repesca");
  };

  const defineRepescaB = () => {
    const resetResultadoRepescaB = teamsQualif.filter((item) => item.id != 99);
    setTeamsQualif(resetResultadoRepescaB);
    let arreglo = [];
    let frecuencia = [];

    repescaB.forEach((item) => {
      arreglo.push(item.pais);
      frecuencia.push(item.opcion);
    });

    let pais = myRand(arreglo, frecuencia);

    let nuevo = {
      id: 99,
      oficial: false,
      confederacion: repescaB.find((p) => p.pais === pais).confederacion + " *",
      pais,
    };
    setTeamsQualif((estado) => [...estado, nuevo]);
    setConcacafOceaniaLeyenda("Volver a barajar esta repesca");
  };

  const dameClasificados = () => {
    clasifUefa();
    clasifAfrica();
    defineConmebol();
    aleatoriosOceania();
    aleatoriosConcacaf();
    aleatoriosAsia();
    funUno();
    funDos();
  };
  const funUno = () => {
    console.log("UNO");
  };
  const funDos = () => {
    console.log("Dos");
  };

  const reinicio = () => {
    setCeros(true);
  };
  return (
    <>
      <Grid container spacing={3} mt={5}>
        <Grid item>
          <Box textAlign="center">
            <Button onClick={reinicio}>Reiniciar {ceros}</Button>
          </Box>

          <Box textAlign="center">
            <Button onClick={clasifUefa}>{uefaLeyenda} (+ 1)</Button>
          </Box>

          {/* <Box textAlign="center">
            <Button onClick={clasifAfrica}>{africaLeyenda} (+ 5)</Button>
          </Box> */}

          <Box textAlign="center">
            <Button onClick={defineConmebol}>{conmebolLeyenda} (+ 0.5)</Button>
          </Box>

          <Box textAlign="center">
            <Button onClick={aleatoriosConcacaf}>
              {concacafLeyenda} (+ 2.5)
            </Button>
          </Box>
          <Box textAlign="center">
            <Button onClick={aleatoriosAsia}>{asiaLeyenda} (+ 0.5)</Button>
          </Box>

          <Box textAlign="center">
            <Button onClick={aleatoriosOceania}>
              {oceaniaLeyenda} (+ 0.5)
            </Button>
          </Box>

          <Box border={1} mt={2} sx={{ padding: 1 }}>
            <p>Conmebol - Asia</p>
            {repescaA.map((item, i) => (
              <Chip
                key={i}
                className={estilos.chip}
                label={item.pais}
                variant="outlined"
              />
            ))}
            {repescaA.length === 2 && (
              <Box textAlign="center">
                <Button onClick={defineRepescaA}>{conmebolAsiaLeyenda}</Button>
              </Box>
            )}
          </Box>

          <Box border={1} mt={2} sx={{ padding: 1 }}>
            <p>Concacaf - Oceanía</p>

            {repescaB.map((item, i) => (
              <Chip
                key={i}
                className={estilos.chip}
                label={item.pais}
                variant="outlined"
              />
            ))}
            {repescaB.length === 2 && (
              <Box textAlign="center">
                <Button onClick={defineRepescaB}>
                  {concacafOceaniaLeyenda}
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <span className={estilos.total}>{teamsQualif.length}</span>
          <Grid container spacing={2}>
            {teamsQualif.map((eq, i) => (
              <Grid key={i} item xs={6} md={3}>
                <BotonEquipoClasificado equipo={eq} />

                {/* <Button
                  color={!eq.oficial ? "warning" : "info"}
                  variant="outlined"
                  sx={{ width: "100%" }}
                >
                  {eq.pais}
                </Button> */}
              </Grid>
            ))}
          </Grid>

          <Grid container>
            <Grid container mt={4} className={estilos.bordered}>
              <Grid item xs={12}>
                <Alert severity="info">
                  <strong>UEFA</strong> Quedan vivos tres equipos para un cupo.
                </Alert>
              </Grid>
              {uefa.map(
                (grupo, i) =>
                  i === 0 && (
                    <Grid item key={i} xs={12} md={4}>
                      <Box textAlign="center">Llave {i + 1}</Box>
                      {grupo.map((item, j) => (
                        <Box key={j} textAlign="center">
                          <Chip
                            className={estilos.chip}
                            label={item}
                            variant="outlined"
                          />
                        </Box>
                      ))}
                    </Grid>
                  )
              )}
            </Grid>

            {/* <Grid container mt={4} className={estilos.bordered}>
              <Grid item xs={12}>
                <Alert severity="info">
                  <strong>CAF</strong> Hay cinco llaves con eliminación directa.
                  Clasifican los 5 equipos ganadores.
                </Alert>
              </Grid>
              {paisesAfrica.map((item, f) => (
                <Grid item key={f} xs={6}>
                  <Box textAlign="center">
                    <Chip
                      className={estilos.chip}
                      label={item}
                      variant="outlined"
                      color={[2, 3, 6, 7].includes(f) ? "primary" : "success"}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid> */}

            <Grid container mt={4} className={estilos.bordered}>
              <Grid item xs={12}>
                <Alert severity="info">
                  <strong>CONMEBOL</strong> Queda un cupo a repechaje contra
                  Asia.
                </Alert>
              </Grid>
              {suramerica.map((item, k) => (
                <Grid item key={k} xs={12} md={4}>
                  <Box textAlign="center">
                    <Chip
                      className={estilos.chip}
                      label={item.pais}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Grid container mt={4} className={estilos.bordered}>
              <Grid item xs={12}>
                <Alert severity="info">
                  <strong>CONCACAF</strong> Quedan 2 cupos directos. Y un cupo a
                  repechaje contra Oceania.
                </Alert>
              </Grid>
              {centroamerica.map((item, k) => (
                <Grid item key={k} xs={12} md={4}>
                  <Box textAlign="center">
                    <Chip
                      className={estilos.chip}
                      label={item.pais}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Grid container mt={4} className={estilos.bordered}>
              <Grid item xs={12}>
                <Alert severity="info">
                  <strong>OCEANÍA</strong> Pelean por un cupo a repechaje contra
                  Concacaf.
                </Alert>
              </Grid>
              {oceania.map((item, k) => (
                <Grid item key={k} xs={6} md={6}>
                  <Box textAlign="center">
                    <Chip
                      color={k % 2 == 0 ? "primary" : "success"}
                      className={estilos.chip}
                      label={item.pais}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Grid container mt={4} className={estilos.bordered}>
              <Grid item xs={12}>
                <Alert severity="info">
                  <strong>ASIA</strong> Estos dos equipos van por un cupo a
                  repechaje contra Conmebol.
                </Alert>
              </Grid>
              {asia.map((item, w) => (
                <Grid item key={w} xs={12} md={4}>
                  <Box textAlign="center">
                    <Chip
                      className={estilos.chip}
                      label={item.pais}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
