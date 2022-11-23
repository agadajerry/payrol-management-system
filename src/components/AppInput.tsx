import AppErrorMessage from "./AppErrorMessage";

import { useField, useFormikContext } from "formik";

function AppInput({ label, type, placeholder, icon, ...props }: any) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="input-holder">
        <p className="used-icon">{icon}</p>

        <input
          type={type}
          placeholder={placeholder}
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          autoComplete="off"
          {...field}
          {...props}
        />
      </div>
      <AppErrorMessage error={meta.error} />
    </>
  );
}

export default AppInput;
