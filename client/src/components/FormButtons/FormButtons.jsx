// This is for the bottom of each form
import { Link } from "react-router";
import styles from "./formbuttons.module.css";
export default function FormButtons({
  backButtonName,
  backLink,
  submitButtonName,
  loadingState = false,
}) {
  return (
    <div className={styles.buttons}>
      <Link to={backLink} className="backLink">
        {backButtonName}
      </Link>

      {loadingState ? (
        <button type="submit" id={styles.loading} disabled>
          Loading
        </button>
      ) : (
        <button type="submit">{submitButtonName}</button>
      )}
    </div>
  );
}
