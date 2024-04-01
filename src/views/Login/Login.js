import React ,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.scss'
import { Button, Form, Input } from 'antd';
import { $login } from '../../api/adminApi'
import MyNotification from '../../components/MyNotification/MyNotification';
export default function Login() {
  //判断是否登录成功
    // useEffect(() =>{
    //   if(sessionStorage.getItem('token')){
    //     navigate('/layout')
    //   }
   // },[])
  //导航
  let navigate =useNavigate()
  
  let [notiMsg,setNotiMsg] = useState({type:'',description:''}) 
  //打开提示框
  let [from] = Form.useForm()
//写死的账号 密码
  let username = 'admin'
  let password = '123456'
  function layout(){
    sessionStorage.setItem('token','1234')
    navigate('/layout') //跳转首页
  }
  //表示表单成功提交
  // const onFinish = async (values) => {
  //   let {message,success} = await $login(values)
  //   if(success){
  //     setNotiMsg({type:'success',description:message})
  //   }else{
  //     setNotiMsg({type:'error',description:message})
  //   }
  // };
  return (
    
    <div className='Login'>
      <div className='content'>
  
     <h2>欢迎登录后台!</h2>
  
      <Form
    name="basic"
    form={from}
    labelCol={{
      span: 5,
    }}
    wrapperCol={{
      span: 16,
    }}
    initialValues={{//表单初始值
      loginid:"",
      loginpwd:"",
    }}
    // onFinish={onFinish}
    // autoComplete="off"
  >
     <Form.Item
      label="账号"
      name="loginid"
      rules={[
        {
          required: true,
          message: '请输入账号',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="密码"
      name="loginpwd"
      rules={[
        {
          required: true,
          message: '请输入密码',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" onClick={layout}
      >
        登录
      </Button>
      <Button onClick={() => {
        from.resetFields()
      }} style={{marginLeft:'20px'}}>
        取消
      </Button>
    </Form.Item>
  </Form>
      </div>
    <MyNotification notiMag={notiMsg}/>
    </div>
  )
}
