import styled from "styled-components";

export const Wrapper = styled.div`
  .ant-switch-checked {
    background-color: ${({ theme }) => theme.colors.skyBlue};
  }
  .divider {
    background: ${({ theme }) => theme.colors.skyBlue};
  }
`;
