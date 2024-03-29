import React ,{useState,useEffect}from 'react'
import MyNotification from '../../components/MyNotification/MyNotification';
import { Button,Drawer,Form, Input } from 'antd'
import {$add} from '../../api/adminApi'

export default function AddAdmin({open,setOpen,loadList,LoginId,setLoginId}) {
      //定义表单实例
  let [form] = Form.useForm()
  //通知栏
  let [notiMsg,setNotiMsg] = useState({type:'',description:''})
  useEffect(()=>{
    // if(roleId!==0){
    //   $getOne({roleId}).then(data=>{
    //     form.setFieldsValue(data)
    //   })
    // }
  },[])
   //表单提交的方法
   const onFinish = (values) => {
    if(LoginId){
    //   $updata(values).then(({success,message})=>{
    //     if(success){
    //       setNotiMsg({type:'success',description:message})
    //       loadList()//重新加载
    //     }
    //     else{
    //       setNotiMsg({type:'error',description:message})
    //     }
    //   })
    }else{
      $add(values).then(({success,message})=>{
        if(success){
          setNotiMsg({type:'success',description:message})
          clear()//清空
          loadList()//加载
        }else{
          setNotiMsg({type:'error',description:message})
        }
    })
    }
  };
   //关闭抽屉
   const onClose = () => {
    clear()//清空
   // setRoleId(0) //取消编辑状态
    setOpen(false);//关闭抽屉
  };
  //清空表单的方法
  const clear =() =>{
    form.resetFieIds()
  }
  return (
   <>
    <Drawer  title={LoginId?'修改账户':'添加账户'} width={500} onClose={onClose} open={open}>
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
           <Form.Item
            label="角色编号"
            name="id"
            hidden
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="账号"
            name="loginId"
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
            name="loginPwd"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入电话',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {LoginId?'修改':'添加'}
            </Button>
            <Button onClick={clear} style={{marginLeft:'10px'}}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <MyNotification notiMag={notiMsg} />
   </>
  )
}

