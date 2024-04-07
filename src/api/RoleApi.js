// import axios from '../utils/request'
import axios from 'axios'
// 货品列表
export const $list= async ()=>{
    let {data} = await axios.get('Role/list')
    return data
}

// //添加角色
export const $add = async (params)=>{
    let {data} = await axios.post('Role/Add',params)
    return data
}
// //修改角色
export const $updata = async (params)=>{
    let {data} = await axios.post('Role/Updata',params)
    return data
}
// //删除角色
export const $del = async (params)=>{
   let {data} =  await axios.post('Role/Delete',params)
   return data 
}

// //获取单个角色
export const $getOne = async(params)=>{
    let {data} = await axios.get('Role/GetOne',{params})
    return data
}