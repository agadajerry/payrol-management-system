import React from "react";
import AppInput from "../components/AppInput";
import colors from "../config/colors";
import {
  FaAddressCard,
  FaFacebookSquare,
  FaIndustry,
  FaTwitterSquare,
} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import AppButton from "../components/AppButton";
import payrollIcon from "../assets/images/payrol.png";
import AppLabel from "../components/AppLabel";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

function SignupPage({ ...props }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Invalid email format"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password must be at least 8 characters"),
    cpassword: Yup.string()
      .oneOf(["password", null], "Password must match")
      .required("Password must match"),
    website_url: Yup.string().url("Invalid website url").label("Website Url"),
    phone_number: Yup.string()
      .min(11, "Phone number must be at least 11 characters")
      .required("Phone number must be at least 11 characters"),
    company_name: Yup.string().required("Company name is required"),
    address: Yup.string().required("Address is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    cpassword: "",
    website_url: "",
    phone_number: "",
    company_name: "",
    address: "",
  };

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="login-form-container">
        <div className="login-form-holder">
          <h3>Sigin up</h3>
          <h4 className="app-owner">UpTurn</h4>
          <div className="icon-hoder">
            <FaFacebookSquare className="social-icons" />
            <FaTwitterSquare className="social-icons" />
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form>
              <div className="container p-3">
                <div className="row">
                  <div className="col-md-6">
                    <AppLabel label="Company name" />
                    <AppInput
                      placeholder="Company name"
                      type="text"
                      name="company_name"
                      icon={<FaIndustry size={20} />}
                    />
                  </div>

                  <div className="col-md-6">
                    <AppLabel label="Phone number" />
                    <AppInput
                      placeholder="Phone Number"
                      type="tel"
                      name="phone_number"
                      icon={<BsFillTelephoneFill size={20} />}
                    />
                  </div>
                  <div className="col-md-6">
                    <AppLabel label="Website" />
                    <AppInput
                      placeholder="Website"
                      type="url"
                      name="url"
                      icon={<CgWebsite size={20} />}
                    />
                  </div>
                  <div className="col-md-6">
                    <AppLabel label="Email" />
                    <AppInput
                      placeholder="Email"
                      type="email"
                      name="email"
                      icon={<AiOutlineMail size={20} />}
                    />
                  </div>
                  <div className="col-md-6">
                    <AppLabel label="Password" />
                    <AppInput
                      placeholder="password"
                      type="password"
                      name="password"
                      icon={<AiOutlineLock size={20} />}
                    />
                  </div>
                  <div className="col-md-6">
                    <AppLabel label="Confirm password" />
                    <AppInput
                      placeholder="Confirm password"
                      type="password"
                      name="cpassword"
                      icon={<AiOutlineLock size={20} />}
                    />
                  </div>
                  <div className="col-md-6">
                    <AppLabel label="Address" />
                    <AppInput
                      placeholder="Address"
                      type="text"
                      name="address"
                      icon={<FaAddressCard size={20} />}
                    />
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <AppButton
                      label="Sign up"
                      bg_color={colors.primary}
                      width="100%"
                      type="submit"
                    />
                  </div>
                  <div className="col-md-6 new-member">
                    <h3 className="new-member-title">
                      Alreay signed up ?{" "}
                      <span onClick={() => navigate("/")}>Login</span>
                    </h3>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignupPage;
