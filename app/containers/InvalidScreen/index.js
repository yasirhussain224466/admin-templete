import React from "react";

import Appbar from "@/components/Header";
import logo from "@/assets/images/googleAppleLogo.webp";

import * as S from "./styled";

const InvalidScreen = () => (
  <>
    <S.Wrapper>
      <Appbar />
      <div className="Container">
        <div style={{ marginTop: "15vh" }}>
          <div className="Container-Item">
            {" "}
            Please open this link on your mobile device
          </div>
          <div className="Item-child">
            <div>
              <img alt="" src={logo} />
            </div>
          </div>
        </div>
      </div>
    </S.Wrapper>
  </>
);

export default InvalidScreen;
