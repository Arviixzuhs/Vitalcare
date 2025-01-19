import React from 'react'
import { Avatar, Chip } from '@nextui-org/react'
import { ActionDropdown } from '@renderer/components/Dropdown'
import { DropdownAction } from '@renderer/components/Dropdown/ActionDropdownPatient'
import { TableItemModel } from '@renderer/features/usersSlice'
import { ShortCellValue } from './ShortCellValue'
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
        <div className='flex gap-4'>
          {item.avatar ? (
            <img src={item.avatar} alt='' className='w-10 h-10 object-contain rounded-full' />
          ) : (
            <Avatar />
          )}
          <div>
            <h3>{item.name}</h3>
            <p className='text-tiny text-foreground-400'>{item.email}</p>
          </div>
        </div>
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
