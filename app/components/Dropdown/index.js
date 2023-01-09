import React from "react";
import { Input, Select } from "antd";

import ErrorMessage from "@/components/ErrorMessage";

import * as S from "./styled";

const { Option } = Select;

const index = ({
  defaultValue,
  error,
  handleDropDownChange,
  isUseArrayIndex,
  number,
  options,
  placeholder,
  state,
  styles,
  title,
  value,
  ...rest
}) => (
  <>
    <S.Wrapper>
      <Input.Group compact>
        <p className="p-down">{state}</p>
        <Select
          className="select"
          defaultValue={defaultValue}
          onChange={handleDropDownChange}
          placeholder={placeholder}
          showSearch
          value={value}
          {...rest}
        >
          {options.map((currElem, ind) => (
            <Option value={isUseArrayIndex ? ind + 1 : currElem}>
              {currElem}
            </Option>
          ))}
        </Select>
      </Input.Group>
      <ErrorMessage>{error}</ErrorMessage>
    </S.Wrapper>
  </>
);

export default index;
