import React from "react";

import * as S from "./styled";

const Loader = () => (
  <S.Wrapper>
    <div className="loader-wrapper">
      <div className="loader">
        <div className="roller" />
        <div className="roller" />
      </div>
      <div className="loader loader-2">
        <div className="roller" />
        <div className="roller" />
      </div>
      <div className="loader loader-3">
        <div className="roller" />
        <div className="roller" />
      </div>
    </div>
  </S.Wrapper>
);
export default Loader;
