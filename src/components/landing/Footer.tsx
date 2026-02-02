import Logo from "../common/Logo";

export const Footer: React.FC = () => (
  <footer
    style={{
      padding: "40px 32px",
      borderTop: "1px solid #E5E7EB",
      textAlign: "center",
      backgroundColor: "#FFFFFF",
    }}
  >
    <div style={{ marginBottom: "16px" }}>
      <Logo size={28} style={{ justifyContent: "center" }} />
    </div>
    <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>
      © 2025 CaneScan - ระบบวิเคราะห์โรคใบอ้อยด้วย AI
    </p>
  </footer>
);
