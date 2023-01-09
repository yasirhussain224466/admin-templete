import React from "react";
import { Switch } from "antd";
import PropTypes from "prop-types";

import * as S from "./styled";

const Index = ({ onChange, value }) => (
  <S.Wrapper>
    <Switch checked={value} defaultChecked onChange={onChange} />
  </S.Wrapper>
);

Index.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
};

export default Index;
