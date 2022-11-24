import React from "react";

function AppSelect(props: any) {
  return (
    <div className="form-floating">
      <select
        className="form-select"
        id="floatingSelect"
        aria-label="Floating label select example"
      >
        <option defaultValue={"Open this select menu"}></option>
        <option value={props.index}>{props.value}</option>
      </select>
      <label htmlFor="floatingSelect">Works with selects</label>
    </div>
  );
}

export default AppSelect;
