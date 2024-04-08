import React, { useEffect, useState } from 'react'
import { Button,Table, Popconfirm } from 'antd'
import { $list ,$del} from '../../api/RoleApi'
import AddRole from './AddRole';
import MyNotification from '../../components/MyNotification/MyNotification';
import axios from 'axios';

export default function Role() {
  // //编辑状态id
   let [roleId,setRoleId] = useState(0)
  //  //通知栏
    let [notiMsg,setNotiMsg] = useState({type:'',description:''})
  // 是否打开抽屉
   const [open, setOpen] = useState(false);
  // //获取列表  
   let [roleList, setRoleList] = useState([])

  // //加载列表数据方法
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
  // //编辑方法
   const edit = (roleId)=>{
     setOpen(true) //打开抽屉
     setRoleId(roleId) //编辑状态
   }
  // //删除方法
  const del = (roleId) =>{
    $del({roleId}).then(({success,message})=>{
        if(success){
          setNotiMsg({type:'success',description:message})
          loadList()
        }else{
          setNotiMsg({type:'error',description:message})
        }
    })
  }
  const dataSource = [ //自定义表格内容
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '编号',
      dataIndex: 'roleId',
      key: 'roleId',
      width:'100px',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width:'200px',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width:'200px',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
      width:'200px',
    },
    {
    title:'操作',
    key:'action',
    render:(ret) => (
     <>
     <Button size="small" onClick={()=>{
      edit(ret.roleId)
     }}>
      编辑
     </Button>
      <Popconfirm   //  汽泡
    title="提示"
    description="确定删除吗?"
    onConfirm={()=>{del(ret.roleId);}}
    okText="确定"
    cancelText="取消"
  >
    <Button style={{ marginLeft:'5px'}} danger size='small'>删除</Button>
  </Popconfirm>
     </>
     
    ),
    },
  ];
  useEffect(() => {
   loadList()
  }, [])

  return (
    <div>
      <div className='search'>
        <Button size='small' onClick={() => { setOpen(true) }}>添加</Button>
      </div>
      <Table size='small' dataSource={dataSource} columns={columns} />
      <AddRole open={open} setOpen={setOpen} loadList={loadList } roleId={roleId} setRoleId={setRoleId}/>
      <MyNotification notiMag={notiMsg}/>
    </div>
  )
}
