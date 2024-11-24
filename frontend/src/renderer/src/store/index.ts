import { manageUserSlice } from '@renderer/features/userSlice'
import { manageUsersSlice } from '@renderer/features/usersSlice'
import { manageConsultsSlice } from '@renderer/features/consultSlice'
import { manageHospitalDataSlice } from '@renderer/features/hospitalSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const appReducer = combineReducers({
  user: manageUserSlice.reducer,
  users: manageUsersSlice.reducer,
  consult: manageConsultsSlice.reducer,
  hospital: manageHospitalDataSlice.reducer,
})

const store = configureStore({
  reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>

export default store
