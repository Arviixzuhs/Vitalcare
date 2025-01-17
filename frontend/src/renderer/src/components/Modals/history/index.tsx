import { HistoryTabs } from './components/HistoryTabs'
import { PatientCard } from './components/PatientCard'
import { modalTypes, useModal } from '@renderer/hooks/useModal'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

export const PatientHistory = () => {
  const [isOpen, toggleModal] = useModal(modalTypes.viewPatientProfileModal)

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={toggleModal}
      size='full'
      backdrop='blur'
      placement='center'
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
