import styles from "./login.module.css";
import FormButtons from "../../components/FormButtons/FormButtons.jsx";

import axios from "axios";

export default function LogIn() {
  function login(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    console.log(`Sending values to backend ${formValues}`);
    axios
      .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/log-in`, formValues, {
        withCredentials: true,
      })
      .catch((error) => console.log(error.response.data));
  }
  return (
    <section className={styles.loginSection}>
      <h2>Log In</h2>
      <form action="/log-in" method="POST" onSubmit={(e) => login(e)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />

        <FormButtons
          backButtonName={"Back"}
          backLink={"/"}
          submitButtonName={"Login"}
        />
      </form>
    </section>
  );
}
