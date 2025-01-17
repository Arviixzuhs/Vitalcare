import React from 'react'
import { RootState } from '@/store'
import {
  Input,
  Button,
  Dropdown,
  Selection,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { SearchIcon } from '@renderer/components/Icons/SearchIcon'
import { capitalize } from '../utils'
import { useSelector } from 'react-redux'
import { ColumnsData } from '../interfaces/TableProps'
import { ChevronDownIcon } from '@renderer/components/Icons/ChevronDownIcon'

interface TopContentProps {
  setPage: React.Dispatch<React.SetStateAction<number>>
  columnsData: ColumnsData
  filterValue: string
  statusFilter: Selection
  addItemModal: JSX.Element
  editItemModal: JSX.Element
  visibleColumns: Selection
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  setFilterValue: React.Dispatch<React.SetStateAction<string>>
  setStatusFilter: React.Dispatch<React.SetStateAction<Selection>>
  setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>
}

export const TopContent: React.FC<TopContentProps> = ({
  setPage,
  columnsData,
  filterValue,
  statusFilter,
  addItemModal,
  editItemModal,
  visibleColumns,
  setRowsPerPage,
  setFilterValue,
  setStatusFilter,
  setVisibleColumns,
}) => {
  const table = useSelector((state: RootState) => state.users.data)
  const onRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(1)
  }

  const onSearchChange = (value: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }

  const onClear = () => {
    setFilterValue('')
    setPage(1)
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Buscar por nombre...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            {columnsData.statusOptions && (
              <Dropdown maxHeight={3}>
                <DropdownTrigger className='sm:flex'>
                  <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                    Filtrar
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label='Table Columns'
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode='multiple'
                  onSelectionChange={setStatusFilter}
                >
                  {columnsData.statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className='capitalize dropdownCheckboxIcon'>
                      <h3 className='default-text-color'>{capitalize(status.name)}</h3>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {columnsData.columns && (
              <Dropdown
                classNames={{
                  base: 'max-h-[350px] overflow-y-scroll',
                }}
              >
                <DropdownTrigger className='sm:flex'>
                  <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                    Columnas
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label='Table Columns'
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode='multiple'
                  onSelectionChange={setVisibleColumns}
                >
                  {columnsData.columns.map((column) => (
                    <DropdownItem key={column.uid} className='capitalize dropdownCheckboxIcon'>
                      <h3 className='default-text-color'>{capitalize(column.name)}</h3>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {addItemModal}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>{table.length} pacientes en total</span>
          <label className='flex items-center text-default-400 text-small'>
            Resultados por página:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
      {editItemModal}
    </>
  )
}
