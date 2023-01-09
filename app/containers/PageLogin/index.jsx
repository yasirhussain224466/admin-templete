import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useInjectSaga, useInjectReducer } from "redux-injectors";
import { useDispatch, useSelector } from "react-redux";

import PasswordInput from "@/components/Input/PasswordInput";
import TextInput from "@/components/Input";
import Button from "@/components/Button/StyledButton";
import { EMAIL_REG_EXP } from "@/utils/constants";
import AppHeader from "@/components/Header/index";
import NotificationStatus from "@/components/Notification";

import { errorsSelector } from "./selectors";
import reducer from "./reducer";
import { login, reset_errors } from "./actions";
import saga from "./saga";
import { key } from "./constants";
import * as S from "./styled";

const PageLogin = () => {
  const [email, setEmail] = useState("");
  const [globalError, setGlobalError] = useState();
  const [globalErrorPassword, setGlobalErrorPassword] = useState();

  const global_error = useSelector(errorsSelector);

  const currentUser = useSelector(() => ({
    global: { currentUser },
  }));
  const loading = useSelector((state) => state?.login?.loading);

  React.useEffect(() => {
    if (global_error) {
      if (!global_error) {
        NotificationStatus("error", "Network error");
      }
      if (global_error?.message?.includes("Password")) {
        setGlobalErrorPassword(global_error.message);
      } else if (global_error?.message?.includes("email")) {
        setGlobalError(global_error.message);
      }
    }
  }, [global_error]);

  const dispatch = useDispatch();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const SignInSchema = yup.object().shape({
    email: yup
      .string()
      .min(6, "too short")
      .max(140, "too long")
      .matches(EMAIL_REG_EXP, "Invalid email")
      .required("*Email is required to login"),
    password: yup
      .string()
      .min(8, "too short")
      .max(80, "too long")
      .required("*Please enter your password"),
  });
  return (
    <>
      <AppHeader />
      <Formik
        key={0}
        initialValues={{ email: "", password: "" }}
        //  eslint-disable-next-line
        onSubmit={async ({ email, password }, { setErrors }) => {
          try {
            // eslint-disable-next-line
            email = email.trim();
            setEmail(email);
            dispatch(login.request({ email, password }));
          } catch (error) {
            setErrors({ email: error.message });
          }
        }}
        validateOnChange
        validateOnMount
        validationSchema={SignInSchema}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <S.Wrapper className="flex">
            <div className="content">
              <p className="title">Sign In</p>
              <Form onSubmit={handleSubmit}>
                <TextInput
                  error={
                    (errors.email && touched.email && errors.email) ||
                    globalError
                  }
                  label="Email"
                  name="email"
                  onBlur={handleBlur("email")}
                  onChange={handleChange("email")}
                  style={{ borderRadius: "3px" }}
                  value={values.email}
                />
                <PasswordInput
                  error={
                    (errors.password && touched.password && errors.password) ||
                    globalErrorPassword
                  }
                  label="Password"
                  name="password"
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                  style={{ borderRadius: "3px" }}
                  value={values.password}
                />
                <Button
                  className="LoginButton"
                  loading={loading}
                  onClick={handleSubmit}
                  size="large"
                  type="primary"
                  value="Sign In"
                />
              </Form>
              <p className="flex text-helper">
                <Link
                  onClick={() => {
                    dispatch(reset_errors());
                  }}
                  to={{ pathname: "/forgot-password", state: { email } }}
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
          </S.Wrapper>
        )}
      </Formik>
    </>
  );
};

export default PageLogin;
