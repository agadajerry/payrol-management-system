import React from "react";

interface ILabel {
  label: string;
}
function AppLabel({ label }: ILabel) {
  return <label className="form-label label-style">{label}</label>;
}

export default AppLabel;
