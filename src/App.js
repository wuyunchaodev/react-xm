import {BrowserRouter,Routes,Route} from 'react-router-dom'
//导入页面组件

import Login from './views/Login/Login';
import Layout from './views/Layout/Layout';
import Role from './views/Role/Role';
import Admin from './views/Admin/Admin';
import Mine from './views/Admin/Mine';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Login/>}/>  
        <Route path = '/Layout' element={<Layout/>}> //主页面
          <Route path='role' element={<Role/>}/> // 角色管理页面
          <Route path='admin' element={<Admin/>}/> //交易成功记录页面
          <Route path='mine' element={<Mine/>}/> //个人信息页面
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
