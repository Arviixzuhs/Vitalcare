import { createSlice } from '@reduxjs/toolkit'

export interface CountItem {
  time: string
  value: number
}

export interface PatientsCountByGender {
  gender: string
  count: number
}

export interface HospitalStats {
  rooms: number
  patients: number
  consults: number
  consultsToDay: number
  clinicalStaffs: number
  patientsCount: CountItem[]
  clinicalStaffsCount: CountItem[]
  patientsCountByGender: PatientsCountByGender[]
}

export const manageHospitalDataSlice = createSlice({
  name: 'user',
  initialState: {
    rooms: 0,
    patients: 0,
    consults: 0,
    consultsToDay: 0,
    patientsCount: [],
    clinicalStaffs: 0,
    clinicalStaffsCount: [],
    patientsCountByGender: [],
  } as HospitalStats,
  reducers: {
    setHospitalStats: (_, action) => action.payload,
  },
})

export const { setHospitalStats } = manageHospitalDataSlice.actions
