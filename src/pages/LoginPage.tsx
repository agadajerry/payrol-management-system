import React, { useEffect, useState } from "react";
import AppInput from "../components/AppInput";
import colors from "../config/colors";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import AppButton from "../components/AppButton";
import payrollIcon from "../assets/images/payrol.png";
import AppLabel from "../components/AppLabel";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoadingScreen from "./LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../redux/authReducerSlice";
import logo from "../assets/images/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage({ ...props }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isSuccess, message, userToken, isError } = useSelector(
    (state: any) => state.authReducer
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (userToken || isSuccess) {
      toast.success("Login successful");
      navigate("/home");
    }
    dispatch(reset());
  }, [dispatch, navigate, isError, message,isSuccess]);

  const handleLogin = (values: any) => {
    values.defaultPrevented = true;

    const myFormData = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(myFormData));
  };



     

  return (
    <div className="container">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <div className="center-content">
            <div className="row">
              <div className="col-md-6 image-login-holder">
                <img src={payrollIcon} alt="" />
              </div>

              <div className="col-md-6">
                <div className="login-form-holder">
                  <h3 className="title-text">Login</h3>
                  <h3 className="logoholder">
                    <img src={logo} alt="logo" />
                  </h3>
                  <div className="icon-hoder">
                    <FaFacebookSquare size={25} className="social-icons" />
                    <FaTwitterSquare size={25} className="social-icons" />
                  </div>
                </div>
                <Form>
                  <div className="container p-3">
                    <div className="mb-3">
                      <AppLabel label="Email" />
                      <AppInput
                        placeholder="Email"
                        type="email"
                        name="email"
                        icon={<AiOutlineMail size={25} />}
                      />
                    </div>
                    <div className="mb-3">
                      <AppLabel label="Password" />
                      <AppInput
                        placeholder="password"
                        type="password"
                        name="password"
                        icon={<AiOutlineLock size={25} />}
                      />
                    </div>
                    <div className="remember-holder text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="remember-me"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="remember-me"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className=" forgot-btn">
                        <h4>Forgot password</h4>
                      </div>
                    </div>
                    <h4 className="text-danger fs-6"></h4>
                    <div className="mb-3">
                      <AppButton
                        label="Login"
                        bg_color={colors.primary}
                        width="100%"
                        type={"submit"}
                        // onClick={handleLogin}
                        isSubmitting={isSubmitting}
                      />
                    </div>
                    <div className="mb-3 new-member">
                      <h3 className="new-member-title">
                        Not yet sign up ?{" "}
                        <span onClick={() => navigate("/sign-up")}>
                          Sign up
                        </span>
                      </h3>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
      <LoadingScreen loading={loading} />;
    </div>
  );
}

export default LoginPage;
