import React from "react";
import MenuConfig from "../../config";
import * as Icon from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import { selectMenuList } from "../../store/reducers/tab";

const { Header, Sider, Content } = Layout;

// Dynamically get icons
const iconToElements = (name) => React.createElement(Icon[name]);
// Handle the data from menu
const items = MenuConfig.map((icon) => {
  // Without submenu
  const child = {
    key: icon.path,
    icon: iconToElements(icon.icon),
    label: icon.label,
  };
  // With submenu
  if (icon.children) {
    child.children = icon.children.map((item) => {
      return {
        key: item.path,
        label: item.label,
      };
    });
  }
  return child;
});

const CommonSider = ({ collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Add data to store
  const setTabsList = (val) => {
    dispatch(selectMenuList(val))
  }
  // Click on menu
  const selectMenu = (e) => {
    let data;
    MenuConfig.forEach((item) => {
      // Get current data
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item;
        // If there are sub menus
        if (e.keyPath.length > 1) {
          data = item.children.find((child) => {
            return child.path === e.key;
          });
        }
      }
    });
    setTabsList({
      path: data.path,
      name: data.name,
      label: data.label
    })
    navigate(e.key);
  };
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">
        {collapsed ? "Portal" : "Admin Portal System"}
      </h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{
          height: "100%",
        }}
        onClick={selectMenu}
      />
    </Sider>
  );
};

export default CommonSider;
