import React from 'react'
import { capitalize } from './utils'
import { SearchIcon } from './SearchIcon'
import { ChevronDownIcon } from './ChevronDownIcon'
import { VerticalDotsIcon } from './VerticalDotsIcon'
import { CreateNewUserModal } from '../Modals/newUser'
import { EditUserProfileModal } from '../Modals/editUser'
import { columns, statusOptions } from './data'
import { useDispatch, useSelector } from 'react-redux'
import { reqDeletePatient, reqLoadAllPatients } from '@renderer/api/Requests'
import { deleteUser, setCurrentEditUserId, setUsers } from '../../features/usersSlice'
import {
  User,
  Chip,
  Input,
  Table,
  Button,
  TableRow,
  Dropdown,
  ChipProps,
  Selection,
  TableBody,
  TableCell,
  Pagination,
  TableHeader,
  TableColumn,
  DropdownItem,
  DropdownMenu,
  SortDescriptor,
  DropdownTrigger,
} from '@nextui-org/react'

export const AppTable = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users.data)

  const statusColorMap: Record<string, ChipProps['color']> = {
    active: 'success',
    paused: 'danger',
    vacation: 'warning',
  }

  const INITIAL_VISIBLE_COLUMNS = ['name', 'lastName', 'CI', 'role', 'actions', 'age', 'email']

  React.useEffect(() => {
    const loadAllUsers = async () => {
      const response = await reqLoadAllPatients()
      console.log(response.data)
      dispatch(setUsers(response.data))
    }
    loadAllUsers()
  }, [])

  const handleDeleteUser = async (id: any) => {
    try {
      dispatch(deleteUser(id))
      const response = await reqDeletePatient(id)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetCurrentIdEdit = (id: any) => {
    dispatch(setCurrentEditUserId(id))
  }

  type User = (typeof users)[0]

  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  )
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  })

  const [page, setPage] = React.useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) => Array.from(statusFilter).includes(user.status))
    }

    return filteredUsers
  }, [users, filterValue, statusFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number
      const second = b[sortDescriptor.column as keyof User] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User]

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        )
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small capitalize'>{cellValue}</p>
            <p className='text-bold text-tiny capitalize text-default-400'>{user.team}</p>
          </div>
        )
      case 'status':
        return (
          <Chip className='capitalize' color={statusColorMap[user.status]} size='sm' variant='flat'>
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className='relative flex justify-end items-center gap-2'>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <VerticalDotsIcon className='text-default-300' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => handleSetCurrentIdEdit(user.id)}>Editar</DropdownItem>
                <DropdownItem onPress={() => handleDeleteUser(user.id)}>Borrar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
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
              <Dropdown>
                <DropdownTrigger className='hidden sm:flex'>
                  <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                    Status
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
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className='capitalize'>
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className='hidden sm:flex'>
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
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className='capitalize'>
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <CreateNewUserModal />
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-default-400 text-small'>{users.length} pacientes en total</span>
            <label className='flex items-center text-default-400 text-small'>
              Pacientes por página:
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
        <EditUserProfileModal />
      </>
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ])

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {selectedKeys === 'all'
            ? 'Todos estan seleccionados'
            : `${selectedKeys.size} de ${filteredItems.length}  seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'max-h-[382px]',
      }}
      selectedKeys={selectedKeys}
      selectionMode='multiple'
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No hay pacientes registrados'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
