import { NavLink, useOutletContext, useNavigate } from "react-router";

import styles from "./menubar.module.css";
import axios from "axios";

export default function MenuBar() {
  const [currentUser, setCurrentUser] = useOutletContext();
  const navigate = useNavigate();

  function logOut() {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/log-out`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => {
        setCurrentUser(null);
        navigate("/");
      })
      .catch((error) => console.log(`Failed to log out: ${error}`));
  }

  return (
    <nav className={styles.menuBar}>
      <ul>
        {!currentUser ? (
          <>
            <li>
              <NavLink to="/sign-up">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/log-in">Log in</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="view-messages">View Messages</NavLink>
            </li>
            <li>
              <button type="button" onClick={logOut}>
                Log out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
