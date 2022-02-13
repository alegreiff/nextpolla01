import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const MiTextField = styled(TextField)(({ theme }) => ({
  width: "80%",
  color: theme.palette.success.main,
  margin: theme.spacing(1),
}));

export const PollaInput = (props) => {
  //console.log("Propiedades", props);
  const {
    id,
    name,
    label,
    value,
    tipo = "text",
    error = null,
    onChange,
    ...other
  } = props;
  //console.log("ERROR MSG", error);
  return (
    <MiTextField
      id={id}
      type={tipo}
      variant="outlined"
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      autoComplete="off"
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  );
};
