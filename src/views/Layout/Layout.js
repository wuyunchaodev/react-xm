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
  const [current, setCurrent] = useState('mail');
  //顶部菜单项
  const items = [   
    {
      label: '首页',  
      key: 'home',
      icon: <MailOutlined />,
    },
    {
      label: '库存',  
      key: 'kc',
      icon: <MailOutlined />,
    },
    {
      label: '账单',  
      key: 'rich',
      icon: <MailOutlined />,
    },
    {
      label: '管理功能',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'group1',
          label: '个人中心',
          children: [
            {
              label: '个人信息',
              key: 'setting:1',
            },
            {
              label: '退出系统',
              key: 'setting:2',
            },
          ],
        },
        {
          key: 'group2',
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
  ];
  //左侧菜单项
  const items2 = [
    [
      {
        key: '1',
        icon: <UserOutlined />,
        label: '账户',
        children:[
          {
            key:'1-1',
            label:'角色管理'
          },
          {
            key:'1-2',
            label:'财务管理'
          }
        ]
      },
      {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: '库存管理',
        children:[
          {
            key:'2-1',
            label:'价格管理'
        },
        {
          key:'2-2',
          label:'数量管理'
        },
      ]
      },
      {
        key: '3',
        icon: <UploadOutlined />,
        label: '客户管理',
        children:[
          {
            key:3-1,
            label:'商家联系方式'
          },
          {
            key:3-2,
            label:'交易成功记录'
          }
        ]
      },
    ]
  ]
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className ='layout'>
      <Sider  trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >{collapsed?'苹果':"库存管理系统"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items2}
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
          <Menu onClick={(onClickMenu)} theme='dark' className='menu' selectedKeys={[current]} mode="horizontal" items={items} />;
        </Header>
        <Content className='content'>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
