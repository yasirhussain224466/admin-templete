/* eslint-disable react/sort-prop-types */
/* eslint-disable react/function-component-definition */
//
import React from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import ErrorMessage from "@/components/ErrorMessage";

import * as S from "./styled";

export default function NumberFormatInput({
  blueLine,
  defaultValue,
  disabled,
  error,
  helper,
  label,
  name,
  onBlur,
  setFieldValue,
  type,
  value,
}) {
  return (
    <S.Wrapper>
      <h6 className="input_label">{label}</h6>
      <NumberFormat
        allowEmptyFormatting
        className={`${blueLine}  ${
          error ? "input-error error-border" : "input"
        }`}
        defaultValue={defaultValue}
        disabled={disabled}
        format="+1 (###) ###-####"
        mask="_"
        onBlur={onBlur}
        onValueChange={(values) => {
          const { value: val } = values;
          setFieldValue(name, val);
        }}
        type={type}
        value={value}
      />
      {helper}
      <ErrorMessage>{error}</ErrorMessage>
    </S.Wrapper>
  );
}

NumberFormatInput.propTypes = {
  blueLine: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  setFieldValue: PropTypes.func,
  name: PropTypes.string,
};
