import { createSlice } from '@reduxjs/toolkit'
import { Consult } from '@renderer/interfaces/consultModel'

interface ConsultDate {
  day: number
  year: number
  month: number
}

export interface ConsultState {
  data: Consult[]
  currentConsultId: number
  currentConsultDate: ConsultDate | null
}

const initialState: ConsultState = {
  data: [],
  currentConsultId: -1,
  currentConsultDate: null,
}

export const manageConsultsSlice = createSlice({
  name: 'consults',
  initialState,
  reducers: {
    setConsults: (state, action) => {
      state.data = action.payload
    },
    addConsult: (state, action) => {
      state.data.push(action.payload)
    },
    editConsult: (state, action) => {
      const { data, id } = action.payload
      const consultIndex = state.data.findIndex((item) => item.id === id)

      if (consultIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[consultIndex][key] = data[key]
        })
      }
    },
    deleteConsult: (state, action) => {
      const id = action.payload
      state.data = state.data.filter((item) => item.id !== id)
    },
    setCurrentConsultId: (state, action) => {
      state.currentConsultId = action.payload
    },
    setCurrentConsultDate: (state, action) => {
      state.currentConsultDate = action.payload
    },
  },
})

export const {
  setConsults,
  addConsult,
  editConsult,
  deleteConsult,
  setCurrentConsultId,
  setCurrentConsultDate,
} = manageConsultsSlice.actions
