import FormButtons from "../../components/FormButtons/FormButtons.jsx";
import styles from "./signup.module.css";

import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [loadingState, setLoadingState] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);

  function submitForm(event) {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    setLoadingState(true);
    axios
      .post(`${baseUrl}/sign-up`, formValues, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setInvalidUsername(false);
      })
      .catch((error) => {
        console.log(`Error: ${error.response.data.message}`);
        setInvalidUsername(true);
      })
      .finally(() => setLoadingState(false));
  }

  return (
    <section className={styles.signupSection}>
      <h2>Sign Up</h2>
      <form action="/sign-up" method="POST" onSubmit={(e) => submitForm(e)}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" required />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required />

        {invalidUsername ? (
          <label htmlFor="username" className={styles.invalidUsername}>
            Username is taken!
          </label>
        ) : (
          <label htmlFor="username">Username</label>
        )}

        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <fieldset>
          <legend>Membership Status</legend>
          <p>
            To see the author and date of each message, enter the membership
            password. If it's correct, you are part of the elite club!
          </p>
          <p>
            If you are an admin, you do not need to enter the membership
            password. You can also delete/edit messages!
          </p>
          <p className={styles.memberCode}>
            <label htmlFor="memberCode">
              Membership Password <em>(Hint: The Pokémon mascot!)</em>
            </label>
            <input type="password" id="memberCode" name="memberCode" />
          </p>
          <p className={styles.adminCode}>
            <label htmlFor="adminCode">
              Admin Password{" "}
              <em>(Hint: An animal that starts with 'c' and ends in 'n')</em>
            </label>
            <input type="password" id="adminCode" name="adminCode" />
          </p>
        </fieldset>

        <FormButtons
          backButtonName={"Back"}
          backLink={"/"}
          submitButtonName={"Sign Up"}
          loadingState={loadingState}
        />
      </form>
    </section>
  );
}
