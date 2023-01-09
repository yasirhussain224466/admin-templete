/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-curly-newline */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Checkbox } from "antd";

import TextInput from "@/components/Input";

import PermissionDropDown from "../Select/PermissionDropDown";

import * as S from "./styled";

const RolesPopup = ({ formik, title }) => {
  const { errors, handleChange, setFieldValue, values } = formik || {};
  return (
    <Formik>
      <S.Company>
        <div className="title">{title}</div>
        <TextInput
          defaultValue={values?.name?.defaultRole || ""}
          disabled={values._id}
          error={errors?.name}
          label="Role"
          name="name"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values?.name}
        />
        <PermissionDropDown
          defaultValue={values.permission || []}
          error={errors?.permission}
          isMulti
          onChange={(v) => setFieldValue("permission", v)}
          state="Campus Access"
          value={values?.permission}
        />
        <Checkbox
          onChange={(v) =>
            setFieldValue("all_company_access", v.target.checked)
          }
          style={{ margin: "15px 10px" }}
          value={values?.all_company_access}
        >
          All company access
        </Checkbox>
      </S.Company>
    </Formik>
  );
};

export default RolesPopup;

RolesPopup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  defaultPermission: PropTypes.array,
  defaultRole: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
