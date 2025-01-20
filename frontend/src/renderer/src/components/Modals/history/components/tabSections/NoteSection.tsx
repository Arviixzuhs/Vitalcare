import React from 'react'
import { TabTable } from '../TabTable'
import { RootState } from '@renderer/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItem,
  editItem,
  setTabData,
  deleteItem,
  setColumns,
} from '@renderer/features/tablePerTabSlice'
import { EditItemModal } from '../TabTable/Modals/EditItemModal'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import {
  reqCreateNote,
  reqUpdateNote,
  reqDeleteNote,
  reqFindAllNotesByPatientId,
} from '@renderer/api/Requests'

export const NoteSection = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.tablePerTab)
  const tab = table.currentTab
  const currentPatientId = useSelector((state: RootState) => state.users.currentUserIdEdit)

  React.useEffect(() => {
    const columns = [
      { uid: 'title', title: 'Título' },
      { uid: 'description', title: 'Descripción' },
      { uid: 'actions', title: 'Acción' },
    ]
    dispatch(setColumns(columns))

    reqFindAllNotesByPatientId(currentPatientId)
      .then((res) => {
        const data = res.data
        dispatch(setTabData({ tab, data }))
      })
      .catch(console.log)
  }, [table.currentTab])

  const tableActions = {
    delete: (id: number) => {
      dispatch(deleteItem({ tab, id }))
      reqDeleteNote(id)
    },
    edit: (data) => {
      reqUpdateNote({ id: table.currentItemIdEdit, data }).catch(console.log)
      dispatch(editItem({ tab, id: table.currentItemIdEdit, data }))
    },
    create: (item) => {
      reqCreateNote({ ...item, patientId: currentPatientId })
        .then((res) => {
          dispatch(addItem({ tab, item: res.data }))
        })
        .catch(console.log)
    },
  }

  const modalInputs = {
    inputs: [
      {
        type: 'text',
        name: 'title',
        label: 'Título',
        maxLength: 280,
        isRequired: true,
      },
    ],
    textArea: [
      {
        type: 'text',
        name: 'description',
        label: 'Descripción',
        maxLength: 280,
        isRequired: true,
        placeholder: 'Ingresa la descripción',
      },
    ],
  }

  const newItemModal = {
    title: 'Agrega una nota',
    buttonTitle: 'Agregar nota',
    ...modalInputs,
    action: tableActions.create,
  }

  const editItemModal = {
    title: 'Editar nota',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <TabTable
      tableActions={tableActions}
      addItemModal={<CreateNewUserModal modal={newItemModal} />}
      editItemModal={<EditItemModal modal={editItemModal} />}
    />
  )
}
