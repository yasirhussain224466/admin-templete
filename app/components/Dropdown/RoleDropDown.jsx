/* eslint-disable react/prop-types */
import React from "react";
import { Input, Select } from "antd";

import ErrorMessage from "@/components/ErrorMessage";

import * as S from "./styled";

const { Option } = Select;

const RoleDropDown = ({
  error,
  handleDropDownChange,
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
          className={`select ${rest?.blueLine}  ${
            error ? "input-error error-border" : "input"
          }`}
          defaultValue={value}
          onChange={handleDropDownChange}
          placeholder={placeholder}
          showSearch
          value={value}
          {...rest}
        >
          {" "}
          {Array.isArray(options) &&
            options?.map((currElem) => (
              // eslint-disable-next-line no-underscore-dangle
              <Option value={currElem?._id}>{currElem?.name}</Option>
            ))}
        </Select>
        <ErrorMessage>{error}</ErrorMessage>
      </Input.Group>
    </S.Wrapper>
  </>
);
export default RoleDropDown;
