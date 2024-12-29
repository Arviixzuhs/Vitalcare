export interface ColumnData {
  uid: string
  name: string
  sortable?: boolean
}

export interface ColumnsData {
  columns: ColumnData[]
  InitialVisibleColumns: string[]
  statusOptions?: { name: string; uid: string }[]
}

export interface TableActions {
  delete: (id: number) => void
  create: (data: unknown) => void
  edit: (data: unknown, currentUserEdit: unknown) => void
}

export interface ModalProps {
  title: string
  action: (...data: unknown[]) => void
  inputs?: { name: string; placeholder?: string; type: string; label: string }[]
  buttonTitle?: string
  selectInputs?: {
    name: string
    placeholder?: string
    label: string
    options: { value: string; label: string }[]
  }[]
}

export interface AppTableInterface {
  columnsData: ColumnsData
  tableActions: TableActions
  addItemModal: React.JSX.Element
  editItemModal: React.JSX.Element
}
