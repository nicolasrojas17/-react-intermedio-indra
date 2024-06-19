import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { theme } from "./style/theme.ts";
import UserContextProvider from "./hooks/UserContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <CssBaseline />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
);
