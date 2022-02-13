import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { PollaButton } from "../../components/formularios/controles/PollaButton";
import { PollaFormulario } from "../../components/formularios/controles/PollaFormulario";
import { PollaInput } from "../../components/formularios/controles/PollaInput";
import classes from "../../styles/errores.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "next-auth/react";

const validationSchema = yup.object({
  campoCorreo: yup
    .string()
    .email("Debe ser un correo")
    .required("El correo se menesta"),
  campoPassword: yup.string().required("Obveo").min(6, "Seis por lo menos"),
});

export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      campoCorreo: "",
      campoPassword: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      createUser(values.campoCorreo, values.campoPassword);
    },
    onChange: () => {
      console.log(formik);
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const loggIn = async (email, password) => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("HOME RES", { result });
  };

  const createUser = async (email, password) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Algo salió remal");
    } else {
      console.log({ response });
      await loggIn(email, password);
    }
    console.log("DATA", data);

    return data;
  };

  return (
    <>
      <Box sx={{ mx: "auto", textAlign: "center" }}>
        <PollaFormulario onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <PollaInput
                id="correo"
                label="correo"
                name="campoCorreo"
                value={formik.values.campoCorreo}
                onChange={formik.handleChange}
                error={
                  formik.touched.campoCorreo &&
                  Boolean(formik.errors.campoCorreo)
                }
                helperText={
                  formik.touched.campoCorreo && formik.errors.campoCorreo
                }
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PollaInput
                label="password"
                name="campoPassword"
                id="password"
                value={formik.values.campoPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.campoPassword &&
                  Boolean(formik.errors.campoPassword)
                }
                helperText={
                  formik.touched.campoPassword && formik.errors.campoPassword
                }
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
          <PollaButton
            disabled={!(formik.isValid && formik.dirty)}
            text="Mande"
            type="submit"
          ></PollaButton>
        </PollaFormulario>
      </Box>
    </>
  );
}
