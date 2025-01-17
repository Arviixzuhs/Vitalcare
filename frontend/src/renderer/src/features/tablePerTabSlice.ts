import { createSlice } from '@reduxjs/toolkit'

// Definir la estructura del estado inicial para cada pestaña
export interface TabData {
  notes: []
  files: []
  consults: []
  diagnostics: []
}

export interface Column {
  uid: string
  title: string
}

// Estado inicial para el slice
export interface ManageItemsState {
  data: TabData
  columns: Column[]
  currentTab: string
  currentItemIdEdit: number
}

export const manageItemsSlice = createSlice({
  name: 'items',
  initialState: {
    data: {
      notes: [],
      files: [],
      consults: [],
      diagnostics: [],
    },
    columns: [],
    currentTab: 'notes',
    currentItemIdEdit: -1,
  } as ManageItemsState,
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload
    },
    setTabData: (state, action) => {
      const { tab, data } = action.payload
      if (state.data[tab]) {
        state.data[tab] = data
      }
    },
    addItem: (state, action) => {
      const { tab, item } = action.payload
      if (state.data[tab]) {
        state.data[tab].push(item)
      }
    },
    editItem: (state, action) => {
      const { tab, id, data } = action.payload
      if (state.data[tab]) {
        const itemIndex = state.data[tab].findIndex((item) => item.id === id)
        if (itemIndex !== -1) {
          Object.keys(data).forEach((key) => {
            state.data[tab][itemIndex][key] = data[key]
          })
        }
      }
    },
    deleteItem: (state, action) => {
      const { tab, id } = action.payload
      if (state.data[tab]) {
        const itemIndex = state.data[tab].findIndex((item) => item.id === id)
        if (itemIndex !== -1) {
          state.data[tab].splice(itemIndex, 1)
        }
      }
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload
    },
    setCurrentEditItemId: (state, action) => {
      state.currentItemIdEdit = action.payload
    },
  },
})

export const {
  setTabData,
  addItem,
  editItem,
  setColumns,
  deleteItem,
  setCurrentTab,
  setCurrentEditItemId,
} = manageItemsSlice.actions
