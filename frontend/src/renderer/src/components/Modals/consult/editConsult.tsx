import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  Input,
  Button,
  ModalBody,
  DatePicker,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { inputs } from './inputs'
import { parseDate } from '@internationalized/date'
import { RootState } from '@renderer/store'
import { editConsult } from '@renderer/features/consultSlice'
import { newParseDate } from '@renderer/utils/newParseDate'
import { reqUpdateConsult } from '@renderer/api/Requests'
import { setCurrentConsultId } from '@renderer/features/consultSlice'

export const EditConsultModal = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const consult = useSelector((state: RootState) => state.consult)

  const currentConsultEdit = consult?.data.find(
    (item: { id: any }) => item.id == consult.currentConsultId,
  )

  const parsedDate = newParseDate({ date: currentConsultEdit?.date, padStart: true })

  React.useEffect(() => {
    if (consult.currentConsultId !== -1) onOpen()
  }, [consult.currentConsultId])

  const [data, setData] = React.useState<any>({})

  const handleChange = (e: any) => {
    let name = e.target.name
    let value = e.target.value
    let intValues = ['patientId', 'doctorId']
    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })
  }

  const handleResetCurrentConsultId = () => dispatch(setCurrentConsultId(-1))

  const handleEditConsult = async () => {
    try {
      let consultData = {
        id: consult.currentConsultId,
        data,
      }
      dispatch(editConsult(consultData))

      const response = await reqUpdateConsult(consultData)
      toast.success(response.data)

      onClose()
      handleResetCurrentConsultId()
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
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
              {inputs.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  onChange={(e) => handleChange(e)}
                  defaultValue={currentConsultEdit && currentConsultEdit[input.name]}
                />
              ))}
            </div>
            <div className='flex w-full flex-col gap-4'>
              <DatePicker
                label='Fecha de la consulta'
                onChange={(e) => {
                  const consultDate = new Date(`${e.year}-${e.month}-${e.day}`)
                  setData({
                    ...data,
                    ['date']: consultDate.toISOString(),
                  })
                }}
                defaultValue={
                  currentConsultEdit &&
                  parseDate(`${parsedDate?.year}-${parsedDate?.month}-${parsedDate?.day}`)
                }
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
