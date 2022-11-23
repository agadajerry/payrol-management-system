import React from "react";
import AppInput from "../components/AppInput";
import colors from "../config/colors";
import { FaFacebookSquare, FaIndustry, FaTwitterSquare } from "react-icons/fa";
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
    website_url: Yup.string().url("Invalid website url").label("Website Url"),
    phone_number: Yup.string()
      .min(11, "Phone number must be at least 11 characters")
      .required("Phone number must be at least 11 characters"),
    company_name: Yup.string().required("Company name is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    website_url: "",
    phone_number: "",
    company_name: "",
  };

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="center-content">
        <div className="row">
          <div className="col-md-6 image-login-holder">
            <img src={payrollIcon} alt="" />
          </div>
          <div className="col-md-6">
            <div className="login-form-holder">
              <h3>Sigin up</h3>
              <h4 className="app-owner">UpTurn</h4>
              <div className="icon-hoder">
                <FaFacebookSquare size={25} className="social-icons" />
                <FaTwitterSquare size={25} className="social-icons" />
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
                    <div className="mb-2">
                      <AppLabel label="Company name" />
                      <AppInput
                        placeholder="Company name"
                        type="text"
                        name="company_name"
                        icon={<FaIndustry size={20} />}
                      />
                    </div>
                    <div className="mb-2">
                      <AppLabel label="Phone number" />
                      <AppInput
                        placeholder="Phone Number"
                        type="tel"
                        name="phone_number"
                        icon={<BsFillTelephoneFill size={20} />}
                      />
                    </div>
                    <div className="mb-2">
                      <AppLabel label="Website" />
                      <AppInput
                        placeholder="Website"
                        type="url"
                        name="url"
                        icon={<CgWebsite size={20} />}
                      />
                    </div>
                    <div className="mb-2">
                      <AppLabel label="Email" />
                      <AppInput
                        placeholder="Email"
                        type="email"
                        name="email"
                        icon={<AiOutlineMail size={20} />}
                      />
                    </div>
                    <div className="mb-2">
                      <AppLabel label="Password" />
                      <AppInput
                        placeholder="password"
                        type="password"
                        name="password"
                        icon={<AiOutlineLock size={20} />}
                      />
                    </div>
                    <div className="mb-2">
                      <AppButton
                        label="Sign up"
                        bg_color={colors.primary}
                        width="100%"
                        type="submit"
                      />
                    </div>
                    <div className="mb-2 new-member">
                      <h3 className="new-member-title">
                        Already a member ?{" "}
                        <span onClick={() => navigate("/")}>Login</span>
                      </h3>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
