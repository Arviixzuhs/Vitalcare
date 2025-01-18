import React from 'react'
import { RootState } from '@renderer/store'
import { useLocation } from 'react-router-dom'
import { setDateFilter } from '@renderer/features/usersSlice'
import { Calendar, Trash } from 'lucide-react'
import { parseDate, CalendarDate } from '@internationalized/date'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  Badge,
  Button,
  DateValue,
  RangeValue,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { DateRangePicker, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'

export const FilterByDatePicker = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.users)
  const location = useLocation()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  React.useEffect(() => {
    clearFilter()
  }, [location])

  const handleChangeDate = (e: RangeValue<DateValue>) => {
    dispatch(
      setDateFilter({
        start: e.start?.toString() || '',
        end: e.end?.toString() || '',
      }),
    )
  }

  const clearFilter = () => {
    dispatch(
      setDateFilter({
        end: '',
        start: '',
      }),
    )
  }

  const isFilterActive = table.dateFilter.start !== '' && table.dateFilter.end !== ''

  const getDateValue = (): RangeValue<CalendarDate> | null => {
    if (table.dateFilter.start && table.dateFilter.end) {
      return {
        start: parseDate(table.dateFilter.start),
        end: parseDate(table.dateFilter.end),
      }
    }
    return null
  }

  return (
    <>
      <Badge
        content=''
        color='primary'
        shape='circle'
        placement='top-right'
        isInvisible={!isFilterActive}
      >
        <Button onPress={onOpen} isIconOnly variant='flat'>
          <Calendar
            size={18}
            className='text-xl text-default-500 pointer-events-none flex-shrink-0'
          />
        </Button>
      </Badge>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' placement='center'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1 default-text-color'>
            Filtrar por fecha
          </ModalHeader>
          <ModalBody>
            <div className='flex gap-4'>
              <div className='w-full'>
                <DateRangePicker
                  value={getDateValue()}
                  onChange={handleChangeDate}
                  aria-label='Fecha'
                />
              </div>
              <Button onPress={clearFilter} isIconOnly variant='flat'>
                <Trash
                  size={18}
                  className='text-xl text-default-500 pointer-events-none flex-shrink-0'
                />
              </Button>
            </div>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
