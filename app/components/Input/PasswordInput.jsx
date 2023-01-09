import PropTypes from "prop-types";
import React, { useState } from "react";

import visibility from "@/assets/images/visibility.svg";
import visibilityOff from "@/assets/images/visibilityOff.svg";

import ErrorMessage from "../ErrorMessage/index";

import * as S from "./styled";

const TextInput = ({
  disabled,
  error,
  label,
  onBlur,
  onChange,
  placeholder,
  value,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <S.Wrapper>
      <h6 className="input_label">{label}</h6>
      <div
        className={`Passwordflex ${
          error ? "with-input-error error-border" : "with-input"
        }  j-btw ${error && "red-border"}`}
      >
        <input
          className="pass-input"
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          type={passwordShown ? "text" : "password"}
          value={value}
        />
        <button
          className="fade-btn"
          onClick={togglePasswordVisiblity}
          type="button"
        >
          {passwordShown ? (
            <img alt="visibility" className="icon-see" src={visibility} />
          ) : (
            <img alt="visibilityOff" className="icon-see" src={visibilityOff} />
          )}
        </button>
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </S.Wrapper>
  );
};

TextInput.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  // eslint-disable-next-line react/sort-prop-types
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  error: "",
  // eslint-disable-next-line react/jsx-sort-default-props
  disabled: false,
};
export default TextInput;
