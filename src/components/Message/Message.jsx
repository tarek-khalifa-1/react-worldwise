import BackButton from "../BackButton/BackButton";
import styles from "./Message.module.css";

function Message({ message }) {
  return (
    <div>
      <p className={styles.message}>
        <span role="img">👋</span> {message}
      </p>
      <BackButton />
    </div>
  );
}

export default Message;
