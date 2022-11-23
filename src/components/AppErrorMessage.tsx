import React from "react";

function AppErrorMessage({ error }: any) {
  return <p style={{ color: "red", fontSize: 11 }}>{error}</p>;
}

export default AppErrorMessage;
