import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  Button,
  Textarea,
  ModalBody,
  DatePicker,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { editConsult } from '@renderer/features/consultSlice'
import { reqUpdateConsult } from '@renderer/api/Requests'
import { setCurrentConsultId } from '@renderer/features/consultSlice'
import { parseAbsoluteToLocal } from '@internationalized/date'

export const EditConsultModal = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const consult = useSelector((state: RootState) => state.consult)

  const currentConsultEdit = consult?.data.find(
    (item: { id: number }) => item.id == consult.currentConsultId,
  )

  React.useEffect(() => {
    if (consult.currentConsultId !== -1) onOpen()
  }, [consult.currentConsultId])

  const [data, setData] = React.useState({})

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleResetCurrentConsultId = () => dispatch(setCurrentConsultId(-1))

  const handleEditConsult = async () => {
    const consultData = {
      id: consult.currentConsultId,
      data,
    }

    dispatch(editConsult(consultData))

    reqUpdateConsult(consultData)
      .then(() => {
        toast.success('Consulta editada correctamente.')
        onClose()
        handleResetCurrentConsultId()
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        backdrop='blur'
        onClose={handleResetCurrentConsultId}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className=' default-text-color'>Editar Consulta</h3>
          </ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-col gap-4'>
              <DatePicker
                label='Fecha de la consulta'
                hideTimeZone
                showMonthAndYearPickers
                onChange={(e) => {
                  const consultDate = new Date(e.year, e.month - 1, e.day)
                  consultDate.setHours(e.hour, e.minute, e.second, e.millisecond)

                  setData({
                    ...data,
                    ['date']: consultDate.toISOString(),
                  })
                }}
                defaultValue={
                  currentConsultEdit && parseAbsoluteToLocal(String(currentConsultEdit.date))
                }
              />
              <Textarea
                name='reason'
                label='Razón de la consulta'
                onChange={handleChange}
                defaultValue={currentConsultEdit?.reason}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleEditConsult()}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
