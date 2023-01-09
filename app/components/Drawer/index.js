import React, { useState } from "react";
import { Drawer, Space } from "antd";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import Menu from "@/components/TopicMenu";
import Logo from "@/assets/images/logo.webp";

import * as S from "./styled";

const Sidebar = ({ showIcon }) => {
  const [visible, setVisible] = useState(false);

  const onOpen = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <S.Wrapper>
        {showIcon ? (
          <Space>
            <IconButton
              className="hideOneDesktop"
              onClick={onOpen}
              type="primary"
            >
              <MenuIcon className="MenuIcon" />
            </IconButton>
          </Space>
        ) : (
          ""
        )}
        <Drawer
          closeIcon={null}
          extra={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Space>
              <IconButton onClick={onClose} type="primary">
                <CloseOutlined style={{ color: "white", fontSize: "14px" }} />
              </IconButton>
            </Space>
          }
          headerStyle={{ backgroundColor: "#0094c2", height: "8.6vh" }}
          onClick={() => setVisible(false)}
          onClose={onClose}
          placement="left"
          title={<DrawerHeader />}
          visible={visible}
        >
          <Menu />
        </Drawer>
      </S.Wrapper>
    </>
  );
};

Sidebar.propTypes = {
  showIcon: PropTypes.func,
};

export default Sidebar;

const DrawerHeader = () => (
  <S.DrawerHeader>
    <span
      style={{
        display: "flex",
      }}
    >
      <span>
        <img
          alt="logo"
          className="logoImg"
          height="35px"
          src={Logo}
          width="35px"
        />
      </span>
      <span className="AppbarText">Water Saver Solution</span>
    </span>
  </S.DrawerHeader>
);
