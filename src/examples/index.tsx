import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { theme } from "../theme";
import TestPage from "./test-page";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <TestPage />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);
