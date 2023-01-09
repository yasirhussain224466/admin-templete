import styled from "styled-components";

export const Wrapper = styled.div`
  width: 72px;
  color: white;
  text-align: center;
  border-radius: 20px;
  background-color: ${({ type }) =>
    // eslint-disable-next-line no-nested-ternary
    type === "success" ? "#66BB6A" : type === "error" ? "#F44336" : "yellow"};
  font-size: 13px;
`;
