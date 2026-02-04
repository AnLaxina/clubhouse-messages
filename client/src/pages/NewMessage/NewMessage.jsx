import styles from "./newmessage.module.css";
import FormButtons from "../../components/FormButtons/FormButtons.jsx";

import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function NewMessage() {
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  function addMessage(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    setLoadingState(true);

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/add-message`,
        formValues,
        {
          withCredentials: true,
        },
      )
      .then(() => navigate("/messages"))
      .finally(() => setLoadingState(false));
  }
  return (
    <div className={styles.newMessageSection}>
      <h2>Create a New Message</h2>
      <form action="/api/add-message" onSubmit={(e) => addMessage(e)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          maxLength={20}
          placeholder="Maximum 20 characters"
          required
        />

        <label htmlFor="text">Message:</label>
        <textarea
          name="text"
          id="text"
          autoCorrect="on"
          maxLength={70}
          placeholder="Maximum 70 characters"
          required
        ></textarea>

        <FormButtons
          backButtonName="Back"
          backLink="/messages"
          submitButtonName="Add Message"
          loadingState={loadingState}
        />
      </form>
    </div>
  );
}
