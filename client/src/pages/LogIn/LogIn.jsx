import styles from "./login.module.css";
import FormButtons from "../../components/FormButtons/FormButtons.jsx";
export default function LogIn() {
  return (
    <section className={styles.loginSection}>
      <h2>Log In</h2>
      <form action="/log-in" method="POST">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <FormButtons
          backButtonName={"Back"}
          backLink={"/"}
          submitButtonName={"Login"}
        />
      </form>
    </section>
  );
}
