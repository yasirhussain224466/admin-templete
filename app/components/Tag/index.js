import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

const Tag = ({ text, type }) => <S.Wrapper type={type}>{text}</S.Wrapper>;

export default Tag;
Tag.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};
