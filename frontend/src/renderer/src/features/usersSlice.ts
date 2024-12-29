import { Patient } from '@renderer/interfaces/patientModel'
import { createSlice } from '@reduxjs/toolkit'
import { ClinicalStaff } from '@renderer/interfaces/clinicalStaffModel'

// Definir el tipo genérico para los usuarios, que puede ser ClinicalStaff o Patient
export type TableItemModel = ClinicalStaff | Patient

// Definir la estructura del estado inicial del slice
export interface ManageUsersState {
  data: TableItemModel[]
  currentUserIdEdit: number
}

export const manageUsersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    currentUserIdEdit: -1,
  } as ManageUsersState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload
    },
    addUser: (state, action) => {
      state.data.push(action.payload)
    },
    editUser: (state, action) => {
      const { data, id } = action.payload
      const userIndex = state.data.findIndex((item) => item.id === id)

      if (userIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[userIndex][key] = data[key]
        })
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload
      const userIndex = state.data.findIndex((item) => item.id === id)

      if (userIndex !== -1) {
        state.data.splice(userIndex, 1)
      }
    },
    setCurrentEditUserId: (state, action) => {
      state.currentUserIdEdit = action.payload
    },
  },
})

export const { addUser, deleteUser, setUsers, setCurrentEditUserId, editUser } =
  manageUsersSlice.actions
