import React from 'react'
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
  const users = useSelector((state: any) => state.users.data)

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

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }

    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== columnsData.statusOptions.length
    ) {
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

  const handleDeleteUser = async (id: any) => tableActions.delete(id)
  const handleSetCurrentIdEdit = (id: any) => dispatch(setCurrentEditUserId(id))

  return (
    <div className='max-w-table'>
      <Table
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
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
        selectionMode='multiple'
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
        <TableBody emptyContent={'No hay pacientes registrados'} items={sortedItems}>
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
    </div>
  )
}
