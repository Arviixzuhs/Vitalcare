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
  delete: (id: number) => void
  create: (data: unknown) => void
}

export interface ModalInputProps {
  name: string;
  type: string;
  label: string,
  isRequired?: boolean
  placeholder?: string;
}

export interface ModalSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export interface ModalProps {
  title: string
  action: (...data: unknown[]) => void
  inputs?: ModalInputProps[]
  buttonTitle?: string
  selectInputs?: ModalSelectProps[]
}

export interface AppTableInterface {
  columnsData: ColumnsData
  tableActions: TableActions
  addItemModal: React.JSX.Element
  editItemModal: React.JSX.Element
}
