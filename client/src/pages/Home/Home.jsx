import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./home.module.css";
export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/check-logged-in`, {
        withCredentials: true,
      })
      .then((response) => {
        setCurrentUser(response.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

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
