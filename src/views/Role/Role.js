import React, { useEffect, useState } from 'react'
import { Button,Table, Drawer,Form, Input } from 'antd'
import { $list ,$add} from '../../api/RoleApi'
import MyNotification from '../../components/MyNotification/MyNotification';
export default function Role() {
  //定义表单实例
  let [form] = Form.useForm()
  //通知栏
  let [notiMsg,setNotiMsg] = useState({type:'',description:''})
  //是否打开抽屉
  const [open, setOpen] = useState(false);
  //关闭抽屉
  const onClose = () => {
    clear()//清空
    setOpen(false);
  };
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
  //清空表单的方法
  const clear =() =>{
    form.setFieldsValue({roleName:''})
  }
  //获取列表  
  let [roleList, setRoleList] = useState([])
  useEffect(() => {
   loadList()
  }, [])
  //加载列表数据方法
  const loadList =()=>{
    $list().then(data => {
      data = data.map(r => {
        return {
          ...r,
          key: r.roleId
        }

      })
      setRoleList(data)
    })
  }
  // const dataSource = [ 自定义表格内容
  //   {
  //     key: '1',
  //     name: '胡彦斌',
  //     age: 32,
  //     address: '西湖区湖底公园1号',
  //   },
  //   {
  //     key: '2',
  //     name: '胡彦祖',
  //     age: 42,
  //     address: '西湖区湖底公园1号',
  //   },
  // ];

  const columns = [
    {
      title: '编号',
      dataIndex: 'roleId',
      key: 'roleId',
    },
    {
      title: '名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
  ];
  return (
    <div>
      <div className='search'>
        <Button size='small' onClick={() => { setOpen(true) }}>添加</Button>
      </div>
      <Table size='small' dataSource={dataSource} columns={columns} />;
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
      <MyNotification notiMag={notiMag}/>
    </div>
  )
}
