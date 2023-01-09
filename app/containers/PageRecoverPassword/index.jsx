import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { useInjectSaga } from "redux-injectors";

import AppHeader from "@/components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button/StyledButton";
import NotificationStatus from "@/components/Notification";
import AuthService from "@/services/api/auth-service";
import { EMAIL_REG_EXP } from "@/utils/constants";
import { key } from "@/containers/PageLogin/constants";
import saga from "@/containers/PageLogin/saga";

import * as S from "./styled";

const PageReset = () => {
  const history = useHistory();
  useInjectSaga({ key, saga });

  useEffect(() => {
    window.document.title = "Water Saver Solution - Forgot Password";
    return () => {
      window.document.title = "Water Saver Solution Connect";
    };
  }, []);

  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .min(6, "too short")
      .max(140, "too long")
      .matches(EMAIL_REG_EXP, "Invalid email")
      .required("*Please enter your email address to reset your password"),
  });

  const send_email_mutation = useMutation(
    (email) => AuthService.passwordEmail(email),
    {
      onSuccess: (data) => {
        NotificationStatus("success", data?.message);
      },
      onError: (err) => {
        NotificationStatus("error", err?.message);
      },
    },
  );

  return (
    <>
      <AppHeader />
      <Formik
        key={0}
        initialValues={{ email: "" }}
        // eslint-disable-next-line
        onSubmit={async ({ email }, { setErrors }) => {
          try {
            await send_email_mutation.mutateAsync({ email });

            history.push("/login");
          } catch (error) {
            setErrors({ ...error });
          }
        }}
        validateOnMount
        validationSchema={emailSchema}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          // isSubmitting,
          touched,
          values,
          /* and other goodies */
        }) => (
          <S.Recover className="flex">
            <div className="content flex">
              <p className="title">Password Reset Request</p>
              <form onSubmit={handleSubmit}>
                <Input
                  error={errors.email && touched.email && errors.email}
                  label="Email"
                  onBlur={handleBlur("email")}
                  onChange={handleChange("email")}
                  type="email"
                  value={values.email}
                />
                <Button
                  className="ResetPasswordButtom"
                  loading={send_email_mutation.isLoading}
                  size="large"
                  type="submit"
                  value={
                    send_email_mutation.isLoading
                      ? "Please wait ..."
                      : "Request Reset"
                  }
                />
              </form>
              <p className="text-helper">
                {" "}
                <Link style={{ fontSize: "14px" }} to="/login">
                  {" "}
                  BACK
                </Link>
              </p>
            </div>
          </S.Recover>
        )}
      </Formik>
    </>
  );
};

export default PageReset;
