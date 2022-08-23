import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'


const RouteSwitch = (props) => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='signup' element={<Signup />}></Route>
        <Route path='dashboard' element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;