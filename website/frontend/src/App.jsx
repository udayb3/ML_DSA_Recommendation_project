import {Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext.jsx'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'


function App() {
  const {authUser} = useAuthContext();
  return (
    <div>
    <Routes>
       <Route path='/' element={ authUser? <Home/> : <Navigate to='/login' />}/>
       <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login/>}/>
       <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp/> }/>
    </Routes>
   </div>
  )
}

export default App
