import { Login } from '@renderer/pages/Auth/Login'
import { Register } from '@renderer/pages/Auth/Register'
import { Consults } from '@renderer/pages/Consults'
import { Dashboard } from '@renderer/pages/Dashboard'
import { PageLayout } from '@renderer/layouts/PageLayout'
import { StaffTable } from '@renderer/pages/StaffTable'
import { PatientTable } from '@renderer/pages/PatientTable'
import { Route, Routes } from 'react-router-dom'
import ProtectedRouteAuth from './middlewares/ProtectedRouteAuth'
import ProtectedRouteSession from './middlewares/ProtectedRouteSession'

const Router = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route element={<ProtectedRouteSession />}>
          <Route path='*' element={<></>} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/main' element={<Dashboard />} />
          <Route path='/staff' element={<StaffTable />} />
          <Route path='/rooms' element={<></>} />
          <Route path='/patient' element={<PatientTable />} />
          <Route path='/consult' element={<Consults />} />
        </Route>
      </Route>
      <Route element={<ProtectedRouteAuth />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Router
