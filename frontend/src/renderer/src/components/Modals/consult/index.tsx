import React from 'react'
import toast from 'react-hot-toast'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { useDispatch } from 'react-redux'
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
import { addConsult } from '@renderer/features/consultSlice'
import { reqCreateConsult } from '@renderer/api/Requests'

export const CreateConsultModal = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

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

  const handleAddCreateConsult = async () => {
    try {
      const response = await reqCreateConsult(data)
      dispatch(addConsult(response.data))
      toast.success('Consulta creada correctamente.')
      onClose()
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        Crear consulta
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'} backdrop='blur'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className=' default-text-color'>Crea una nueva consulta</h3>
          </ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              {inputs.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  onChange={(e) => handleChange(e)}
                />
              ))}
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              <DatePicker
                label='Fecha de la consulta'
                onChange={(e) => {
                  const consultDate = new Date(`${e.year}-${e.month}-${e.day}`)
                  setData({
                    ...data,
                    ['date']: consultDate.toISOString(),
                  })
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddCreateConsult()}>
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
