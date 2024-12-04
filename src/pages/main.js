import React from "react";
import { Layout, theme } from "antd";
import CommonSider from "../components/commonSider";
import CommonHeader from "../components/commonHeader";
import CommonTag from "../components/commonTag";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RouterAuth } from "../router/routerAuth";

const { Header, Sider, Content } = Layout;

const Main = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // Get the state of menu
  const collapsed = useSelector((state) => state.tab.isCollapse);
  return (
    <RouterAuth>
      <Layout className="main-container">
        <CommonSider collapsed={collapsed} />
        <Layout>
          <CommonHeader collapsed={collapsed} />
          <CommonTag />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  );
};

export default Main;
