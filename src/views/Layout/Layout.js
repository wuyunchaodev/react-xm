import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined, MailOutlined, SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './Layout.scss'//导入layout
const { Header, Sider, Content } = Layout;
export default function () {
  //顶部菜单
  const [current, setCurrent] = useState('mail');
  //菜单项
  const items = [   
    {
      label: '首页',  
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation Two',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: 'alipay',
    },
  ];
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className ='layout'>
      <Sider  trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >{collapsed?'苹果':"库存管理系统"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '账户',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '库存管理',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '客户管理',
            },
          ]}
        />
      </Sider>
      <Layout className='right'>
        <Header className ='header'>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Menu theme='dark' className='menu' selectedKeys={[current]} mode="horizontal" items={items} />;
        </Header>
        <Content className='content'>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
