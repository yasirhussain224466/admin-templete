/* eslint-disable react/jsx-curly-newline */
import React from "react";
import PropTypes from "prop-types";

import TextInput from "@/components/Input";

import * as S from "./styled";

const Company = ({ formik, title }) => {
  const { errors, setFieldValue, values } = formik || {};
  return (
    <S.Company>
      <div className="title">{title}</div>
      <TextInput
        error={errors?.name?.value}
        label="Building Name"
        name="name"
        onChange={(e) =>
          setFieldValue("name", {
            value: e.target.value,
            old_value: e.target.value,
          })
        }
        style={{ borderRadius: "3px" }}
        value={values?.name?.value}
      />
      <TextInput
        error={errors?.sequence?.value}
        label="Sequence"
        name="sequence"
        onChange={(e) => {
          setFieldValue("sequence", {
            value: e.target.value,
            old_value: e.target.value,
          });
        }}
        style={{ borderRadius: "3px" }}
        type="Number"
        value={values?.sequence?.value}
      />
    </S.Company>
  );
};

export default Company;

Company.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
