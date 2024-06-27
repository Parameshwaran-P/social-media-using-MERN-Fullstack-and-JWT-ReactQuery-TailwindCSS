import { useState } from 'react'

import {Routes, Route} from 'react-router-dom';
import Home from './Pages/home/Home';
import SignUp from './Pages/auth/signup/SignUp';
import Login from './Pages/auth/login/Login';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './Pages/notification/NotificationPage';
import ProfilePage from './Pages/profile/ProfilePage';
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex max-w-6xl mx-auto'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/notifications' element={<NotificationPage/>}/>
          <Route path='/profile/:username' element={<ProfilePage/>}/>
        </Routes>
        <RightPanel/>
        <Toaster/>
      </div>
    </>
  )
}

export default App
