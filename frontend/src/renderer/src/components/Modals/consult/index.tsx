import React from 'react'
import toast from 'react-hot-toast'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { useDispatch } from 'react-redux'
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
import { addConsult } from '@renderer/features/consultSlice'
import { reqCreateConsult } from '@renderer/api/Requests'
import { SearchAutocomplete } from '@renderer/components/SearchAutocomplete'
import { now, getLocalTimeZone } from '@internationalized/date'
import { reqSearchPatientByName, reqSearchClinicalStaffByName } from '@renderer/api/Requests'

export const CreateConsultModal = () => {
  const dispatch = useDispatch()
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [data, setData] = React.useState({
    date: '',
    reason: '',
    doctorId: '',
    patientId: '',
  })

  React.useEffect(() => {
    setIsSubmitted(false)
    setData({
      date: '',
      reason: '',
      doctorId: '',
      patientId: '',
    })
  }, [onClose, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleAddCreateConsult = () => {
    setIsSubmitted(true)

    const missingFields = !data.patientId || !data.doctorId || !data.date || !data.reason
    if (missingFields) return

    reqCreateConsult(data)
      .then((res) => {
        dispatch(addConsult(res.data))
        toast.success('Consulta creada correctamente.')
        onClose()
        setIsSubmitted(false)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        Crear consulta
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' backdrop='blur'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>Crea una nueva consulta</h3>
          </ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-col gap-4'>
              <SearchAutocomplete
                label='Paciente'
                itemKey='id'
                isRequired
                isInvalid={isSubmitted && !data.patientId}
                itemLabel='name'
                placeholder='Buscar por nombre o cédula...'
                setSelectedItem={(item) => {
                  setData((prevInfo) => ({
                    ...prevInfo,
                    patientId: item?.id || '',
                  }))
                }}
                searchFunction={(searchValue: string) =>
                  reqSearchPatientByName(searchValue).then((res) => res.data)
                }
              />
              <SearchAutocomplete
                label='Doctor'
                itemKey='id'
                isRequired
                isInvalid={isSubmitted && !data.doctorId}
                itemLabel='name'
                placeholder='Buscar por nombre o cédula...'
                setSelectedItem={(item) => {
                  setData((prevInfo) => ({
                    ...prevInfo,
                    doctorId: item?.id || '',
                  }))
                }}
                searchFunction={(searchValue: string) =>
                  reqSearchClinicalStaffByName(searchValue).then((res) => res.data)
                }
              />
              <DatePicker
                label='Fecha de la consulta'
                isRequired
                isInvalid={isSubmitted && !data.date}
                hideTimeZone
                showMonthAndYearPickers
                defaultValue={now(getLocalTimeZone())}
                onChange={(e) => {
                  const consultDate = new Date(e.year, e.month - 1, e.day)
                  consultDate.setHours(e.hour, e.minute, e.second, e.millisecond)
                  setData({
                    ...data,
                    date: consultDate.toISOString(),
                  })
                }}
              />
              <Textarea
                name='reason'
                label='Razón de la consulta'
                onChange={handleChange}
                isInvalid={isSubmitted && !data.reason}
                isRequired
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={handleAddCreateConsult}>
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
