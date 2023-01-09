/* eslint-disable no-plusplus */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { useQuery } from "react-query";

import TextInput from "@/components/Input";
import Switch from "@/components/Switch";
import appService from "@/services/api/app-service";
import RolesDropdown from "@/components/Dropdown/RoleDropDown";

import NumberFormatInput from "../Input/FormatNumber";

import * as S from "./styled";

const Company = ({ formik, title }) => {
  const { errors, handleChange, setFieldValue, values } = formik || {};
  const { data } = useQuery("getRoles", () => appService.getRoles());

  const filteredData = data?.filter(
    (i) => i?.name?.toLowerCase() !== "company_viewer",
  );

  const onChange = (checked) => {
    setFieldValue("is_active", checked);
  };

  return (
    <Formik>
      <S.Company>
        <div className="title">{title}</div>
        <TextInput
          defaultValue={values?.full_name || ""}
          error={errors.full_name}
          label="User Name"
          name="full_name"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values.full_name}
        />
        <TextInput
          defaultValue={values?.email || ""}
          error={errors.email}
          label="Email"
          name="email"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values?.email}
        />
        <NumberFormatInput
          defaultValue={values?.phone || ""}
          error={errors?.phone}
          label="Phone"
          name="phone"
          setFieldValue={setFieldValue}
          style={{ borderRadius: "3px" }}
          value={values?.phone}
        />
        <div>
          <div className="md-04">
            <div className="nd-04">
              <RolesDropdown
                defaultValue={values?.role}
                error={errors?.role}
                handleDropDownChange={(v) => setFieldValue("role", v)}
                options={Array.isArray(filteredData) && filteredData}
                state="Role"
                value={values?.role}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="pd-04">
          <Switch onChange={onChange} />
          <span style={{ marginLeft: "10px" }}>
            {values.is_active ? "Enabled" : "Disabled"}
          </span>
        </div>
      </S.Company>
    </Formik>
  );
};

export default Company;

Company.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
