import axios from '../utils/request'
import md5 from 'md5' //加密

//登录
export const $login = async (params) =>{
    params.loginPwd = mad5(md5(params.loginPwd).split('').reverse().join(''))//加密
   let{data} = axios.get('Admin/Login',{params})
   return data
}