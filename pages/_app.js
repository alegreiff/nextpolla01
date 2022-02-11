import React from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";

import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/globals.css";
import "../styles/estilos.css";
import { MainLayout } from "../components/layouts/MainLayout";
import { SessionProvider } from "next-auth/react";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <SessionProvider>
          <CssBaseline />
          <Container>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </Container>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
