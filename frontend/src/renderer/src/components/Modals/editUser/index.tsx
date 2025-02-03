import React from 'react'
import {
  Input,
  Modal,
  Button,
  Select,
  Textarea,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import { useModal } from '@renderer/hooks/useModal'
import { RootState } from '@renderer/store'
import { ModalProps } from '@renderer/components/TableUser/interfaces/TableProps'
import { modalTypes } from '@renderer/hooks/useModal'
import { SelectAvatar } from '@renderer/components/SelectAvatar'
import { reqFileUpload } from '@renderer/api/Requests'
import { setCurrentEditUserId } from '../../../features/usersSlice'
import { useCurrentAvatarFile } from '@renderer/hooks/useCurrentAvatarFile'
import { useDispatch, useSelector } from 'react-redux'

export const EditUserProfileModal = ({ modal }: { modal: ModalProps }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
  const users = useSelector((state: RootState) => state.users.data)
  const currentUserIdEdit = useSelector((state: RootState) => state.users.currentUserIdEdit)
  const currentUserEdit = users.find((item) => item.id == currentUserIdEdit)
  const [isOpen, toggleModal] = useModal(modalTypes.editItemTableModal)
  const { currentAvatarFile, setCurrentAvatarFile } = useCurrentAvatarFile()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name
    const value = e.target.value
    const intValues = ['age']

    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentEditUserId(-1))

  const onSubmit = async () => {
    let avatar = null

    if (currentAvatarFile) {
      const formData = new FormData()
      formData.append('file', currentAvatarFile)
      const response = await reqFileUpload(formData)
      avatar = response.data.fileUrl
      setCurrentAvatarFile(null)
    }

    const hasChanges =
      avatar || Object.keys(data).some((key) => data[key] !== currentUserEdit?.[key])

    if (!hasChanges) return

    const dataToSend = avatar ? { ...data, avatar } : { ...data }

    modal.action(dataToSend)
    handleResetCurrentIdEdit()
    toggleModal()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        placement='center'
        onOpenChange={toggleModal}
        scrollBehavior='inside'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal.title}</h3>
          </ModalHeader>
          <ModalBody>
            {modal.selectAvatar && <SelectAvatar defaultAvatarURL={currentUserEdit?.avatar} />}
            <div className='flex w-full flex-col gap-4'>
              {modal?.inputs?.map((input, index) => (
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
              {modal?.selectInputs?.map((item, index) => (
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
            <div className='flex w-full flex-col gap-4'>
              {modal?.textArea?.map((item, index: number) => (
                <Textarea
                  key={index}
                  name={item.name}
                  label={item.label}
                  onChange={handleChange}
                  className='default-text-color'
                  labelPlacement='outside'
                  defaultValue={currentUserEdit && currentUserEdit[item.name]}
                  placeholder={item.placeholder}
                />
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              variant='light'
              onPress={() => {
                handleResetCurrentIdEdit()
                toggleModal()
              }}
            >
              Cerrar
            </Button>
            <Button color='primary' onPress={() => onSubmit()}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
