import React, { useEffect } from "react";
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
import AppLabel from "../components/AppLabel";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../redux/authReducerSlice";
import LoadingScreen from "./LoadingScreen";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";

function SignupPage() {
  const dispatch = useDispatch();
  const { loading, isError, message, isSuccess,userToken } = useSelector(
    (state: any) => state.authReducer
  );

  const navigate = useNavigate();


  useEffect(() => {

    if (isError) { 
      toast.error(message);
    }
    if (isSuccess || userToken) {
      navigate("/home");
    }
    dispatch(reset())
  }, [navigate, isSuccess,isError,message]);

  const handleSignup = (values: any) => {
    values.defaultPrevented = true;
  
    dispatch(registerUser(values));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Invalid email format"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password must be at least 8 characters"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Password must match"),
    website: Yup.string().url("Invalid website url").label("Website Url"),
    phone_no: Yup.string()
      .min(11, "Phone number must be at least 11 characters")
      .required("Phone number must be at least 11 characters"),
    company_name: Yup.string().required("Company name is required"),
    address: Yup.string().required("Address is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    cpassword: "",
    website: "",
    phone_no: "",
    company_name: "",
    address: "",
  };

  return (
    <>
      <LoadingScreen loading={loading} />

      <div className="container">
        <div className="login-form-container">
          <div className="login-form-holder">
            <h3 className="title-text">Sigin up</h3>
            <h3 className="logoholder">
              <img src={logo} alt="logo" />
            </h3>
            <div className="icon-hoder">
              <FaFacebookSquare className="social-icons" />
              <FaTwitterSquare className="social-icons" />
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSignup(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form>
                <div className="container p-3">
                  <h4 className="text-danger fs-5">
                    {isSuccess && "You have signup successfully..."}
                  </h4>
                  <h4 className="text-danger fs-5">
                    {isError && "Error has occured"}
                  </h4>
                  <div className="row">
                    <div className="col-md-6">
                      <AppLabel label="Company name" />
                      <AppInput
                        placeholder="Company name"
                        type="text"
                        name="company_name"
                        icon={<FaIndustry size={25} />}
                      />
                    </div>

                    <div className="col-md-6">
                      <AppLabel label="Phone number" />
                      <AppInput
                        placeholder="Phone Number"
                        type="tel"
                        name="phone_no"
                        icon={<BsFillTelephoneFill size={25} />}
                      />
                    </div>
                    <div className="col-md-6">
                      <AppLabel label="Website" />
                      <AppInput
                        placeholder="Website"
                        type="url"
                        name="website"
                        icon={<CgWebsite size={25} />}
                      />
                    </div>
                    <div className="col-md-6">
                      <AppLabel label="Email" />
                      <AppInput
                        placeholder="Email"
                        type="email"
                        name="email"
                        icon={<AiOutlineMail size={25} />}
                      />
                    </div>
                    <div className="col-md-6">
                      <AppLabel label="Password" />
                      <AppInput
                        placeholder="password"
                        type="password"
                        name="password"
                        icon={<AiOutlineLock size={25} />}
                      />
                    </div>
                    <div className="col-md-6">
                      <AppLabel label="Confirm password" />
                      <AppInput
                        placeholder="Confirm password"
                        type="password"
                        name="cpassword"
                        icon={<AiOutlineLock size={25} />}
                      />
                    </div>
                    <div className="col-md-6">
                      <AppLabel label="Address" />
                      <AppInput
                        placeholder="Address"
                        type="text"
                        name="address"
                        icon={<FaAddressCard size={25} />}
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
    </>
  );
}

export default SignupPage;
