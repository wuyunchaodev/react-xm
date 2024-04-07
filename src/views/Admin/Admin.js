import React ,{useState,useEffect}from 'react'//money 交易成功记录
import {Table,Button,Popconfirm,Pagination ,Select} from 'antd'
import {$list,$del} from '../../api/adminApi'
import {$list as $roleList} from '../../api/RoleApi'
import AddAdmin from './AddAdmin';
import MyNotification from '../../components/MyNotification/MyNotification';

export default function Admin() {
    //货品id 用于筛选列表数据
    let [roleId,setRoleId] = useState(0)
    //货品表单
    let [roleList,setRoleList] = useState([]); //不知道为什么没有调用
     //加载货品表单的方法
    const loadRoleList = ()=>{
      $roleList().then((data) => {
      data = data.map((r) => {
        return{
          value:r.roleId,
          lable:r.roleName
        }
      })
      data.unshifs({value:0,lable:'请选择类别'})
      setRoleList(data);
    })
  }
    //总数量
    let [count,setCount] = useEffect(1)
    //页码
    let [pageIndex,setPageIndex] = useState(1)
    //  //通知栏
    let [notiMsg,setNotiMsg] = useState({type:'',description:''})
    //是否打开抽屉
     const [open, setOpen] = useState(false);
    //角色列表数据
    let [adminList, setAdminList] = useState([])
    //编辑状态id
    let [loginId,setLoginId] = useState(0)
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
          width:'200px',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width:'100px',
          },
          {
            title: '电话',
            dataIndex: 'phone',
            width:'300px',
          },

       {
        title:'操作',
        key:'action',
        render:(ret) => (
         <>
         <Button size="small" onClick={()=>{
          edit(ret.loginId)
         }}>
          编辑
         </Button>
         //删除 传id和name
          <Popconfirm   //  汽泡
        title="提示"
        description="确定删除吗?"
        onConfirm={()=>{
          del(ret.id,ret.name);
        }}
        okText="确定"
        cancelText="取消"
      >
        <Button style={{ marginLeft:'5px'}} danger size='small'>删除</Button>
      </Popconfirm>
         </>
         
        ),
        },
       ];
       const edit = (loginId)=>{
           setOpen(true) //打开抽屉
           setLoginId(loginId) //编辑状态
         }
         //删除
         const del = (id,phone) =>{
          $del({id,phone}).then(({success,message})=>{
              if(success){
                setNotiMsg({type:'success',description:message})
                loadList()
              }else{
                setNotiMsg({type:'error',description:message})
              }
          })
        }
        //加载列表的方法
       const loadList =()=>{
        $list({roleId,pageSize:8,pageIndex}).then(({data,count}) => {
          data = data.map(r => {
            return {
              ...r,
              key: r.loginId,
              //roleName:r.role.roleName 角色显示
            }
          });
          //设置账户数据
          setRoleList(data);
          //设置总数量
          setCount(count);
        })
      }
      useEffect(() => {
        loadRoleList() //加载品类列表数据
        loadList() //加载列表数据
       }, [pageIndex])
  return (
    <>
     <div className='search'>
      <span>品类：</span>
      <Select size='small' style={{width:'200px'}} options={RoleList} defaultValue={0} onSelect={(value)=>
        setRoleId(value)
      }></Select>
      <Button size='small' onClick={()=>(loadList())}>查询</Button>
        <Button size='small' onClick={() => { setOpen(true) }}>添加</Button>
      </div>
    <Table size='small' dataSource={adminList} columns={columns} pagination={false}/>;
    <Pagination defaultCurrent={pageIndex} total={count} pageSize={8} onChange={(page)=>{
        setPageIndex(page)
    }}/>; //分页器
    <AddAdmin open={open} setOpen={setOpen} LoadList={loadList} LoginId={loginId} setLoginId={setLoginId}/>
    <MyNotification notiMag={notiMsg}/>
    </>
  )
}
