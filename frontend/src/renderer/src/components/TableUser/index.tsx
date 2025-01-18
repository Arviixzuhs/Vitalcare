import React from 'react'
import { RootState } from '@renderer/store'
import { TopContent } from '@renderer/components/TableUser/components/TopContent'
import { RenderCell } from '@renderer/components/TableUser/components/RenderCell'
import { BottomContent } from './components/BottomContent'
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
import { AppTableInterface } from './interfaces/TableProps'
import { EmptyTableContent } from './components/EmptyContent'

export const AppTable = ({
  columnsData,
  tableActions,
  addItemModal,
  editItemModal,
  dropdownAction,
}: AppTableInterface) => {
  const dispatch = useDispatch()
  type User = (typeof users)[0]
  const table = useSelector((state: RootState) => state.users)
  const users = table.data

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
    return columnsData.columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  React.useEffect(() => {
    if (filterValue.length === 0) {
      tableActions.load()
    } else {
      tableActions.search(filterValue)
    }
  }, [filterValue])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]

    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== columnsData?.statusOptions?.length
    ) {
      const filterFields = ['status', 'gender']
      filteredUsers = filteredUsers.filter((item) => {
        return filterFields.every((field) => Array.from(statusFilter).includes(item[field]))
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

  const deleteAction = async (id: number) => tableActions.delete(id)
  const editAction = (id: number) => dispatch(setCurrentEditUserId(id))

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      isCompact
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
          addItemModal={addItemModal}
          editItemModal={editItemModal}
        />
      }
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
      <TableBody emptyContent={<EmptyTableContent />} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className='default-text-color'>
                <RenderCell
                  item={item}
                  columnKey={columnKey}
                  editAction={editAction}
                  deleteAction={deleteAction}
                  dropdownAction={dropdownAction}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
