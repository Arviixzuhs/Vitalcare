import { Selection } from '@nextui-org/react'
import { Button, Pagination } from '@nextui-org/react'

interface BottomContentProps {
  page: number
  pages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  selectedKeys: Selection
  filteredItems: unknown[]
}

export const BottomContent: React.FC<BottomContentProps> = ({
  page,
  pages,
  setPage,
  selectedKeys,
  filteredItems,
}) => {
  const onNextPage = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }

  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div className='flex justify-between items-center'>
      <span className='w-[30%] text-small text-default-400'>
        {selectedKeys === 'all'
          ? 'Todos están seleccionados'
          : `${selectedKeys.size} de ${filteredItems.length}  seleccionados`}
      </span>
      <Pagination isCompact showControls page={page} total={pages || 1} onChange={setPage} />
      <div className='hidden sm:flex w-[30%] justify-end gap-2'>
        <Button isDisabled={page === 1} size='sm' variant='flat' onPress={onPreviousPage}>
          Anteior
        </Button>
        <Button
          isDisabled={page === pages || pages == 0}
          size='sm'
          variant='flat'
          onPress={onNextPage}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
