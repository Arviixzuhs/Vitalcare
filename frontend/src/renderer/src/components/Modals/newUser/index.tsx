import React from 'react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import {
  Modal,
  Input,
  Button,
  Select,
  Textarea,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { ModalProps } from '@renderer/components/TableUser/interfaces/TableProps'
import { SelectAvatar } from '@renderer/components/SelectAvatar'
import { reqFileUpload } from '@renderer/api/Requests'
import { useCurrentAvatarFile } from '@renderer/hooks/useCurrentAvatarFile'

export const CreateNewUserModal = ({ modal }: { modal: ModalProps }) => {
  const [data, setData] = React.useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [missingFields, setMissingFields] = React.useState<string[]>([])
  const [invalidEmails, setInvalidEmails] = React.useState<string[]>([])
  const { currentAvatarFile, setCurrentAvatarFile } = useCurrentAvatarFile()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    setData({
      ...data,
      [name]: value,
    })

    if (type === 'email') {
      validateEmail(name, value)
    }
  }

  React.useEffect(() => {
    resetStates()
  }, [isOpen])

  React.useEffect(() => {
    const requiredInputs = [
      ...(modal.inputs?.filter((input) => input.isRequired) || []),
      ...(modal.textArea?.filter((textarea) => textarea.isRequired) || []),
    ]

    const missing = requiredInputs.reduce((acc, input) => {
      if (!(input.name in data) || data[input.name]?.trim() === '') {
        acc.push(input.name)
      }
      return acc
    }, [] as string[])

    setMissingFields(missing)
  }, [data, modal.inputs, modal.textArea])

  const validateEmail = (name: string, value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setInvalidEmails((prev) => [...prev.filter((email) => email !== name), name])
    } else {
      setInvalidEmails((prev) => prev.filter((email) => email !== name))
    }
  }

  const onSubmit = async () => {
    let avatar = null

    if (currentAvatarFile) {
      const formData = new FormData()
      formData.append('file', currentAvatarFile)
      const response = await reqFileUpload(formData)
      avatar = response.data.fileUrl
      setCurrentAvatarFile(null)
    }

    if (missingFields.length > 0 || invalidEmails.length > 0) {
      setIsSubmitted(true)
      return
    }

    const dataToSend = avatar ? { ...data, avatar } : { ...data }

    modal.action(dataToSend)
    resetStates()
    onClose()
  }

  const resetStates = () => {
    setData({})
    setIsSubmitted(false)
    setMissingFields([])
    setInvalidEmails([])
  }

  const isInvalid = (inputName: string, inputType: string): boolean =>
    (isSubmitted && missingFields.includes(inputName)) ||
    (inputType === 'email' && invalidEmails.includes(inputName))

  const getErrorMessage = (inputName: string, inputType: string): string => {
    if (isSubmitted && missingFields.includes(inputName)) {
      return 'Este campo es requerido'
    }
    if (inputType === 'email' && invalidEmails.includes(inputName)) {
      return 'Por favor, ingrese un email válido'
    }
    return ''
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        {modal.buttonTitle}
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop='blur'
        placement='center'
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal.title}</h3>
          </ModalHeader>
          <ModalBody>
            {modal.selectAvatar && <SelectAvatar />}
            <div className='flex w-full flex-col gap-4'>
              {modal?.inputs?.map((input, index) => (
                <Input
                  max={100}
                  min={0}
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  onChange={handleChange}
                  maxLength={input.maxLength}
                  isInvalid={isInvalid(input.name, input.type)}
                  errorMessage={getErrorMessage(input.name, input.type)}
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
            <div className='flex w-full flex-col gap-4'>
              {modal?.textArea?.map((item, index: number) => (
                <Textarea
                  key={index}
                  name={item.name}
                  label={item.label}
                  onChange={handleChange}
                  maxLength={item.maxLength}
                  className='default-text-color'
                  labelPlacement='outside'
                  isInvalid={isInvalid(item.name, 'textarea')}
                  errorMessage={getErrorMessage(item.name, 'textarea')}
                  isRequired={item.isRequired}
                  placeholder={item.placeholder}
                />
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
