import { useOutletContext, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./viewmessages.module.css";
import Messages from "../../components/Messages/Messages.jsx";

export default function ViewMessages() {
  const [currentUser, setCurrentUser] = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);

  function setMemberStatus(userObject) {
    if (userObject.is_admin) {
      setIsAdmin(true);
      setIsMember(true);
    } else if (userObject.membership_status) {
      setIsMember(true);
    }
  }

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/get-messages`, {
        withCredentials: true,
      })
      .then((response) => {
        setMessages(response.data.messages);
        setMemberStatus(currentUser);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [currentUser?.id]);

  return (
    <section className={styles.viewMessagesSection}>
      <h2>Messages</h2>
      {isLoading ? (
        <h3>Loading Messages...</h3>
      ) : (
        <>
          <Messages
            data={messages}
            isAdmin={isAdmin}
            isMember={isMember}
            setMessages={setMessages}
          />
        </>
      )}

      <div className={styles.navButtons}>
        <Link to="/">Back</Link>
        <Link to="/new-message">Add New Message</Link>
      </div>
    </section>
  );
}
