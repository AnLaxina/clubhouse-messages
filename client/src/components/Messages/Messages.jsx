import styles from "./messages.module.css";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup.jsx";

import { formatDistanceToNowStrict, formatISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { CircleX, Dot } from "lucide-react";

import axios from "axios";

export default function Messages({ data, isAdmin, isMember, setMessages }) {
  const dialogRef = useRef(undefined);
  const [messageId, setMessageId] = useState(undefined);

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
                  onClick={() => showConfirmation(message.id)}
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

  function deleteMessage(messageId) {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/delete-message/${messageId}`,
      )
      .then(() => {
        setMessages(data.filter((message) => messageId !== message.id));
      })
      .catch((error) => console.error(error));
  }
  function showConfirmation(selectedId) {
    setMessageId(selectedId);
    dialogRef.current.showModal();
  }

  function hideConfirmation() {
    deleteMessage(messageId);
    setMessageId(undefined);
    dialogRef.current.close();
  }

  return (
    <div className={styles.messageContainer}>
      {addMessages()}

      <ConfirmationPopup dialogRef={dialogRef} onConfirm={hideConfirmation} />
    </div>
  );
}
