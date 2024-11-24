import React from 'react'
import { RootState } from '@renderer/store'
import { TopContent } from './TopContent'
import { RenderCell } from './RenderCell'
import { BottomContent } from './BottomContent'
import { setCurrentEditUserId } from '../../features/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Selection,
  TableHeader,
  TableColumn,
  SortDescriptor,
} from '@nextui-org/react'

export const AppTable = ({
  columnsData,
  tableActions,
  createNewUserModal,
  editUserProfileModal,
}) => {
  const dispatch = useDispatch()
  type User = (typeof users)[0]
  const users = useSelector((state: RootState) => state.users.data)

  const [page, setPage] = React.useState(1)
  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(columnsData.InitialVisibleColumns),
  )
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  })

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columnsData.columns

    return columnsData.columns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid),
    )
  }, [visibleColumns])

  const hasSearchFilter = Boolean(filterValue)
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]

    // Filtrado por nombre
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }

    // Si hay filtros activos (statusFilter o genderFilter)
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== columnsData.statusOptions.length
    ) {
      const filterFields = ['status', 'gender'] // Puedes agregar aquí cualquier campo que desees filtrar
      filteredUsers = filteredUsers.filter((item) => {
        return filterFields.some((field) => Array.from(statusFilter).includes(item[field]))
      })
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

  const handleDeleteUser = async (id: any) => tableActions.delete(id)
  const handleSetCurrentIdEdit = (id: any) => dispatch(setCurrentEditUserId(id))

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      isCompact
      selectionMode='multiple'
      className='h-full'
      classNames={{
        th: 'text-default-500',
        table: [`${items.length === 0 && 'h-full'}`],
        wrapper: [' h-full overflow-y-auto  hoverScrollbar '],
      }}
      bottomContent={
        <BottomContent
          page={page}
          pages={pages}
          setPage={setPage}
          selectedKeys={selectedKeys}
          filteredItems={filteredItems}
        />
      }
      bottomContentPlacement='outside'
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          setPage={setPage}
          columnsData={columnsData}
          filterValue={filterValue}
          statusFilter={statusFilter}
          visibleColumns={visibleColumns}
          setRowsPerPage={setRowsPerPage}
          setFilterValue={setFilterValue}
          setStatusFilter={setStatusFilter}
          setVisibleColumns={setVisibleColumns}
          createNewUserModal={createNewUserModal}
          editUserProfileModal={editUserProfileModal}
        />
      }
      topContentPlacement='outside'
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column: any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent='Sin registros' items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className='default-text-color'>
                {RenderCell(item, columnKey, handleDeleteUser, handleSetCurrentIdEdit)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
