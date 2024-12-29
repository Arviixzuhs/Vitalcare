import {
  cn,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from '@nextui-org/react'
import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon'
import { EditDocumentIcon } from '../Icons/EditDocumentIcon'
import { DeleteDocumentIcon } from '../Icons/DeleteDocumentIcon'

interface ActionDropdownProps {
  editAction: () => void
  deleteAction: () => void
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ editAction, deleteAction }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size='sm' variant='light'>
          <VerticalDotsIcon className='text-default-300' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
        <DropdownItem
          key='edit'
          className='default-text-color'
          onPress={editAction}
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key='delete'
          className='text-danger'
          color='danger'
          onPress={deleteAction}
          startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}
        >
          Borrar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
