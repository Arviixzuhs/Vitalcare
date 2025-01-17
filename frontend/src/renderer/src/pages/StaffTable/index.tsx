import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/TableUser'
import { useDispatch } from 'react-redux'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import { EditUserProfileModal } from '@renderer/components/Modals/editUser'
import { columnsData, modalInputs } from './data'
import { deleteUser, addUser, editUser } from '@renderer/features/usersSlice'
import { setCurrentEditUserId, setUsers } from '@renderer/features/usersSlice'
import {
  reqAddStaff,
  reqEditStaff,
  reqDeleteStaff,
  reqLoadAllStaff,
  reqSearchClinicalStaffByName,
} from '@renderer/api/Requests'
import { DropdownItemInteface } from '@renderer/components/TableUser/interfaces/ActionDropdown'
import { modalTypes, useModal } from '@renderer/hooks/useModal'

export const StaffTable = () => {
  const dispatch = useDispatch()
  const [_, toggleEditItemModal] = useModal(modalTypes.editItemTableModal)

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
    search: (value: string) => {
      if (value.length === 0) {
        reqLoadAllStaff()
          .then((res) => dispatch(setUsers(res.data)))
          .catch(console.log)
      }
      reqSearchClinicalStaffByName(value)
        .then((res) => dispatch(setUsers(res.data)))
        .catch(console.log)
    },
  }

  const newUserModal = {
    title: 'Agregar personal',
    buttonTitle: 'Agregar personal',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar personal',
    ...modalInputs,
    action: tableActions.edit,
  }

  const dropdownAction: DropdownItemInteface[] = [
    {
      key: 'edit',
      title: 'Editar',
      onPress: async (id) => {
        toggleEditItemModal()
        dispatch(setCurrentEditUserId(id))
      },
    },
    {
      key: 'delete',
      title: 'Borrar',
      onPress: async (id) => tableActions.delete(id),
    },
  ]

  return (
    <AppTable
      tableActions={tableActions}
      columnsData={columnsData}
      dropdownAction={dropdownAction}
      addItemModal={<CreateNewUserModal modal={newUserModal} />}
      editItemModal={<EditUserProfileModal modal={editUserModal} />}
    />
  )
}
