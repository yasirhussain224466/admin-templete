import styled from "styled-components";

export const Wrapper = styled.div`
  .AppbarText {
    fontsize: 18px;
    font-family: Poppins-Medium;
    font-size: 14px;
  }
  @media only screen and (min-width: 768px) {
    .AppbarText {
      font-size: 16px;
    }
  }
  .ant-layout-header {
    padding: 0 10px;
  }
  .header {
    background-color: #0094c2;
    color: white;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1000;
  }
  .Container {
    display: flex;
    justify-content: space-between;
    height: 58px;
  }
  .IconMenu {
    color: white;
  }
  .logoImg {
    margin: 0px 5px 10px 5px;
  }
  .dropDown {
    color: white;
    margin-right: 3px;
    font-weight: bold;
  }
  .DownArrow {
    color: white;
    font-weight: bold;
    margin-right: 20px;
  }
  .hideOnMoble {
    display: none;
    margin-top: 8px;
  }
  @media only screen and (min-width: 768px) {
    .hideOnMoble {
      display: block;
    }
  }
`;
