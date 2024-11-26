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
import { reqSearchPatientByName, reqSearchClinicalStaffByName } from '@renderer/api/Requests'

export const CreateConsultModal = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [data, setData] = React.useState<any>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let name = e.target.name
    let value = e.target.value
    setData({
      ...data,
      [name]: value,
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
            <div className='flex w-full flex-col gap-4'>
              <SearchAutocomplete
                label='Paciente'
                itemKey='id'
                itemLabel='name'
                setSelectedItem={(item) => {
                  setData((prevInfo) => ({
                    ...prevInfo,
                    patientId: item?.id,
                  }))
                }}
                searchFunction={(searchValue: string) =>
                  reqSearchPatientByName(searchValue).then((res) => res.data)
                }
              />
              <SearchAutocomplete
                label='Doctor'
                itemKey='id'
                itemLabel='name'
                setSelectedItem={(item) => {
                  setData((prevInfo) => ({
                    ...prevInfo,
                    doctorId: item?.id,
                  }))
                }}
                searchFunction={(searchValue: string) =>
                  reqSearchClinicalStaffByName(searchValue).then((res) => res.data)
                }
              />
              <DatePicker
                label='Fecha de la consulta'
                onChange={(e) => {
                  const consultDate = new Date(`${e.year}-${e.month}-${e.day + 1}`)
                  setData({
                    ...data,
                    ['date']: consultDate.toISOString(),
                  })
                }}
              />
              <Textarea name='reason' label='Razón de la consulta' onChange={handleChange} />
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
