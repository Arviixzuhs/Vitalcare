import { Chip, User } from '@nextui-org/react'
import { ActionDropdown } from '../Dropdown'
import { ShortCellValue } from './ShortCellValue'

export const RenderCell = (
  user: any,
  columnKey: any,
  handleDeleteUser: any,
  handleSetCurrentIdEdit: any,
) => {
  const statusColorMap = {
    ALIVE: {
      text: 'Vivo',
      color: 'success',
    },
    DEAD: {
      text: 'Fallecido',
      color: 'danger',
    },
    FEMALE: {
      text: 'Femenino',
      color: 'secondary',
    },
    MALE: {
      text: 'Masculino',
      color: 'primary',
    },
  }

  const cellValue = user[columnKey]

  switch (columnKey) {
    case 'name':
      return (
        <User
          avatarProps={{ src: user.avatar }}
          description={<ShortCellValue cellValue={user.email} />}
          name={<ShortCellValue cellValue={cellValue} />}
        />
      )
    case 'gender':
    case 'status':
      return (
        <Chip
          className='capitalize'
          color={statusColorMap[user[columnKey]]?.color}
          size='sm'
          variant='flat'
        >
          {statusColorMap[user[columnKey]]?.text}
        </Chip>
      )
    case 'actions':
      return (
        <div className='relative flex justify-end items-center gap-2'>
          <ActionDropdown
            editAction={() => handleSetCurrentIdEdit(user.id)}
            deleteAction={() => handleDeleteUser(user.id)}
          />
        </div>
      )
    default:
      return <ShortCellValue cellValue={cellValue} />
  }
}
