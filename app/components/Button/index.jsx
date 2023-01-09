import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import * as S from "./styled";

const Index = ({ disabled, onClick, size, type, value }) => (
  <S.Wrapper>
    <Button
      disabled={disabled}
      onClick={onClick}
      size={size}
      style={{ fontSize: "14px" }}
      type={type}
    >
      {value}
    </Button>
  </S.Wrapper>
);

Index.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.func,
};

Index.defaultProps = {
  type: "default",
};

export default Index;
