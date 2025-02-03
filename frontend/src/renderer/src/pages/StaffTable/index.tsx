import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/TableUser'
import { RootState } from '@renderer/store'
import { TableActions } from '@renderer/components/TableUser/interfaces/TableProps'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import { EditUserProfileModal } from '@renderer/components/Modals/editUser'
import { modalTypes, useModal } from '@renderer/hooks/useModal'
import { DropdownItemInteface } from '@renderer/components/TableUser/interfaces/ActionDropdown'
import { useDispatch, useSelector } from 'react-redux'
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

export const StaffTable = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.users)
  const [_, toggleEditItemModal] = useModal(modalTypes.editItemTableModal)
  const currentUserIdEdit = useSelector((state: RootState) => state.users.currentUserIdEdit)
  const currentUserEdit = table.data.find((item) => item.id == currentUserIdEdit)

  React.useEffect(() => {
    const handleLoadInfo = async () => {
      const response = await reqLoadAllStaff(table.dateFilter.start, table.dateFilter.end)
      dispatch(setUsers(response.data))
    }
    handleLoadInfo()
  }, [table.dateFilter])

  const tableActions: TableActions = {
    delete: (id: number) => {
      dispatch(deleteUser(id))
      reqDeleteStaff(id)
        .then(() => {
          toast.success('Personal eliminado correctamente')
        })
        .catch((error) => {
          toast.error(error.response.data.message || error.response.data.errors[0]?.messages[0])
        })
    },
    create: (data) => {
      reqAddStaff({ ...data, age: Number(data.age) })
        .then((res) => {
          dispatch(addUser(res.data))
          toast.success('Personal guardado correctamente')
        })
        .catch((error) => {
          toast.error(
            error.response.data.message || error.response.data.errors[0]?.messages[0].messages[0],
          )
        })
    },
    edit: (data) => {
      dispatch(editUser({ data, id: currentUserEdit?.id }))
      reqEditStaff({
        data,
        id: currentUserEdit?.id,
      })
        .then(() => {
          toast.success('Personal editado correctamente')
        })
        .catch((error) => {
          toast.error(
            error.response.data.message || error.response.data.errors[0]?.messages[0].messages[0],
          )
        })
    },
    search: (value) => {
      if (value.length === 0) {
        reqLoadAllStaff()
          .then((res) => dispatch(setUsers(res.data)))
          .catch(console.log)
      }
      reqSearchClinicalStaffByName(value)
        .then((res) => dispatch(setUsers(res.data)))
        .catch(console.log)
    },
    load: () => {
      reqLoadAllStaff()
        .then((res) => {
          dispatch(setUsers(res.data))
        })
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
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<CreateNewUserModal modal={newUserModal} />}
      editItemModal={<EditUserProfileModal modal={editUserModal} />}
      dropdownAction={dropdownAction}
    />
  )
}
