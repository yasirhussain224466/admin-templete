/* eslint-disable react/jsx-curly-newline */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/Input";
import { REPORT_TYPES } from "@/utils/constants";

import * as S from "./styled";
import { optionState } from "./Constant";

const Company = ({ formik, title }) => {
  const { errors, setFieldValue, values } = formik || {};
  const optionArr = [];
  for (let i = 1; i <= 365; i += 1) {
    optionArr.push(`${i} Days`);
  }

  return (
    <Formik>
      <S.Company>
        <div className="title">{title}</div>
        <TextInput
          error={errors?.name?.value}
          label="Campus Name"
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
          error={errors.address?.value}
          label="Address 1"
          name="address"
          onChange={(e) => {
            setFieldValue("address", {
              value: e.target.value,
              old_value: e.target.value,
            });
          }}
          style={{ borderRadius: "3px" }}
          value={values.address?.value}
        />
        <TextInput
          label="Address 2"
          name="secondary_address"
          onChange={(e) => {
            setFieldValue("secondary_address", {
              value: e.target.value,
              old_value: e.target.value,
            });
          }}
          style={{ borderRadius: "3px" }}
          value={values.secondary_address?.value}
        />
        <TextInput
          error={errors.city?.value}
          label="City"
          name="city"
          onChange={(e) =>
            setFieldValue("city", {
              value: e.target.value,
              old_value: e.target.value,
            })
          }
          style={{ borderRadius: "3px" }}
          value={values.city?.value}
        />
        <div>
          <div className="md-04">
            <div className="nd-04">
              <Dropdown
                error={errors.state?.value}
                handleDropDownChange={(e) =>
                  setFieldValue("state", { value: e, old_value: e })
                }
                options={optionState}
                placeholder="State"
                state="State"
                value={values?.state?.value}
              />
            </div>
            <div className="paddingtop">
              <TextInput
                error={errors.zip?.value}
                label="Zip"
                name="zip"
                onChange={(e) => {
                  setFieldValue("zip", {
                    value: e.target.value,
                    old_value: e.target.value,
                  });
                }}
                style={{ borderRadius: "3px" }}
                value={values.zip?.value}
              />
            </div>
          </div>
        </div>
        <Dropdown
          handleDropDownChange={(v) =>
            setFieldValue("fixture_compliance_period", v)
          }
          isUseArrayIndex
          options={optionArr}
          state={`${REPORT_TYPES.FIXTURE} Compliance Period`}
          value={values?.fixture_compliance_period}
        />
        <br />
        <Dropdown
          handleDropDownChange={(v) =>
            setFieldValue("pou_sink_and_shower_compliance_period", v)
          }
          isUseArrayIndex
          options={optionArr}
          state="POU Compliance Period For Sinks and Showers"
          value={values?.pou_sink_and_shower_compliance_period}
        />
        <br />
        <Dropdown
          handleDropDownChange={(v) =>
            setFieldValue("pou_ice_machine_compliance_period", v)
          }
          isUseArrayIndex
          options={optionArr}
          state="POU Compliance Period For Ice Machines"
          title={90}
          value={values?.pou_ice_machine_compliance_period}
        />
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
