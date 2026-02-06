import { createTheme, ThemeOptions } from "@mui/material/styles";

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#b0b0b0" },
  },
  typography: {
    fontFamily: `"Roboto", "Arial", sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "white",
          fontFamily: `"Maximum Impact", sans-serif`,
        },
        "::-webkit-scrollbar": {
          background: "transparent",
        },
        "::-webkit-scrollbar-thumb:horizontal": {
          background: "rgba(0, 0, 0, 0.61)",
          borderRadius: "10px",
        },
      },
    },
  },
});
