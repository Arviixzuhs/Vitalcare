import React from 'react'
import { TabTable } from '@renderer/components/Modals/history/components/TabTable'
import { RootState } from '@renderer/store'
import { useModal, modalTypes } from '@renderer/hooks/useModal'
import { reqFindAllConsultsToDay } from '@renderer/api/Requests'
import { useDispatch, useSelector } from 'react-redux'
import { setColumns, setTabData, setCurrentTab } from '@renderer/features/tablePerTabSlice'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

export const ConsultsToDayModal = () => {
  const [isOpen, handleChange] = useModal(modalTypes.viewConsultsToDay)
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.tablePerTab)
  const tab = table.currentTab

  React.useEffect(() => {
    dispatch(setCurrentTab('consultsToDay'))
    const columns = [
      { uid: 'patient', title: 'Paciente' },
      { uid: 'doctor', title: 'Doctor' },
      { uid: 'reason', title: 'Razón' },
      { uid: 'date', title: 'Fecha' },
    ]
    dispatch(setColumns(columns))

    reqFindAllConsultsToDay()
      .then((res) => {
        const data = res.data
        dispatch(setTabData({ tab, data }))
      })
      .catch(console.log)
  }, [table.currentTab])

  return (
    <Modal
      size='3xl'
      isOpen={isOpen}
      backdrop='blur'
      placement='center'
      onOpenChange={handleChange}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 default-text-color'>
          Consultas para hoy
        </ModalHeader>
        <ModalBody>
          <TabTable />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
