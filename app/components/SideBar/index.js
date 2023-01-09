import React from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";

import Menu from "@/components/TopicMenu";

import * as S from "./styled";

const { Sider } = Layout;

const SideBar = ({ collapsed }) => (
  <>
    {" "}
    <S.Wrapper>
      <Sider
        breakpoint="lg"
        className="sideBar"
        collapsed={collapsed}
        collapsible
        defaultSelectedKeys={["1"]}
        trigger={null}
        width={200}
      >
        <div className="logo" />
        <Menu />
      </Sider>
    </S.Wrapper>
  </>
);

SideBar.propTypes = {
  collapsed: PropTypes.bool,
};

export default SideBar;
