import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'


function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/' element={user && user.success == true ? <Home /> : <Navigate to='/login' />} />
        <Route path='/signup' element={user && user.success == true ? <Navigate to='/' /> : <SignUp />} />
        <Route path='/login' element={user && user.success == true ? <Navigate to='/' /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App
