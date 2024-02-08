import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./i18n/i18n.ts";
import { Css } from "@mui/icons-material";
import { CssBaseline, ThemeProvider, createMuiTheme, createTheme } from "@mui/material";

const theme = createTheme()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    <App />
    </ThemeProvider>
  </React.StrictMode>,
);
