import React from "react";
import { Layout } from "antd";
import PropType from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import storage from "@/utils/storage";
import { logout } from "@/redux/global/actions";

import * as S from "./styled";

const { Content } = Layout;

const Index = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = () => {
    storage.clear();
    dispatch(logout());
    history.push("/login");
  };
  return (
    <>
      <S.Wrapper>
        <Header logout={handleLogout} toggle={toggle} />
        <Layout>
          <Sidebar collapsed={collapsed} />
          <Content className="site-layout content">{children}</Content>
        </Layout>
      </S.Wrapper>
    </>
  );
};

export default Index;

Index.propTypes = {
  children: PropType.element,
};
