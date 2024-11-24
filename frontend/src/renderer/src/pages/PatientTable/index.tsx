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
    delete: async (id: any) => {
      try {
        dispatch(deleteUser(id))
        await reqDeletePatient(id)
        toast.success('Paciente eliminado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqAddPatient({ ...data, age: parseInt(data.age) })
        dispatch(addUser(response.data))
        toast.success('Paciente guardado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editUser({ data, id: currentUserEdit?.id }))
        await reqEditPatient({
          data,
          id: currentUserEdit?.id,
        })
        toast.success('Paciente editado correctamente')
      } catch (error) {
        console.log(error)
      }
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
      createNewUserModal={<CreateNewUserModal modal={newUserModal} />}
      editUserProfileModal={<EditUserProfileModal modal={editUserModal} />}
    />
  )
}
