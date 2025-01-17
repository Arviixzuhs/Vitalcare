import React from 'react'
import { Chip, User } from '@nextui-org/react'
import { ActionDropdown } from '@renderer/components/Dropdown'
import { ShortCellValue } from './ShortCellValue'
import { TableItemModel } from '@renderer/features/usersSlice'
import { DropdownAction } from '@renderer/components/Dropdown/ActionDropdownPatient'
import { DropdownItemInteface } from '../interfaces/ActionDropdown'

type Status = 'ALIVE' | 'DEAD' | 'FEMALE' | 'MALE'

interface RenderCellProps {
  item: TableItemModel
  columnKey: React.Key
  editAction: (id: number) => void
  deleteAction: (id: number) => void
  dropdownAction?: DropdownItemInteface[]
}

export const RenderCell = ({
  item,
  columnKey,
  editAction,
  deleteAction,
  dropdownAction,
}: RenderCellProps): React.ReactNode => {
  const statusColorMap: Record<
    Status,
    { text: string; color: 'success' | 'danger' | 'secondary' | 'primary' }
  > = {
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

  const cellValue = item[columnKey as string]

  if (columnKey === 'actions' && dropdownAction)
    return <DropdownAction dropdownItems={dropdownAction} tableItemId={item.id} />

  switch (columnKey) {
    case 'name':
      return (
        <User
          avatarProps={{ src: item.avatar }}
          description={<ShortCellValue cellValue={item.email} />}
          name={<ShortCellValue cellValue={cellValue as string} />}
        />
      )
    case 'gender':
    case 'status':
      return (
        <Chip
          className='capitalize'
          color={statusColorMap[item[columnKey] as Status]?.color}
          size='sm'
          variant='flat'
        >
          {statusColorMap[item[columnKey] as Status]?.text}
        </Chip>
      )
    case 'actions':
      return (
        <div className='relative flex justify-end items-center gap-2'>
          <ActionDropdown
            editAction={() => editAction(item.id)}
            deleteAction={() => deleteAction(item.id)}
          />
        </div>
      )
    default:
      return <ShortCellValue cellValue={cellValue as string} />
  }
}
