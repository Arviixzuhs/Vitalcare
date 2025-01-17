import { manageUserSlice } from '@renderer/features/userSlice'
import { manageItemsSlice } from '@renderer/features/tablePerTabSlice'
import { manageUsersSlice } from '@renderer/features/usersSlice'
import { manageModalsSlice } from '@renderer/features/currentModal'
import { manageConsultsSlice } from '@renderer/features/consultSlice'
import { manageHospitalDataSlice } from '@renderer/features/hospitalSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const appReducer = combineReducers({
  user: manageUserSlice.reducer,
  users: manageUsersSlice.reducer,
  modals: manageModalsSlice.reducer,
  consult: manageConsultsSlice.reducer,
  hospital: manageHospitalDataSlice.reducer,
  tablePerTab: manageItemsSlice.reducer,
})

const store = configureStore({
  reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>

export default store
