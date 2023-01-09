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
  .ant-tabs-tab {
    width: 120px;
    justify-content: center;
  }
  .ant-tabs {
    overflow: overlay;
    margin: 10px;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.skyBlue};
  }
  .ant-tabs-ink-bar {
    position: absolute;
    background: ${({ theme }) => theme.colors.skyBlue};
    pointer-events: none;
  }
  .table-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
  }
`;
