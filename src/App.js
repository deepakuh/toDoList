import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Login";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";

import { auth } from "./components/firebase";
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





export default function App() {

  const { Header, Sider, Content } = Layout;

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      <Routes>
        <Route index element={<Login />} />
      </Routes>
      {!(location.pathname === '/') && <Layout>
        <Sider 
        theme="light"
        trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['/home']}
            onClick={({ key }) => {
              if (key === "/") {
                console.log(1, auth)
                const confirm = window.confirm('Are you sure to logout?');
                if (confirm) {
                  signOut(auth).then(() => {
                    console.log(2)
                    localStorage.clear();
                    navigate(key);
                  })
                };
              } else {
                navigate(key);
              }
            }}
            items={[
              
              {
                key: "/home",
                icon: <HomeOutlined />,
                label: "Tasks",
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
            <h className='todoHeading'>
              To Do List
          </h>
            <h className='welcomeUser'>
              Welcome {localStorage.getItem("userName")}
          </h>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 18,
              Height: 100,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>}

    </ChakraProvider>
  );
}
