import React from "react";

function LoadingScreen({ ...props }) {
  if (!props.loading) return null;
  return (
    <div className="loading-content">
      <div
        className="spinner-border text-danger"
        role="status"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingScreen;
