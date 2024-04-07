// import axios from '../utils/request'
import axios from 'axios'
import md5 from 'md5' //加密

//登录
export const $login = async (params) =>{
    params.loginPwd = mad5(md5(params.loginPwd).split('').reverse().join(''))//加密
   let{data} = axios.get('Admin/Login',{params})
   if(data.success){
    //在浏览器存储当中存储token
    sessionStorage.setItem('token',data.token)
   }
   return data
}
//用户列表
export const $list = async (params)=>{
    let {data} = await axios.get('Admin/List',{params})
    return data
}
//添加
export const $add = async (params)=>{
    let {data} = await axios.post('Admin/Add',params)
    return data
}

//获取单个账户
export const $getOne = async ()=>{
    let {data} = await axios.get('Admin/GetOne',{params})
    return data
}
//修改账户
export const $updata = async (params)=>{
    let {data} = await axios.post('Admin/Upddate',params)
    return data
}
//删除账户
export const $del = async (params)=>{
    let {data} = await axios.post(Admin/Delete,params)
    return data
}
