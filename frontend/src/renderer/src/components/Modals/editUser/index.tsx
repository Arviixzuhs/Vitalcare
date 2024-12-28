import React from 'react'
import {
  Input,
  Modal,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { setCurrentEditUserId } from '../../../features/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

export const EditUserProfileModal = ({ modal }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
  const users = useSelector((state: RootState) => state.users.data)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const currentUserIdEdit = useSelector((state: RootState) => state.users.currentUserIdEdit)
  const currentUserEdit = users.find((item) => item.id == currentUserIdEdit)

  React.useEffect(() => {
    if (currentUserIdEdit !== -1) onOpen()
  }, [currentUserIdEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let name = e.target.name
    let value = e.target.value
    let intValues = ['age']

    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentEditUserId(-1))

  const handleAddNewUser = async () => {
    modal.action(data, currentUserEdit)
    handleResetCurrentIdEdit()
    onClose()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal.title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-col gap-4'>
              {modal.inputs.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  required={true}
                  onChange={handleChange}
                  defaultValue={currentUserEdit && currentUserEdit[input.name]}
                />
              ))}
            </div>
            <div className='flex w-full flex-col gap-4'>
              {modal.selectInputs.map((item, index) => (
                <Select
                  key={index}
                  name={item.name}
                  label={item.label}
                  onChange={handleChange}
                  className='max-w-x default-text-color'
                  defaultSelectedKeys={[currentUserEdit && currentUserEdit[item.name]]}
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
            <Button
              color='danger'
              variant='light'
              onPress={() => {
                handleResetCurrentIdEdit()
                onClose()
              }}
            >
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
