import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import "react-tabulator/lib/styles.css";
// import "react-tabulator/lib/css/tabulator.min.css";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
