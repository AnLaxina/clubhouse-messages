import styles from "./login.module.css";
import FormButtons from "../../components/FormButtons/FormButtons.jsx";

import axios from "axios";
import { useState } from "react";

export default function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCreds, setInvalidCreds] = useState(false);

  function login(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/log-in`, formValues, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setInvalidCreds(false);
      })
      .catch(() => setInvalidCreds(true))
      .finally(() => setIsLoading(false));
  }
  return (
    <section className={styles.loginSection}>
      <h2>Log In</h2>
      <form action="/log-in" method="POST" onSubmit={(e) => login(e)}>
        {invalidCreds && (
          <h3 className={styles.invalid}>Invalid username or password!</h3>
        )}
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />

        <FormButtons
          backButtonName={"Back"}
          backLink={"/"}
          submitButtonName={"Login"}
          loadingState={isLoading}
        />
      </form>
    </section>
  );
}
