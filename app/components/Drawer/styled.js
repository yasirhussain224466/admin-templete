import styled from "styled-components";

export const Wrapper = styled.div`
  .hideOneDesktop {
    display: block;
    margin-top: 10px;
  }
  .MenuIcon {
    text-align: center;
    color: white;
  }
  @media only screen and (min-width: 768px) {
    .hideOneDesktop {
      display: none;
    }
  }
  .ant-drawer-content-wrapper[style] {
    width: 250px !important;
  }
  .ant-drawer-close {
    display: none !important;
  }
  .ant-drawer-header {
    background-color: red !important;
  }
  .CloseIcon {
    color: white !important;
    font-size: 15px;
  }
`;

export const DrawerHeader = styled.div`
  .AppbarText {
    font-family: Poppins-Medium;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 5px;
    color: white;
  }
  ,
  .logoImg {
    /* margin: 0px 5px 10px 5px; */
    color: red;
  }
`;
