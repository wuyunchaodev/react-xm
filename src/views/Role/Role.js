import React, { useEffect, useState } from 'react'
import { Button,Table, Popconfirm } from 'antd'
import { $list ,$del} from '../../api/RoleApi'
import AddRole from './AddRole';
import MyNotification from '../../components/MyNotification/MyNotification';
export default function Role() {
   //通知栏
   let [notiMsg,setNotiMsg] = useState({type:'',description:''})
  //是否打开抽屉
  const [open, setOpen] = useState(false);
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
  //删除方法
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
      width:'100px',
    },
    {
      title: '名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width:'200px',
    },
    {
    title:'操作',
    key:'action',
    render:(ret) => (
      <Popconfirm   //  汽泡
    title="提示"
    description="确定删除吗?"
    onConfirm={()=>{del(ret.roleId);}}
    okText="确定"
    cancelText="取消"
  >
    <Button danger size='small'>删除</Button>
  </Popconfirm>
     
    ),
    },
  ];
  return (
    <div>
      <div className='search'>
        <Button size='small' onClick={() => { setOpen(true) }}>添加</Button>
      </div>
      <Table size='small' dataSource={dataSource} columns={columns} />;
      <AddRole open={open} setOpen={setOpen} loadList={loadList}/>
      <MyNotification notiMag={notiMsg} />
    </div>
  )
}
