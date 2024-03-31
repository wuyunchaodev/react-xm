import React ,{useState,useEffect}from 'react'//money
import {Table,Button} from 'antd'
import {$list} from '../../api/adminApi'
import AddAdmin from './AddAdmin';

export default function Admin() {
    //是否打开抽屉
     const [open, setOpen] = useState(false);
    //角色列表数据
    let [adminList, setAdminList] = useState([])
    //表格列数据
    const columns = [
        {
          title: '编号',
          dataIndex: 'id',
          width:'100px',
        },
        {
          title: '账号',
          dataIndex: 'loginId',
          width:'00px',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width:'00px',
          },
          {
            title: '电话',
            dataIndex: 'loginId',
            width:'00px',
          },

      //  {
    //     title:'操作',
    //     key:'action',
    //     render:(ret) => (
    //      <>
    //      <Button size="small" onClick={()=>{
    //       edit(ret.roleId)
    //      }}>
    //       编辑
    //      </Button>
    //       <Popconfirm   //  汽泡
    //     title="提示"
    //     description="确定删除吗?"
    //     onConfirm={()=>{del(ret.roleId);}}
    //     okText="确定"
    //     cancelText="取消"
    //   >
    //     <Button style={{ marginLeft:'5px'}} danger size='small'>删除</Button>
    //   </Popconfirm>
    //      </>
         
    //     ),
    //     },
       ];
       const loadList =()=>{
        $list({}).then(({data,count}) => {
          data = data.map(r => {
            return {
              ...r,
              key: r.loginId
            }
          })
          setRoleList(data)
        })
      }
      useEffect(() => {
        loadList()
       }, [])
  return (
    <>
     <div className='search'>
        <Button size='small' onClick={() => { setOpen(true) }}>添加</Button>
      </div>
    <Table size='small' dataSource={adminList} columns={columns} />;
    <AddAdmin open={open} setOpen={setOpen} loadList={loadList}/>
    </>
  )
}
