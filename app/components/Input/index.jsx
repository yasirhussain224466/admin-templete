/* eslint-disable react/sort-prop-types */
import React from "react";
import PropTypes from "prop-types";

import ErrorMessage from "@/components/ErrorMessage";

import * as S from "./styled";

const TextInput = ({
  blueLine,
  defaultValue,
  disabled,
  error,
  helper,
  label,
  maxLength,
  onBlur,
  onChange,
  onKeyDown,
  placeholder,
  type,
  value,
  ...rest
}) => (
  <S.Wrapper>
    <h6 className="input_label">{label}</h6>
    <input
      className={`${blueLine}  ${error ? "input-error error-border" : "input"}`}
      defaultValue={defaultValue}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      type={type}
      value={value}
      {...rest}
    />
    {helper}
    <ErrorMessage>{error}</ErrorMessage>
  </S.Wrapper>
);

TextInput.propTypes = {
  blueLine: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.func,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLength: PropTypes.number,
  onKeyDown: PropTypes.func,
};

TextInput.defaultProps = {
  disabled: false,
  error: "",
  type: "text",
  value: "",
};
export default TextInput;
