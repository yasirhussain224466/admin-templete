/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { DownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Drawer from "@/components/Drawer/index";
// import Logo from "@/assets/images/fixture.webp";

import * as S from "./styled";

const { Header } = Layout;

const AppHeader = ({ logout, toggle }) => {
  const { currentUser } = useSelector((state) => state.global);
  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <S.Wrapper>
      <Header className="header">
        <span className="Container">
          <span
            style={{
              display: "flex",
            }}
          >
            <span>
              {currentUser?._id && (
                <>
                  <IconButton className="hideOnMoble" onClick={toggle}>
                    <MenuIcon className="IconMenu" />
                  </IconButton>
                </>
              )}
              <Drawer showIcon={currentUser?._id} />
            </span>
            <span>
              {/* <img
                alt="logo"
                className="logoImg"
                height="35px"
                src={Logo}
                width="35px"
              /> */}
            </span>
            <span className="AppbarText">Dashboard</span>
          </span>

          {currentUser?._id ? (
            <Dropdown overlay={menu} placement="bottom" trigger={["click"]}>
              <a href="#">
                <span className="dropDown">{currentUser?.full_name}</span>
                <DownOutlined className="DownArrow" />
              </a>
            </Dropdown>
          ) : (
            ""
          )}
        </span>
      </Header>
    </S.Wrapper>
  );
};

AppHeader.propTypes = {
  logout: PropTypes.func,
  toggle: PropTypes.func,
};

export default AppHeader;
