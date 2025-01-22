import { HistoryTabs } from './components/HistoryTabs'
import { PatientCard } from './components/PatientCard'
import { modalTypes, useModal } from '@renderer/hooks/useModal'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

export const PatientHistory = () => {
  const [isOpen, toggleModal] = useModal(modalTypes.viewPatientProfileModal)

  return (
    <Modal
      size='full'
      isOpen={isOpen}
      backdrop='blur'
      placement='center'
      onOpenChange={toggleModal}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 default-text-color'>
          Historial Médico
        </ModalHeader>
        <ModalBody className='h-full'>
          <PatientCard />
          <HistoryTabs />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
