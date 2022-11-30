import React from "react";
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

function LoginPage({ ...props }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <div className="container">
      {/* <LoadingScreen/> */}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {}}
        validationSchema={validationSchema}
      >
        <div className="center-content">
          <div className="row">
            <div className="col-md-6 image-login-holder">
              <img src={payrollIcon} alt="" />
            </div>

            <div className="col-md-6">
              <div className="login-form-holder">
                <h3>Sigin in</h3>
                <h4 className="app-owner">UpTurn</h4>
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
                      icon={<AiOutlineMail size={20} />}
                    />
                  </div>
                  <div className="mb-3">
                    <AppLabel label="Password" />
                    <AppInput
                      placeholder="password"
                      type="password"
                      name="password"
                      icon={<AiOutlineLock size={20} />}
                    />
                  </div>
                  <div className="remember-holder text-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember-me"
                      />
                      <label className="form-check-label" htmlFor="remember-me">
                        Remember me
                      </label>
                    </div>
                    <div className=" forgot-btn">
                      <h4>Forgot password</h4>
                    </div>
                  </div>
                  <div className="mb-3">
                    <AppButton
                      label="Login"
                      bg_color={colors.primary}
                      width="100%"
                      type={"submit"}
                      onClick={handleLogin}
                    />
                  </div>
                  <div className="mb-3 new-member">
                    <h3 className="new-member-title">
                      Not yet sign up ?{" "}
                      <span onClick={() => navigate("/sign-up")}>Sign up</span>
                    </h3>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  );
}

export default LoginPage;
