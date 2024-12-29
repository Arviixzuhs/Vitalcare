import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/TableUser'
import { setUsers } from '@renderer/features/usersSlice'
import { useDispatch } from 'react-redux'
import {
  reqAddPatient,
  reqEditPatient,
  reqDeletePatient,
  reqLoadAllPatients,
} from '@renderer/api/Requests'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import { EditUserProfileModal } from '@renderer/components/Modals/editUser'
import { columnsData, modalInputs } from './data'
import { deleteUser, addUser, editUser } from '@renderer/features/usersSlice'

export const PatientTable = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const handleLoadInfo = async () => {
      const response = await reqLoadAllPatients()
      dispatch(setUsers(response.data))
    }
    handleLoadInfo()
  }, [])

  const tableActions = {
    delete: (id: number) => {
      dispatch(deleteUser(id))
      reqDeletePatient(id)
        .then(() => {
          toast.success('Paciente eliminado correctamente')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    },
    create: async (data) => {
      reqAddPatient({ ...data, age: parseInt(data.age) })
        .then((res) => {
          dispatch(addUser(res.data))
          toast.success('Paciente guardado correctamente')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    },
    edit: (data, currentUserEdit) => {
      dispatch(editUser({ data, id: currentUserEdit?.id }))
      reqEditPatient({
        data,
        id: currentUserEdit?.id,
      }).then(() => {
        toast.success('Paciente editado correctamente')
      })
    },
  }

  const newUserModal = {
    title: 'Agrega a un nuevo paciente',
    buttonTitle: 'Agregar paciente',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar paciente',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<CreateNewUserModal modal={newUserModal} />}
      editItemModal={<EditUserProfileModal modal={editUserModal} />}
    />
  )
}
