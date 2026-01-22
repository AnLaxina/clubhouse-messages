import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home.jsx";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      { path: "/", Component: MenuBar },
      { path: "/sign-up", Component: SignUp },
    ],
  },
]);

export default router;
