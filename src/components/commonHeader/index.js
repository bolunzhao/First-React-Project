import React from "react";
import { Button, Layout, Avatar, Dropdown } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import "./index.css";
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducers/tab'

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  // Log out
  const logout = () => {};
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Account
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => logout} target="_blank" rel="noopener noreferrer">
          Log Out
        </a>
      ),
    },
  ];
  // Create dispatch
  const dispatch = useDispatch()
  // Click on the collapse button
  const setCollapsed = () => {
    console.log(collapsed)
    dispatch(collapseMenu())
  }
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={<MenuFoldOutlined />}
        style={{
          fontSize: "16px",
          width: 64,
          height: 32,
          backgroundColor: "#fff",
        }}
        onClick={() => setCollapsed() }
      />
      <Dropdown
      menu={{items}}>
        <Avatar
          size={36}
          src={<img src={require("../../assets/images/user.png")} />}
        />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
