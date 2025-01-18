import { DropdownItemInteface } from './ActionDropdown'

export interface ColumnData {
  uid: string
  name: string
  sortable?: boolean
}

export interface ColumnsData {
  columns: ColumnData[]
  statusOptions?: { name: string; uid: string }[]
  InitialVisibleColumns: string[]
}

export interface TableActions {
  edit: (data: unknown, currentUserEdit: unknown) => void
  load: () => void
  delete: (id: number) => void
  create: (data: unknown) => void
  search: (value: string) => void
}

export interface ModalProps {
  title: string
  action: (...data: unknown[]) => void
  inputs?: FormField[]
  textArea?: TextAreaField[]
  buttonTitle?: string
  selectInputs?: SelectField[]
}

interface BaseField {
  name: string
  label?: string
  isRequired?: boolean
  placeholder?: string
}

interface FormField extends BaseField {
  type: string
}

interface SelectField extends BaseField {
  options: SelectOption[]
}

interface SelectOption {
  label: string
  value: string
}

export type TextAreaField = BaseField

export interface ModalInputProps {
  name: string
  type: string
  label: string
  isRequired?: boolean
  placeholder?: string
}

export interface ModalSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export interface AppTableInterface {
  columnsData: ColumnsData
  tableActions: TableActions
  addItemModal: React.JSX.Element
  editItemModal: React.JSX.Element
  dropdownAction?: DropdownItemInteface[] | undefined
}
