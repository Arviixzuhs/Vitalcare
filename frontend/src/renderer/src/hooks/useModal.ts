import { useDispatch, useSelector } from 'react-redux'
import { handleShowModal, isModalOpen } from '@renderer/features/currentModal'

export const modalTypes = Object.freeze({
  viewConsultsToDay: 'VIEW_CONSULTS_TO_DAY',
  editItemTableModal: 'EDIT_ITEM_TABLE_MODAL',
  editItemTableTabModal: 'EDIT_ITEM_TABLE__TAB_MODAL',
  viewPatientProfileModal: 'VIEW_PATIENT_PROFILE_MODAL',
} as const)

type ModalType = (typeof modalTypes)[keyof typeof modalTypes]

export const useModal = (modalType: ModalType): [boolean, () => void] => {
  const dispatch = useDispatch()
  const isOpen = useSelector(isModalOpen(modalType))

  const toggleModal = () => dispatch(handleShowModal(modalType))

  return [isOpen, toggleModal]
}
