import styles from "./messages.module.css";

import { formatDistanceToNowStrict, formatISO } from "date-fns";
import { useEffect, useRef } from "react";
import { CircleX, Dot } from "lucide-react";

import axios from "axios";

export default function Messages({ data, isAdmin, isMember, setMessages }) {
  const dialogRef = useRef(undefined);
  useEffect(() => {
    async function getUsernames() {
      const oldMessages = [];
      for (const message of data) {
        const username = await getUsername(message.user_id);
        oldMessages.push({ ...message, username: username });
      }
      setMessages(oldMessages);
    }
    getUsernames();
  }, []);

  function getTimeAgo(messageCreated = new Date()) {
    const time = formatDistanceToNowStrict(messageCreated, { addSuffix: true });
    if (time === "0 seconds ago") {
      return "Now";
    }
    return time;
  }

  async function getUsername(userId) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/get-user/${userId}`,
      );
      return response.data.user.username;
    } catch (error) {
      console.error(error);
    }
  }

  function addMessages() {
    return data.map((message) => {
      return (
        <article className={styles.message} key={message.id}>
          {isMember && (
            <div className={styles.authorDetails}>
              <div className={styles.leftCorner}>
                <h4>@{message.username}</h4>
                <Dot color="grey" />
                <time dateTime={formatISO(new Date(message.added_at))}>
                  {getTimeAgo(message.added_at)}
                </time>
              </div>

              {isAdmin && (
                <button
                  type="button"
                  className={styles.emptyButton}
                  onClick={deleteMessage}
                >
                  <CircleX size={20} strokeWidth={2} />
                </button>
              )}
            </div>
          )}

          <h3>{message.title}</h3>
          <p>{message.text}</p>
        </article>
      );
    });
  }

  function deleteMessage() {
    console.log(`isAdmin: ${isAdmin} isMember: ${isMember}`);
    showConfirmation();
  }

  function showConfirmation() {
    dialogRef.current.showModal();
  }

  return (
    <div className={styles.messageContainer}>
      <article className={styles.message}>
        {isMember && (
          <div className={styles.authorDetails}>
            <div className={styles.leftCorner}>
              <h4>Chicken Man</h4>
              <Dot color="grey" />
              <time dateTime="YYYY-MM-DDTHH:mm:ss.sssZ">{getTimeAgo()}</time>
            </div>
            {isAdmin && (
              <button
                type="button"
                className={styles.emptyButton}
                onClick={deleteMessage}
              >
                <CircleX size={20} strokeWidth={2} />
              </button>
            )}
          </div>
        )}

        <h3>Test Message</h3>
        <p>
          Well, you know how delicious chicken is? Yeah it's pretty damn good...
        </p>
      </article>
      {addMessages()}

      <dialog ref={dialogRef} className={styles.confirmation}>
        <p>Are you sure you want to delete this message?</p>
        <div className={styles.confirmationButtons}>
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            autoFocus
          >
            Cancel
          </button>
          <button type="button">Delete</button>
        </div>
      </dialog>
    </div>
  );
}
