import styles from "./messages.module.css";

import { formatDistanceToNowStrict } from "date-fns";

export default function Messages({ data, isAdmin, isMember }) {
  function getTimeAgo(messageCreated = new Date()) {
    const time = formatDistanceToNowStrict(messageCreated, { addSuffix: true });
    if (time === "0 seconds ago") {
      return "Now";
    }
    return time;
  }

  return (
    <div className={styles.messageContainer}>
      <article className={styles.message}>
        <div className={styles.authorDetails}>
          <h4>Chicken Man</h4>
          <time dateTime="YYYY-MM-DDTHH:mm:ss.sssZ">{getTimeAgo()}</time>
        </div>
        <h3>Test Message</h3>
        <p>
          Well, you know how delicious chicken is? Yeah it's pretty damn good...
        </p>
      </article>
    </div>
  );
}
