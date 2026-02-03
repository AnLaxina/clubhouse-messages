import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home.jsx";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import ViewMessages from "./pages/ViewMessages/ViewMessages.jsx";
import NewMessage from "./pages/NewMessage/NewMessage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      { path: "/", Component: MenuBar },
      { path: "/sign-up", Component: SignUp },
      { path: "/log-in", Component: LogIn },
      { path: "/messages", Component: ViewMessages },
      { path: "/new-message", Component: NewMessage },
    ],
  },
]);

export default router;
