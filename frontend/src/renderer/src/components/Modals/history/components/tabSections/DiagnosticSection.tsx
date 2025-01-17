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
  reqCreateDiagnostic,
  reqUpdateDiagnostic,
  reqDeleteDiagnostic,
  reqFindAllDiagnosticsByPatientId,
} from '@renderer/api/Requests'

export const DiagnosticSection = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.tablePerTab)
  const tab = table.currentTab
  const currentPatientId = useSelector((state: RootState) => state.users.currentUserIdEdit)

  React.useEffect(() => {
    const columns = [
      { uid: 'condition', title: 'Condición' },
      { uid: 'description', title: 'Descripción' },
      { uid: 'createdAt', title: 'Fecha' },
      { uid: 'actions', title: 'Acción' },
    ]
    dispatch(setColumns(columns))

    reqFindAllDiagnosticsByPatientId(currentPatientId)
      .then((res) => {
        const data = res.data
        dispatch(setTabData({ tab, data }))
      })
      .catch(console.log)
  }, [table.currentTab])

  const tableActions = {
    delete: (id: number) => {
      dispatch(deleteItem({ tab, id }))
      reqDeleteDiagnostic(id)
    },
    edit: (data) => {
      reqUpdateDiagnostic({ id: table.currentItemIdEdit, data }).catch(console.log)
      dispatch(editItem({ tab, id: table.currentItemIdEdit, data }))
    },
    create: (item) => {
      reqCreateDiagnostic({ ...item, patientId: currentPatientId })
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
        name: 'condition',
        label: 'Condición',
        isRequired: true,
      },
    ],
    textArea: [
      {
        type: 'text',
        name: 'description',
        label: 'Descripción',
        isRequired: true,
        placeholder: 'Ingresa la descripción',
      },
    ],
  }

  const newItemModal = {
    title: 'Agrega un diagnóstico',
    buttonTitle: 'Agregar diagnóstico',
    ...modalInputs,
    action: tableActions.create,
  }

  const editItemModal = {
    title: 'Editar diagnóstico',
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
