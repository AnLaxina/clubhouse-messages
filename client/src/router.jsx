import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home.jsx";
import MenuBar from "./components/MenuBar/MenuBar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [{ path: "/", Component: MenuBar }],
  },
]);

export default router;
