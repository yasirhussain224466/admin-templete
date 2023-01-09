import styled from "styled-components";

export const Error = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.skyBlue};
  h1 {
    color: ${({ theme }) => theme.colors.skyBlue};
    font-size: xx-large;
  }
`;
