import styled from "styled-components";

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Modal = styled.div`
  width: 500px;
  height: calc(100% - 60px);
`;

export const Wrapper = styled.div`
  .button {
    display: flex;
  }
  .Modal {
    padding: 7px 24px;
    .ant-modal-header {
      border-top: 2px solid ${({ theme }) => theme.colors.skyBlue};
    }
  }
  .Modal {
    .ant-modal-body {
      padding: 7px 24px 7px 24px;
      overflow-y: auto;
    }
  }
  .footerButton {
    display: flex;
    justify-content: end;
  }
`;
export const Company = styled.div`
  .title {
    font-size: 20px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 2px solid #0094c2;
  }
  .input_label {
    margin-bottom: 5px;
    margin-top: 0;
    letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
  }
  .compliance {
    font-size: 12px;
    color: #8a9099;
    padding-bottom: 12px;
  }
  .margin-left {
    margin-left: 3px;
  }
  .paddingtop {
    padding-top: 4px;
  }
  .textField {
    border-radius: 3px;
  }
  .md-04 {
    display: flex;
    justify-content: space-between;
  }
  .nd-04 {
    width: 210px;
    margin-top: 0px;
    margin-right: 10px;
  }
  .pd-04 {
    display: flex;
    margin-bottom: 10px;
  }
  .pad {
    padding: 10px 5px 10px 0px;
  }
`;
export const Campany = styled.div`
  .title {
    font-size: 20px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 2px solid #0094c2;
  }
  .textField {
    border-radius: 3px;
  }
`;

export const Room = styled.div`
  .beforeAfter {
    display: flex;
    justify-content: center;
    align-items: "center";
    background-color: "grey";
    height: "32px";
    border-top-left-radius: "5px";
    border-top-right-radius: "5px";
  }
  .row {
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .title {
    font-size: 20px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 2px solid #0094c2;
  }
  .slider-wrapper {
    display: "flex";
    justify-content: center;
  }
  .slick-arrow .slick-next {
    color: black;
  }
`;
