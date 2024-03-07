import React from 'react'
import './Login.scss'
import { Button, Form, Input } from 'antd';

export default function Login() {
  let [from] = Form.useForm()
  //表示表单成功提交
  const onFinish = (values) => {
    console.log('Success:', values);
  };
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
    onFinish={onFinish}
    autoComplete="off"
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
      <Button type="primary" htmlType="submit">
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
    </div>
  )
}
