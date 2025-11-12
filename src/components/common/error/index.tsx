import styles from "../../../styles/ErrorSection.module.css";

interface Props {
  error: string | null;
  onRetry: () => void;
}

export const ErrorSection = ({ error, onRetry }: Props) => {
  if (!error) return null;
  return (
    <>
      <p className={styles.errorText}>{error}</p>
      <div style={{ height: "10px" }} />
      <button onClick={onRetry} className={styles.retryButton}>
        ลองดึงตำแหน่งอีกครั้ง
      </button>
    </>
  );
};
