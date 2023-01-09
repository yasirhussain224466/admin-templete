import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

// eslint-disable-next-line react/function-component-definition
export default function ErrorMessage({ children }) {
  return <S.Span>{children}</S.Span>;
}

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
