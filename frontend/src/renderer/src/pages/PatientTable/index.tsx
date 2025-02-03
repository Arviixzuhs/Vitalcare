import React from 'react'
import toast from 'react-hot-toast'
import { MdPerson } from 'react-icons/md'
import { AppTable } from '@renderer/components/TableUser'
import { RootState } from '@renderer/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  reqAddPatient,
  reqEditPatient,
  reqDeletePatient,
  reqLoadAllPatients,
} from '@renderer/api/Requests'
import { TableActions } from '@renderer/components/TableUser/interfaces/TableProps'
import { PatientHistory } from '@renderer/components/Modals/history'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import { EditUserProfileModal } from '@renderer/components/Modals/editUser'
import { DropdownItemInteface } from '@renderer/components/TableUser/interfaces/ActionDropdown'
import { modalTypes, useModal } from '@renderer/hooks/useModal'
import { reqSearchPatientByName } from '@renderer/api/Requests'
import { columnsData, modalInputs } from './data'
import { deleteUser, addUser, editUser } from '@renderer/features/usersSlice'
import { setCurrentEditUserId, setUsers } from '@renderer/features/usersSlice'

export const PatientTable = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.users)
  const [_, toggleEditItemModal] = useModal(modalTypes.editItemTableModal)
  const [__, toggleViewPatientProfileModal] = useModal(modalTypes.viewPatientProfileModal)
  const users = useSelector((state: RootState) => state.users.data)
  const currentUserIdEdit = useSelector((state: RootState) => state.users.currentUserIdEdit)
  const currentUserEdit = users.find((item) => item.id == currentUserIdEdit)

  React.useEffect(() => {
    const handleLoadInfo = async () => {
      const response = await reqLoadAllPatients(table.dateFilter.start, table.dateFilter.end)
      dispatch(setUsers(response.data))
    }
    handleLoadInfo()
  }, [table.dateFilter])

  const tableActions: TableActions = {
    delete: (id: number) => {
      dispatch(deleteUser(id))
      reqDeletePatient(id)
        .then(() => {
          toast.success('Paciente eliminado correctamente')
        })
        .catch((error) => {
          toast.error(error.response.data.message || error.response.data.errors[0]?.messages[0])
        })
    },
    create: (data) => {
      reqAddPatient({ ...data, age: Number(data.age) })
        .then((res) => {
          dispatch(addUser(res.data))
          toast.success('Paciente guardado correctamente')
        })
        .catch((error) => {
          toast.error(error.response.data.message || error.response.data.errors[0]?.messages[0])
        })
    },
    edit: (data) => {
      if (!currentUserEdit) return
      dispatch(editUser({ data, id: currentUserEdit.id }))
      reqEditPatient({
        data,
        id: currentUserEdit.id,
      }).then(() => {
        toast.success('Paciente editado correctamente')
      })
    },
    search: (value) => {
      reqSearchPatientByName(value, table.dateFilter.start, table.dateFilter.end)
        .then((res) => dispatch(setUsers(res.data)))
        .catch(console.log)
    },
    load: () => {
      reqLoadAllPatients()
        .then((res) => {
          dispatch(setUsers(res.data))
        })
        .catch(console.log)
    },
  }

  const newUserModal = {
    title: 'Agrega un nuevo paciente',
    buttonTitle: 'Agregar paciente',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar paciente',
    buttonTitle: 'Agregar paciente',
    ...modalInputs,
    action: tableActions.edit,
  }

  const dropdownAction: DropdownItemInteface[] = [
    {
      key: 'profile',
      title: 'Perfil',
      onPress: (id) => {
        dispatch(setCurrentEditUserId(id))
        toggleViewPatientProfileModal()
      },
      startContent: <MdPerson />,
    },
    {
      key: 'edit',
      title: 'Editar',
      onPress: (id) => {
        toggleEditItemModal()
        dispatch(setCurrentEditUserId(id))
      },
    },
    {
      key: 'delete',
      title: 'Borrar',
      onPress: (id) => tableActions.delete(id),
    },
  ]

  return (
    <>
      <PatientHistory />
      <AppTable
        columnsData={columnsData}
        tableActions={tableActions}
        addItemModal={<CreateNewUserModal modal={newUserModal} />}
        editItemModal={<EditUserProfileModal modal={editUserModal} />}
        dropdownAction={dropdownAction}
      />
    </>
  )
}
