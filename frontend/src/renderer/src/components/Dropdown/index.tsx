import {
  cn,
  Modal,
  Button,
  Dropdown,
  ModalBody,
  ModalFooter,
  ModalHeader,
  DropdownItem,
  DropdownMenu,
  ModalContent,
  useDisclosure,
  DropdownTrigger,
} from '@nextui-org/react'
import { EditDocumentIcon } from '../Icons/EditDocumentIcon'
import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon'
import { DeleteDocumentIcon } from '../Icons/DeleteDocumentIcon'

interface ActionDropdownProps {
  editAction: () => void
  deleteAction: () => void
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ editAction, deleteAction }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const deleteAndClose = () => {
    deleteAction()
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        backdrop='blur'
        placement='center'
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 default-text-color text-center'>
                Confirmar acción
              </ModalHeader>
              <ModalBody>
                <p className='default-text-color text-center'>
                  Al confirmar el registro seleccionado se eliminará
                </p>
              </ModalBody>
              <ModalFooter className='justify-center flex'>
                <Button onPress={onClose}>Cancelar</Button>
                <Button color='danger' onPress={deleteAndClose}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
            onPress={onOpen}
            startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}
          >
            Borrar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
