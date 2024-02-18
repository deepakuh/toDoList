/*import { React, useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  MailOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;

function Navscreen() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "/") {
              signOut(auth).then(() => {
                navigate(key);
              });
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "/home",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "/about",
              icon: <QuestionCircleOutlined />,
              label: "About",
            },
            {
              key: "/contact",
              icon: <MailOutlined />,
              label: "Contact",
            },
            {
              key: "/",
              icon: <LogoutOutlined />,
              label: "Signout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          Welcome {localStorage.getItem("userName")}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 18,
            maxHeight: 1000,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        </Content>
      </Layout>
    </Layout>
  );
}
export default Navscreen;*/
