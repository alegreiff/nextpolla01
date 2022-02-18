import { Chip } from "@mui/material";
import React from "react";

export const BotonEquipoClasificado = ({ equipo }) => {
  //console.log(equipo);
  return (
    <>
      <Chip
        label={equipo.pais}
        color={equipo.oficial ? "info" : "warning"}
        sx={{ width: "100%" }}
      />
      <Chip
        label={equipo.confederacion}
        size="small"
        variant="outlined"
        sx={{ width: "100%" }}
      />
    </>
  );
};
/*

<Button
                  color={!eq.oficial ? "warning" : "info"}
                  variant="outlined"
                  sx={{ width: "100%" }}
                >
                  {eq.pais}
                </Button>

                <h5>
        <span>{equipo.id}</span>
      </h5>
*/
