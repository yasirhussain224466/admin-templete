import styled from "styled-components";

export const Wrapper = styled.div`
  .ant-menu-item-selected {
    color: ${({ theme }) => theme.colors.skyBlue};
  }
  .ant-menu-item:hover {
    color: ${({ theme }) => theme.colors.skyBlue};
  }
  .ant-menu-vertical .ant-menu-item::after,
  .ant-menu-vertical-left .ant-menu-item::after,
  .ant-menu-vertical-right .ant-menu-item::after,
  .ant-menu-inline .ant-menu-item::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-right: 3px solid ${({ theme }) => theme.colors.skyBlue};
  }
  .sideBar {
    height: 92vh;
    background-color: ${({ theme }) => theme.colors.white} !important;
    border-right: 2px solid #f5f5f5 !important;
    display: none;
  }
  @media only screen and (min-width: 768px) {
    .sideBar {
      display: block;
    }
  }
`;
