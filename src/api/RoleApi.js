import axios from '../utils/request'

//角色列表
export const $list= async ()=>{
    let {data} = await axios.get('Role/list')
    return data
}

//添加角色
export const $add = async (params)=>{
    let {data} = await axios.post('Role/Add',params)
    return data
}
//删除角色
export const $del = async (params)=>{
    let {data} = await.post('Role/Delete',params)
    return data 
}