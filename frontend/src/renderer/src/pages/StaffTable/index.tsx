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
    delete: (id: number) => {
      dispatch(deleteUser(id))
      reqDeleteStaff(id)
        .then(() => {
          toast.success('Personal eliminado correctamente')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    },
    create: (data) => {
      reqAddStaff({ ...data, age: parseInt(data.age) })
        .then((res) => {
          dispatch(addUser(res.data))
          toast.success('Personal guardado correctamente')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    },
    edit: (data, currentUserEdit) => {
      dispatch(editUser({ data, id: currentUserEdit?.id }))
      reqEditStaff({
        data,
        id: currentUserEdit?.id,
      })
        .then(() => {
          toast.success('Personal editado correctamente')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
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
      addItemModal={<CreateNewUserModal modal={newUserModal} />}
      editItemModal={<EditUserProfileModal modal={editUserModal} />}
    />
  )
}
