import { createTheme } from "@mui/styles";

declare module "@mui/material/styles" {
  interface Theme {
    // Тут можна додати власні властивості теми
  }
  interface ThemeOptions {
    // Тут можна додати власні опції теми
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#f50057"
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
  // Інші налаштування теми
});
