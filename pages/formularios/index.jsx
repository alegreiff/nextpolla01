import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React from "react";

export default function FormasPage() {
  return (
    <FormControl>
      <InputLabel htmlFor="input2">Correo electrónico</InputLabel>
      <Input id="input2" aria-describedby="mihelper1" />
      <FormHelperText id="mihelper1">No se mostrará</FormHelperText>
    </FormControl>
  );
}
