import { NavLink } from "react-router";

import styles from "./menubar.module.css";

export default function MenuBar() {
  return (
    <nav className={styles.menuBar}>
      <ul>
        <li>
          <NavLink to="/sign-up">Sign up</NavLink>
        </li>
        <li>
          <NavLink to="/log-in">Log in</NavLink>
        </li>
        <li>
          <NavLink to="view-messages">View Messages</NavLink>
        </li>
      </ul>
    </nav>
  );
}
