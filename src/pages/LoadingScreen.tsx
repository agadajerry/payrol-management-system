import React from "react";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div
          className="spinner-border text-danger"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
