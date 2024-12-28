import React from 'react'
import {
  Input,
  Table,
  Tooltip,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
} from '@nextui-org/react'
import toast from 'react-hot-toast'
import { RootState } from '@renderer/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ActionDropdown } from '@renderer/components/Dropdown'
import { EditConsultModal } from '@renderer/components/Modals/consult/editConsult'
import { CreateConsultModal } from '@renderer/components/Modals/consult'
import { BiCommentCheck, BiCommentX } from 'react-icons/bi'
import { MedicalConsultationCalendar } from '@renderer/components/Calendar'
import { newParseDateWithTime, newParseDate } from '@renderer/utils/newParseDate'
import { reqDeleteConsult, reqSearchConsultByPatientCI } from '@renderer/api/Requests'
import {
  setCurrentConsultId,
  deleteConsult,
  setConsults,
  setCurrentConsultDate,
} from '@renderer/features/consultSlice'

export const Consults = () => {
  const dispatch = useDispatch()
  const consult = useSelector((state: RootState) => state.consult)
  const currentData = consult.currentConsultDate
  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(() => {
    const searchConsults = async () => {
      if (searchValue.trim() === '') return
      if (searchValue.length < 3) return

      const response = await reqSearchConsultByPatientCI(searchValue)
      dispatch(setCurrentConsultId(-1))
      dispatch(setConsults(response.data))
      if (response.data.length > 0) {
        const date = new Date(response.data[response.data.length - 1].date)
        dispatch(
          setCurrentConsultDate({
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          }),
        )
      }
    }
    searchConsults()
  }, [searchValue])

  const filteredData = consult.data.filter((consult: any) => {
    const parsedConsultDate = newParseDate({ date: consult.date })
    return (
      parsedConsultDate.day === currentData?.day &&
      parsedConsultDate.month === currentData?.month &&
      parsedConsultDate.year === currentData?.year
    )
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchValue(e.target.value)
  }

  const columns = [
    {
      key: 'ended',
      label: <Checkbox />,
    },
    {
      key: 'doctor',
      label: 'DOCTOR',
    },
    {
      key: 'patient',
      label: 'PACIENTE',
    },
    {
      key: 'date',
      label: 'FECHA',
    },
    {
      key: 'reason',
      label: 'RAZÓN',
    },
    {
      key: 'actions',
      label: 'ACCIÓN',
    },
  ]

  const RenderCell = (item: any, columnKey: any) => {
    const cellValue = item[columnKey]

    switch (columnKey) {
      case 'doctor':
      case 'patient':
        return (
          <h3>
            {cellValue?.name} {cellValue?.lastName}
          </h3>
        )

      case 'date':
        const parsedDate = newParseDateWithTime({ date: cellValue })

        return (
          <td>
            {parsedDate.date} a las {parsedDate.time}
          </td>
        )

      case 'ended':
        return <Checkbox defaultSelected />

      case 'reason':
        return item.reason ? (
          <Tooltip className='default-text-color' content={item.reason}>
            <div>
              <BiCommentCheck color='#12a17e' className='iconSVG' />
            </div>
          </Tooltip>
        ) : (
          <BiCommentX color='#f31260' className='iconSVG' />
        )

      case 'actions':
        return (
          <ActionDropdown
            editAction={() => dispatch(setCurrentConsultId(item.id))}
            deleteAction={async () => {
              try {
                dispatch(deleteConsult(item.id))
                const response = await reqDeleteConsult(item.id)
                toast.success(response.data)
              } catch (error: any) {
                toast.error(error.response.data.message)
              }
            }}
          />
        )
      default:
        return cellValue
    }
  }

  return (
    <div className='flex gap-4'>
      <div>
        <MedicalConsultationCalendar />
      </div>
      <div className='w-full flex gap-4 flex-col'>
        <div className='flex gap-3'>
          <Input
            isClearable
            className='w-full'
            placeholder='Buscar por cédula de paciente...'
            onChange={handleChange}
          />
          <CreateConsultModal />
        </div>
        <Table aria-label='Example table with dynamic content'>
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={filteredData}>
            {(item: any) => (
              <TableRow key={item.data}>
                {(columnKey) => (
                  <TableCell className='default-text-color'>
                    {RenderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <EditConsultModal />
    </div>
  )
}
