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
    const loadProfile = () => {
      if (token) {
        authLoadProfileByToken(token)
          .then((response) => {
            dispatch(setMyUser(response.data))
          })
          .catch(() => {
            localStorage.removeItem('token')
            window.location.reload()
          })
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
