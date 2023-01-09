import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";

import * as S from "./styled";

const InputNumber = ({ onChange, value, ...props }) => (
  <S.Wrapper>
    <Input
      max="200"
      min="1"
      name={props?.name}
      onChange={onChange}
      required
      size="middle"
      status={props?.error ? "error" : ""}
      style={{ width: "100%", marginLeft: "5px" }}
      type="number"
      value={value}
    />
    {props?.error ? <p className="errorMessage">{props?.error}</p> : ""}
  </S.Wrapper>
);

export default InputNumber;

InputNumber.propTypes = {
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
};
