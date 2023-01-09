import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useInjectSaga } from "redux-injectors";
import CheckCircleOutlineIcon from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";

import AppHeader from "@/components/Header";
import PasswordInput from "@/components/Input/PasswordInput";
import Button from "@/components/Button/StyledButton";
import AuthService from "@/services/api/auth-service";
import { key } from "@/containers/PageLogin/constants";
import saga from "@/containers/PageLogin/saga";
import { getUserProfile } from "@/redux/global/actions";
import { setTokens } from "@/utils/auth";
import NotificationStatus from "@/components/Notification";

import * as S from "./styled";

const PageReset = () => {
  const { push } = useHistory();
  const [hasTokenError, setHasTokenError] = useState(false);
  const dispatch = useDispatch();
  const { token } = useParams();

  useInjectSaga({ key, saga });

  useEffect(() => {
    window.document.title = "Water Saver Solution - Set New Password";
    return () => {
      window.document.title = "Water Saver Solution Connect";
    };
  }, []);

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "too short")
      .max(80, "too long")
      .required("*Please enter your new password"),
  });

  useQuery(
    "validateAccessToken",
    () => AuthService.validatePasswordLink(token.split("=")[1]),
    {
      retry: false,
      enabled: !!token,
      onSuccess: (data) => {
        if (data) {
          setHasTokenError(false);
        }
      },
      onError: () => {
        setHasTokenError(true);
      },
    },
  );

  const pwd_reset_mutation = useMutation(
    (data) => AuthService.passwordReset(data),
    {
      onSuccess: (data) => {
        setTokens({
          access_token: data?.access_token,
          refresh_token: data?.refresh_token,
        });
        dispatch(getUserProfile.request());

        push("/");
      },
      onError: (err) => {
        NotificationStatus("error", err?.message);
      },
    },
  );

  const RE_validation = [
    {
      re: /(?=.*[a-z])/,
      validateMessage: "At least 1 lowercase letter",
    },
    {
      re: /(?=.*[A-Z])/,
      validateMessage: "At least 1 UPPERCASE letter",
    },
    {
      re: /(?=.*\d)/,
      validateMessage: "At least 1 number",
    },
    {
      re: /(.{8,15})/,
      validateMessage: " At least 6 characters",
    },
  ];

  return (
    <>
      <AppHeader />
      <Formik
        key={1}
        initialValues={{ password: "" }}
        // eslint-disable-next-line
        onSubmit={async ({ password }) => {
          if (token && token.split("=")[1]) {
            try {
              await pwd_reset_mutation.mutateAsync({
                password,
                token: token.split("=")[1],
              });
            } catch (error) {
              // console.log(`error`, error);
            }
          }
        }}
        validateOnMount
        validationSchema={passwordSchema}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <S.Recover className="flex">
            <div className="content">
              <p className="title">Reset Password</p>
              <form onSubmit={handleSubmit}>
                <PasswordInput
                  disabled={hasTokenError}
                  error={errors.password && touched.password && errors.password}
                  label="Set New Password"
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                  value={values.password}
                />
                <br />
                <div style={{ fontSize: "13px" }}>
                  {RE_validation.map((currentElem) =>
                    // eslint-disable-next-line no-nested-ternary
                    values.password ? (
                      values.password.match(currentElem.re) ? (
                        <div className="displayFlex">
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                          <p className="ColorAttributeGreen">
                            {currentElem.validateMessage}
                          </p>
                        </div>
                      ) : (
                        <div className="displayFlex">
                          <Clear style={{ color: "red" }} />
                          <p className="ColorAttributeRed">
                            {currentElem.validateMessage}
                          </p>
                        </div>
                      )
                    ) : (
                      <p>{currentElem.validateMessage}</p>
                    ),
                  )}
                </div>
                <Button
                  className="ResetPasswordButtom"
                  disabled={hasTokenError}
                  loading={pwd_reset_mutation?.isLoading}
                  size="large"
                  type="submit"
                  value="Save"
                />
              </form>
              <p
                className="text-helper"
                style={{ fontSize: "14px", marginTop: "10px" }}
              >
                {" "}
                <Link to="/login">Go back to Login</Link>
              </p>
            </div>
          </S.Recover>
        )}
      </Formik>
    </>
  );
};

export default PageReset;
