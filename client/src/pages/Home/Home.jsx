import { Outlet } from "react-router";
import { useState } from "react";

import styles from "./home.module.css";
export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {!currentUser ? (
        <header>
          <h1>Welcome to the Clubhouse!</h1>
        </header>
      ) : (
        <header>
          <h1>Welcome to the Clubhouse, {currentUser.username}!</h1>
        </header>
      )}
      <main>
        <Outlet context={[currentUser, setCurrentUser]}></Outlet>
      </main>
      <footer>
        <p>2026 AnLaxina</p>
      </footer>
    </>
  );
}
