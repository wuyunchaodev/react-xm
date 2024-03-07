import React from 'react'
import './Login.scss'
import { Button, Form, Input ,notification} from 'antd';
import { $login } from '../../api/adminApi'
import MyNotification from '../../components/MyNotification/MyNotification';
export default function Login() {
  //提示框
  const [api, contextHolder] = notification.useNotification();
  //打开提示框
  const openNotification = (type,description) => {
    api[type]({
      message: '系统提示',
      description
    });
  };
  let [from] = Form.useForm()
  //表示表单成功提交
  const onFinish = async (values) => {
    let {message,success} = await $login(values)
    if(success){
      openNotification('success',message)
    }else{
      openNotification('error',message)
    }
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
      {contextHolder}
    </div>
  )
}
