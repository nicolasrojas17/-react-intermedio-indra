import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#214481",
    },
    secondary: {
      main: "#FFFFFF",
    },
    error: {  
      main: "#f44336",
    },
  },
});
