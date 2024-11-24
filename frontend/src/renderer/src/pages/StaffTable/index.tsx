import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/TableUser'
import { setUsers } from '@renderer/features/usersSlice'
import { useDispatch } from 'react-redux'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import { EditUserProfileModal } from '@renderer/components/Modals/editUser'
import { columnsData, modalInputs } from './data'
import { deleteUser, addUser, editUser } from '@renderer/features/usersSlice'
import { reqAddStaff, reqEditStaff, reqDeleteStaff, reqLoadAllStaff } from '@renderer/api/Requests'

export const StaffTable = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const handleLoadInfo = async () => {
      const response = await reqLoadAllStaff()
      dispatch(setUsers(response.data))
    }
    handleLoadInfo()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteUser(id))
        await reqDeleteStaff(id)
        toast.success('Personal eliminado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqAddStaff({ ...data, age: parseInt(data.age) })
        dispatch(addUser(response.data))
        toast.success('Personal guardado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editUser({ data, id: currentUserEdit?.id }))
        console.log(data)
        await reqEditStaff({
          data,
          id: currentUserEdit?.id,
        })
        toast.success('Personal editado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newUserModal = {
    title: 'Agrega a un nuevo personal',
    buttonTitle: 'Agregar personal',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar personal',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      tableActions={tableActions}
      columnsData={columnsData}
      createNewUserModal={<CreateNewUserModal modal={newUserModal} />}
      editUserProfileModal={<EditUserProfileModal modal={editUserModal} />}
    />
  )
}
