import styles from "./messages.module.css";

export default function Messages({ data, isAdmin, isMember }) {
  return (
    <div className={styles.messageContainer}>
      <article className={styles.message}>
        <div className={styles.authorDetails}>
          <h4>Chicken Man</h4>
          <time dateTime="YYYY-MM-DDTHH:mm:ss.sssZ">3 Days Ago</time>
        </div>
        <h3>Test Message</h3>
        <p>
          Well, you know how delicious chicken is? Yeah it's pretty damn good...
        </p>
      </article>
    </div>
  );
}
