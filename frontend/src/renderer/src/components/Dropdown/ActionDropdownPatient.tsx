import React, { useState } from 'react'
import {
  cn,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  useDisclosure,
  DropdownTrigger,
} from '@nextui-org/react'
import { EditDocumentIcon } from '@renderer/components/Icons/EditDocumentIcon'
import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon'
import { DeleteDocumentIcon } from '@renderer/components/Icons/DeleteDocumentIcon'
import { DropdownActionProps } from '../TableUser/interfaces/DropdownActionProps'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

// Tipo para los items del dropdown
interface DropdownItemType {
  key: string
  title: string
  startContent?: React.ReactNode
  onPress?: (id: string | number) => void // Acción que se ejecuta con el ID de la tabla
}

export const DropdownAction: React.FC<DropdownActionProps> = ({ dropdownItems, tableItemId }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  // Estado para el item seleccionado
  const [selectedItem, setSelectedItem] = useState<DropdownItemType | null>(null)

  // Confirmar la acción del modal
  const confirmAction = () => {
    if (selectedItem?.onPress) {
      selectedItem.onPress(tableItemId) // Ejecuta la acción del item con la ID correspondiente
    }
    onClose()
  }

  // Manejo de la acción del dropdown
  const handleDropdownItemPress = (item: DropdownItemType) => {
    if (item.key === 'delete') {
      setSelectedItem(item) // Guarda el item seleccionado para usarlo en el modal
      onOpen()
    } else if (item.onPress) {
      item.onPress(tableItemId) // Ejecuta directamente la acción si no es "delete"
    }
  }

  // Ícono del dropdown
  const dropdonwIcon = (
    key: string,
    startContent: React.ReactNode | undefined,
  ): React.ReactNode => {
    switch (key) {
      case 'delete':
        return <DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />
      case 'edit':
        return <EditDocumentIcon className={iconClasses} />
      default:
        return <span className={iconClasses}>{startContent}</span>
    }
  }

  return (
    <>
      {/* Modal de Confirmación */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 default-text-color text-center'>
                Confirmar acción
              </ModalHeader>
              <ModalBody>
                <p className='default-text-color text-center'>
                  Al confirmar, el registro seleccionado será eliminado.
                </p>
              </ModalBody>
              <ModalFooter className='justify-center flex'>
                <Button onPress={onClose}>Cancelar</Button>
                <Button color='danger' onPress={confirmAction}>
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
        <DropdownMenu variant='faded' aria-label='Dropdown menu with icons' items={dropdownItems}>
          {(item: DropdownItemType) => (
            <DropdownItem
              key={item.key}
              className='default-text-color'
              onPress={() => handleDropdownItemPress(item)}
              startContent={dropdonwIcon(item.key, item.startContent)}
            >
              {item.title}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
