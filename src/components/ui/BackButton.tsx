import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button on home page
  if (location.pathname === "/") return null;

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: "none",
        color: "var(--ink-soft)",
        fontSize: "13px",
        fontWeight: 500,
        fontWeight: 500,
        cursor: "pointer",
        padding: "8px 0",
        marginBottom: "24px",
        transition: "color 0.2s ease"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-soft)")}
    >
      <ArrowLeft size={16} />
      Back to previous page
    </button>
  );
};
