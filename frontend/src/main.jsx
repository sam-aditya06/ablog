import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { UserContextProvider } from "./utils/userModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </StyledEngineProvider>
);