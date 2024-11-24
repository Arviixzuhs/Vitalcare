import React from 'react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import {
  Modal,
  Input,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'

export const CreateNewUserModal = ({ modal }) => {
  const [data, setData] = React.useState<any>({})
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddNewUser = () => {
    modal.action(data)
    onClose()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        {modal.buttonTitle}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'} backdrop='blur'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal.title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-col gap-4'>
              {modal?.inputs?.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  onChange={(e) => handleChange(e)}
                />
              ))}
            </div>
            <div className='flex w-full flex-col gap-4'>
              {modal?.selectInputs?.map((item, index) => (
                <Select
                  key={index}
                  name={item.name}
                  label={item.label}
                  className='max-w-x default-text-color'
                  onChange={(e) => handleChange(e)}
                >
                  {item.options.map((state) => (
                    <SelectItem
                      key={state.value}
                      value={state.value}
                      className='default-text-color'
                    >
                      {state.label}
                    </SelectItem>
                  ))}
                </Select>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
