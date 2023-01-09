import styled from "styled-components";

export const Wrapper = styled.div`
  .ant-btn {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.skyBlue};
    border: 1px solid ${({ theme }) => theme.colors.skyBlue};
  }
  .header {
    display: flex;
  }
  .textCompany {
  }
`;
