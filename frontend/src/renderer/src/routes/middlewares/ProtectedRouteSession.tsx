import React from 'react'
import { setMyUser } from '@renderer/features/userSlice'
import { useDispatch } from 'react-redux'
import { setHospitalStats } from '@renderer/features/hospitalSlice'
import { Navigate, Outlet } from 'react-router-dom'
import { authLoadProfileByToken, reqGetHospitalStats } from '@renderer/api/Requests'

const ProtectedRouteSession = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to='/login' />

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        if (token) {
          const response = await authLoadProfileByToken(token)
          dispatch(setMyUser(response.data))
        }
      } catch (error) {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }
    loadProfile()
  }, [token])

  React.useEffect(() => {
    const loadHospitalStats = async () => {
      const response = await reqGetHospitalStats()
      dispatch(setHospitalStats(response.data))
    }
    loadHospitalStats()
  })

  return <Outlet />
}

export default ProtectedRouteSession
