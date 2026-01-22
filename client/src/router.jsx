import { createBrowserRouter } from "react-router";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);

export default router;
