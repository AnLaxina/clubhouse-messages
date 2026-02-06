import styles from "./accesscode.module.css";
import FormButtons from "../../components/FormButtons/FormButtons";

import { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router";
import axios from "axios";

export default function AccessCode() {
  const [_, setCurrentUser] = useOutletContext();
  const [membership, setMembership] = useState("");
  const [admin, setAdmin] = useState("");

  const memberRef = useRef(null);
  const adminRef = useRef(null);

  const navigate = useNavigate();

  // This useEffect is for keeping the inputs in sync with each other
  useEffect(() => {
    if (admin.toLowerCase() === "chicken") {
      adminRef.current.classList.remove("invalidInput");
      adminRef.current.classList.add("validInput");
    } else {
      adminRef.current.classList.remove("validInput");
      adminRef.current.classList.add("invalidInput");
    }

    if (membership.toLowerCase() === "pikachu") {
      memberRef.current.classList.remove("invalidInput");
      memberRef.current.classList.add("validInput");
    } else {
      memberRef.current.classList.remove("validInput");
      memberRef.current.classList.add("invalidInput");
    }
  }, [admin, membership]);

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/check-membership`,
        formValues,
        { withCredentials: true },
      )
      .then((response) => {
        setCurrentUser(response.data.user);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  return (
    <section className={styles.accessCodeSection}>
      <h2>Become a Member or Admin</h2>
      <form action="/api/chicken" method="post" onSubmit={(e) => onSubmit(e)}>
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
            <input
              type="password"
              id="memberCode"
              name="memberCode"
              ref={memberRef}
              onChange={(e) => setMembership(e.target.value)}
            />
          </p>
          <p className={styles.adminCode}>
            <label htmlFor="adminCode">
              Admin Password{" "}
              <em>(Hint: An animal that starts with 'c' and ends in 'n')</em>
            </label>
            <input
              type="password"
              id="adminCode"
              name="adminCode"
              ref={adminRef}
              onChange={(e) => setAdmin(e.target.value)}
            />
          </p>
        </fieldset>

        <FormButtons
          backButtonName="Back"
          backLink="/"
          loadingState={
            membership.toLowerCase() !== "pikachu" &&
            admin.toLowerCase() !== "chicken"
          }
          loadingName="Enter one valid code!"
          submitButtonName="Enter Access Code(s)"
        />
      </form>
    </section>
  );
}
