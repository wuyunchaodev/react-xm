import React, { useState,useEffect } from 'react';
import {
  DollarOutlined,
  HomeOutlined ,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined, MailOutlined, SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, Modal } from 'antd';
import {useNavigate,Outlet} from 'react-router-dom'
import './Layout.scss'//导入layout
const {confirm} = Modal;
const { Header, Sider, Content } = Layout;
export default function () {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!sessionStorage.getItem('token')){
      navigate('/')
    }
  },[])
  const [current, setCurrent] = useState('mail');
  //顶部菜单项
  const items = [   
    {
      label: '首页',  
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: '库存',  
      key: 'kc',
      icon: <MailOutlined />,
    },
    {
      label: '账单',  
      key: 'rich',
      icon: <DollarOutlined />,
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
              key: 'exit',
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
  const items1 = [
      {
        key: '1',
        icon: <UserOutlined />,
        label: '账户',
        children:[
          {
            key:'role',
            label:'角色管理'
          },
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
            key:'3-1',
            label:'商家联系方式'
          },
          {
            key:'money',
            label:'交易成功记录'
          }
        ]
      },
  ]

  //点击菜单方法
  const onClickMenu = (e)=>{
    setCurrent(e.key)
    switch(e.key){
      //角色管理
      case 'role':
        navigate('/layout/role')
        break;
        //交易成功记录
        case"money":
        navigate("/layout/admin")
        break;
      //退出系统
      case 'exit':
        confirm({
          title:'系统提示',
          icon:<SettingOutlined />,
          content:'确定退出吗？',
          okText:'确定',
          canceLText:'取消',
          onOk(){
            //清除缓存
            sessionStorage.clear()
            localStorage.clear()
            navigate('/')//跳转首页
          },
        });
        break
    }
  }
  //侧边状态栏
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className ='layout'>
      <Sider  trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >{collapsed?'苹果':"库存管理系统"}</div>
        <Menu
        onClick={onClickMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items1}
        />
      </Sider>
      <Layout className='right'>
        <Header className ='header'>
          <Button
          className='trigger'
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
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
    
  );
};
