/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "../../../styles/SubmitSection.module.css";
import ResultDisplay from "../resultdisplay";

interface Props {
  result: any;
  onSubmit: () => void;
  onRetry: () => void;
}

export const SubmitSection = ({ result, onSubmit, onRetry }: Props) => (
  <>
    <button
      onClick={result ? onRetry : onSubmit}
      className={result ? styles.retryButton : styles.submitButton}
    >
      {result ? "ลองอีกครั้ง" : "ดำเนินการต่อ"}
    </button>

    {result && (
      <>
        <div style={{ height: "20px" }} />
        <ResultDisplay result={result} />
      </>
    )}
  </>
);
