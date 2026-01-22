import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/main.css";

import { Router, RouterProvider } from "react-router";
import router from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
