import { createSlice ,configureStore} from "@reduxjs/toolkit";

//创建子模块
export const adminSlice = createSlice({
    name:'loginAdmin',
    //初始化状态
    initialState:{
        admin:{
            loginid:'',
            name:'',
            phone:'',
            roleName:''
        }
    },
    //整合器
    reducers:{
        setAdmin(state,action){
            state.admin = action.payload
        }
    }
})
//创建store,合并模块
const store = configureStore({
    reducer:{
        adminSlice:adminSlice.reducer
    }
})
export default store