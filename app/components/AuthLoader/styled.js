import styled from "styled-components";

export const Wrapper = styled.div`
  .spinner {
    display: block;
    margin: auto;
    height: 25px;
    width: 25px;
    border: 2px solid white;
    border-top-color: rgba(0, 174, 239, 0.8);
    border-radius: 50%;
    animation: rotation 0.6s infinite linear;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;
