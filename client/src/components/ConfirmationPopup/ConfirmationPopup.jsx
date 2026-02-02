import styles from "./confirmationpopup.module.css";

export default function ConfirmationPopup({
  message = "Are you sure you want to delete this message?",
  submitButtonTitle = "Delete",
  dialogRef,
  onConfirm,
}) {
  return (
    <dialog className={styles.confirmation} ref={dialogRef}>
      <p>{message}</p>
      <div className={styles.confirmationButtons}>
        <button
          type="button"
          onClick={() => dialogRef.current.close()}
          autoFocus
        >
          Cancel
        </button>
        <button type="button" onClick={onConfirm}>
          {submitButtonTitle}
        </button>
      </div>
    </dialog>
  );
}
