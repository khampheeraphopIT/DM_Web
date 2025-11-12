import styles from "../../../styles/ErrorSection.module.css";

interface Props {
  error: string | null;
  onRetry: () => void;
  showRetry?: boolean;
}

export const ErrorSection = ({ error, onRetry, showRetry }: Props) => {
  if (!error) return null;
  return (
    <>
      <p className={styles.errorText}>{error}</p>
      <div style={{ height: "10px" }} />
      {showRetry && onRetry && (
        <button onClick={onRetry} className={styles.retryButton}>
          ลองดึงตำแหน่งอีกครั้ง
        </button>
      )}
    </>
  );
};
