/* eslint-disable react/jsx-sort-default-props */
/* eslint-disable react/sort-prop-types */
import React from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { Button } from "antd";
import PropTypes from "prop-types";

import theme from "@/styles/theme";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

const Menu = (props) => (
  <>
    <components.Menu {...props}>
      <div>
        <div>{props.children}</div>
        <Button
          onClick={props.selectProps.changeOptionsData}
          style={{ width: "100%", borderLeft: "none", borderRight: "none" }}
        >
          {props.selectProps.fetchingData ? "Fetching ..." : "Load More"}
        </Button>
      </div>
    </components.Menu>
  </>
);

const Option = (props) => (
  <components.Option {...props}>{props.children}</components.Option>
);

const Custom = ({
  changeOptionsData,
  disabled,
  error,
  fetchingData,
  isClearable,
  isMulti,
  isObject,
  loadOptions,
  onChange,
  onInputChangeHandler,
  options,
  value,
}) => (
  <S.DropDownContainer>
    <AsyncSelect
      cacheOptions
      changeOptionsData={changeOptionsData}
      components={{ Menu, Option, IndicatorSeparator: () => null }}
      defaultOptions={options}
      defaultValue={value}
      fetchingData={fetchingData}
      getOptionLabel={(opt) => (!isObject ? opt?.name : opt?.name?.value)}
      // eslint-disable-next-line no-underscore-dangle
      getOptionValue={(opt) => opt?._id}
      isClearable={isClearable || false}
      isDisabled={disabled}
      isMulti={isMulti}
      loadOptions={loadOptions}
      maxMenuHeight={80}
      menuPortalTarget={document.querySelector("body")}
      onChange={onChange}
      onInputChange={onInputChangeHandler}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (styles) => ({
          ...styles,
          zIndex: 22,
          backgroundColor: "white",
          borderColor: error ? theme.colors.yellowishOrange : "#C6C6C6",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#0057FF",
          },
          "&:focus": {
            borderColor: "#0057FF",
          },
        }),
      }}
      value={value}
    />
    <ErrorMessage>{error}</ErrorMessage>
  </S.DropDownContainer>
);

Custom.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.arrayOf(PropTypes.object),
  changeOptionsData: PropTypes.func,
  fetchingData: PropTypes.bool,
  loadOptions: PropTypes.func,
  isObject: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onInputChangeHandler: PropTypes.func,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
};

Custom.defaultProps = {
  options: [],
  changeOptionsData: () => {},
  fetchingData: false,
  loadOptions: () => {},
  onChange: () => {},
  error: "",
  value: "",
  isObject: true,
  disabled: false,
  isClearable: true,
  isMulti: false,
  onInputChangeHandler: () => {},
};

Menu.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    changeOptionsData: PropTypes.func,
    fetchingData: PropTypes.bool,
  }),
};

Option.propTypes = {
  children: PropTypes.node,
};

export default Custom;
