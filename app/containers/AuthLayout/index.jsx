import React from "react";
import PropType from "prop-types";

import * as S from "./styled";

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children }) => (
  <S.AuthLayout>
    <S.Main>{children}</S.Main>
  </S.AuthLayout>
);

AuthLayout.propTypes = {
  children: PropType.element,
};

export default AuthLayout;
