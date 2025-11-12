import styles from "../../../styles/StackedImages.module.css";

export const StackedImages = () => (
  <div className={styles.container}>
    <div className={styles.cardLeft}>
      <span>S = ½bh</span>
      <br />
      <span>A = πr²</span>
      <br />
      <span>sin x</span>
    </div>

    <div className={styles.mainImage}>
      <img src="/assets/images/canediseaseone.jpg" alt="Cane" />
    </div>

    <div className={styles.cardRight}>
      <div className={styles.badge}>สแกนอ้อย</div>
      <div className={styles.title}>ใบรายงานวิเคราะห์</div>
      <div className={styles.subtitle}>
        ผลการตรวจ
        <br />
        ความเสี่ยงของโรค
      </div>
      <div className={styles.qrSection}>
        <span>QR</span>
        <span>Scan SugarCane</span>
      </div>
    </div>
  </div>
);
