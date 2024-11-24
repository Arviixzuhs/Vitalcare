import { createSlice } from '@reduxjs/toolkit'

export const manageHospitalDataSlice = createSlice({
  name: 'user',
  initialState: {
    rooms: 0,
    patients: 0,
    consults: 0,
    clinicalStaffs: 0,
  },
  reducers: {
    setHospitalStats: (_, action) => action.payload,
  },
})

export const { setHospitalStats } = manageHospitalDataSlice.actions
