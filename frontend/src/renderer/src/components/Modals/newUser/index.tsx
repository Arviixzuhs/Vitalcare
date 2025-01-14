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
import { ModalProps } from '@renderer/components/TableUser/interfaces/TableProps'

export const CreateNewUserModal = ({ modal }: { modal: ModalProps }) => {
  const [data, setData] = React.useState({})
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [missingFields, setMissingFields] = React.useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  React.useEffect(() => {
    setData({})
    setIsSubmitted(false)
    setMissingFields([])
  }, [isOpen, onClose])

  React.useEffect(() => {
    const requiredInputs = modal.inputs?.filter((input) => input.isRequired)
    const missing = requiredInputs?.reduce((acc, input) => {
      if (!(input.name in data) || data[input.name]?.trim() === '') {
        acc.push(input.name)
      }
      return acc
    }, [] as string[])

    setMissingFields(missing || [])
  }, [data, modal.inputs])

  const onSubmit = () => {
    if (missingFields.length > 0) {
      setIsSubmitted(true)
      return
    }

    modal.action(data)
    onClose()
    setIsSubmitted(true)
  }

  const isInvalid = (inputName: string): boolean => isSubmitted && missingFields.includes(inputName)

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        {modal.buttonTitle}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' backdrop='blur'>
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
                  onChange={handleChange}
                  isInvalid={isInvalid(input.name)}
                  isRequired={input.isRequired}
                  placeholder={input.placeholder}
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
                  onChange={handleChange}
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
            <Button color='primary' onPress={onSubmit}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
