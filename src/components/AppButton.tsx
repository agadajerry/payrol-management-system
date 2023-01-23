import React from "react";
import { Button } from "react-bootstrap";
function AppButton({
  label,
  type,
  onClick,
  bg_color,
  width,
  isSubmitting,
}: any) {
  return (
    <div className="button-container">
      <Button
        className="app-btn"
        type={type}
        onClick={onClick}
        style={{ backgroundColor: bg_color, width: width }}
      >
        {label}
      </Button>
    </div>
  );
}

export default AppButton;
