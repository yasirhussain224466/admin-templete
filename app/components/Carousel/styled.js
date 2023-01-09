import styled from "styled-components";

export const Wrapper = styled.div`
  .nav {
    margin-top: 10px;
    height: 85px;
  }
  .rm-img {
    width: 110%;
    height: 165px;
    object-fit: contain;
    border-radius: 10px;
  }
  .inner-nav {
    padding: 0px 10px 5px 10px;
    height: 50px;
    width: 65px;
  }
  .blue {
    border-bottom: 2px solid #0094c2;
  }
  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
`;
