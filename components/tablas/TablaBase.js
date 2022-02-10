import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import moment from "moment";
import { useEffect, useState } from "react";
export default function TablaBase({ hora, pais, datos }) {
  const [partidos, setPartidos] = useState([]);
  useEffect(() => {
    let data = datos.filter((dato) => dato.grupo);
    setPartidos(data);
  }, [datos]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">#</TableCell>
            <TableCell>Partido</TableCell>
            <TableCell align="right">Fase</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">{pais}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {partidos.map((row) => (
            <TableRow
              key={row.match}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.match}</TableCell>
              <TableCell component="th" scope="row">
                {row.team1} vs {row.team2}
              </TableCell>
              <TableCell align="right">{row.fase}</TableCell>
              <TableCell align="right">{row.fecha}</TableCell>

              <TableCell align="right">
                {moment(row.fecha, "DD-MM-YYYY")
                  .set({ hour: row.hour - hora })
                  .format("MMM D h:mm:ss a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
