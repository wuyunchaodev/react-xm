import React, { useEffect, useState } from 'react'
import { Button,Table, Drawer,Form, Input } from 'antd'
import { $list ,$add} from '../../api/RoleApi'
import AddRole from './AddRole';
export default function Role() {

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
      <AddRole open={open} setOpen={setOpen} loadList={loadList}/>
    </div>
  )
}
