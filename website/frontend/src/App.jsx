import {Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'


function App() {
  const {user} = useAuthContext();
  return (
    <div>
    <Routes>
        <Route path='/' element={ user ? <Home/> : <Navigate to='/login' />}/>
        <Route path='/signup' element={ user ? <Navigate to='/' /> : <SignUp/> }/>
        <Route path='/login' element={ user ? <Navigate to='/' /> : <Login/>}/>
    </Routes>
   </div>
  )
}

export default App
