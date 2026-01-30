import React from "react";

interface UserInfoCardProps {
  name: string;
  phone: string;
  compact?: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  name,
  phone,
  compact = false,
}) => {
  const avatarSize = compact ? 32 : 40;

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: compact ? "8px 12px" : "12px 16px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          width: `${avatarSize}px`,
          height: `${avatarSize}px`,
          borderRadius: "50%",
          backgroundColor: "#DCFCE7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#16A34A",
          fontWeight: "bold",
          fontSize: compact ? "14px" : "16px",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontWeight: "bold",
            color: "#166534",
            fontSize: compact ? "14px" : "16px",
          }}
        >
          {name}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: compact ? "12px" : "13px",
            color: "#6B7280",
          }}
        >
          {phone}
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;
