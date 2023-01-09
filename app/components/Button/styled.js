import styled from "styled-components";

export const Wrapper = styled.div`
  .ant-btn {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.skyBlue};
  }
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    color: ${({ theme }) => theme.colors.skyBlue};
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.skyBlue};
  }
`;

/* eslint-disable indent */
export const Button = styled.button`
  position: ${({ stickAtTop }) => stickAtTop && "fixed"};
  z-index: 2;
  top: ${({ stickAtTop }) => stickAtTop && "100"}px;
  background-color: ${({ hasBlueBackground, theme }) =>
    hasBlueBackground ? theme.colors.skyBlue : theme.colors.white};
  color: ${({ hasBlueBackground, theme }) =>
    hasBlueBackground ? theme.colors.white : theme.colors.gray};
  border-radius: 10px;
  display: ${({ disabled }) => (disabled ? "none" : "inline-block")};
  border: 1px solid
    ${({ hasBlueBackground, theme }) =>
      hasBlueBackground ? theme.colors.skyBlue : theme.colors.gray};
  padding: 5px;
  .flex-login-loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  text-align: center;
  font-family: Poppins-Light;
  height: 35px;
  &:hover {
    color: ${({ hasBlueBackground, theme }) =>
      hasBlueBackground ? theme.colors.white : theme.colors.white};
    background-color: ${({ hasBlueBackground, theme }) =>
      hasBlueBackground ? theme.colors.skyBlue : theme.colors.skyBlue};
    transition: 0s;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    width: auto;
    white-space: nowrap;
    /* position: sticky; */
  }
  ${({ extend }) => extend && ``}
  ${({ size }) => {
    switch (size) {
      case "xsmall":
        return `
        width: 110px !important;
        `;
      case "small":
        return `
        width: 142px;
      
        `;
      case "auto":
        return `
        width: auto;
      padding: 5px 15px;
        `;
      case "large":
        return `
        margin-top: 20px;
          width: 100% !important;
          `;
      default:
        return `
          height: 32px;
        `;
    }
  }}
`;
