import React ,{useState}from 'react'
import MyNotification from '../../components/MyNotification/MyNotification';
import { Button,Drawer,Form, Input } from 'antd'
import {$add} from '../../api/RoleApi'

export default function AddRole({open,setOpen,loadList}) {
      //定义表单实例
  let [form] = Form.useForm()
  //通知栏
  let [notiMsg,setNotiMsg] = useState({type:'',description:''})
   //表单提交的方法
   const onFinish = (values) => {
    $add(values).then(({success,message})=>{
      if(success){
        setNotiMsg({type:'success',description:message})
        clear()//清空
        loadList()//加载
      }else{
        setNotiMsg({type:'error',description:message})
      }
    })
  };
   //关闭抽屉
   const onClose = () => {
    clear()//清空
    setOpen(false);
  };
  //清空表单的方法
  const clear =() =>{
    form.setFieldsValue({roleName:''})
  }
  return (
   <>
    <Drawer title="添加角色" width={500} onClose={onClose} open={open}>
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
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="角色名称"
            name="rolename"
            rules={[
              {
                required: true,
                message: '请输入角色名称',
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
              添加
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
