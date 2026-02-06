import MenuBar from "../MenuBar/MenuBar.jsx";
import styles from "./homecontent.module.css";

export default function HomeContent() {
  // TODO: Make the instructions a bit better
  return (
    <div className={styles.homeContent}>
      <section className={styles.instructions}>
        <h3>Instructions</h3>
        <ul>
          <li>
            {" "}
            <p>
              If you are a visitor or a user who signed up (not a member), you
              can view the messages without knowing the message date and author.
              You cannot create messages.
            </p>
          </li>
          <li>
            {" "}
            <p>
              If you are a member (a user who successfully enters the access
              code), you can see the author and date of each message.
            </p>
          </li>
          <li>
            <p>If you're an admin... well... you can delete messages too.</p>
          </li>
        </ul>
        <strong>
          Note: Members & Admins are the only ones that can add messages.
        </strong>
      </section>

      <MenuBar />
    </div>
  );
}
