/* eslint-disable react/jsx-sort-default-props */
/* eslint-disable react/sort-prop-types */
import React from "react";
import PropTypes from "prop-types";

import AuthLoader from "../AuthLoader/index";

import * as S from "./styled";

const Button = ({
  disabled,
  extend,
  loading,
  onClick,
  ref,
  size,
  value,
  ...rest
}) => (
  <S.Button
    ref={ref}
    disabled={disabled}
    extend={extend}
    name={rest.name}
    onClick={onClick}
    onScroll={rest.onScroll}
    size={size}
    stickAtTop={rest.stickAtTop}
    type="button"
    {...rest}
  >
    <div className="flex-login-loader">{loading ? <AuthLoader /> : value}</div>
  </S.Button>
);

Button.propTypes = {
  extend: PropTypes.bool,
  loading: PropTypes.bool,
  rest: PropTypes.shape(),
  size: PropTypes.string,
  value: PropTypes.func,
  hasBlueBackground: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  ref: PropTypes.func,
};

Button.defaultProps = {
  extend: false,
  loading: false,
  rest: {},
  size: "small",
  value: () => {},
  hasBlueBackground: true,
  disabled: false,
};

export default Button;
