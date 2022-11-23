import React from "react";
import Navbar from "./Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-fluid">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
