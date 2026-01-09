import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import ResumeHub from './pages/ResumeHub'
import Preview from './pages/Preview'
import { useDispatch } from 'react-redux'
import api from './config/api'
import { Login as LoginAction, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem("token")
    try {
      if(token){
        const { data } = await api.get('/api/users/data', { headers: { Authorization: `Bearer ${token}` } })
        if(data.user){
          dispatch(LoginAction({ token, user: data.user }))
        }
      }
    } catch (error) {
      console.log("Error fetching user data:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  React.useEffect(() => { getUserData() }, [])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}> 
          <Route index element={<Dashboard />} />
          <Route path="hub/:resumeId" element={<ResumeHub />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  )
}

export default App
