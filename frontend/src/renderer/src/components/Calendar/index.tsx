import React from 'react'
import { Calendar } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import { RootState } from '@renderer/store'
import { newParseDate } from '@renderer/utils/newParseDate'
import { useDispatch, useSelector } from 'react-redux'
import { reqFindAllConsultsByMonthAndYear } from '@renderer/api/Requests'
import { setConsults, setCurrentConsultDate } from '@renderer/features/consultSlice'

export const MedicalConsultationCalendar = () => {
  const dispatch = useDispatch()
  const consults = useSelector((state: RootState) => state.consult)
  const defaultDate = `${consults.currentConsultDate?.year}-${consults.currentConsultDate?.month?.toString().padStart(2, '0')}-${consults.currentConsultDate?.day?.toString().padStart(2, '0')}`

  interface ConsultDate {
    day: number
    month: number
    year: number
  }

  const isDateUnavailable = (date: ConsultDate): boolean => {
    return !consults.data.some((consult) => {
      const parsedConsultDate = newParseDate({ date: consult.date })
      return (
        parsedConsultDate.day === date.day &&
        parsedConsultDate.month === date.month &&
        parsedConsultDate.year === date.year
      )
    })
  }

  React.useEffect(() => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    handleFindConsultsByMonthAndYear(month, year)
  }, [])

  const handleFindConsultsByMonthAndYear = async (month: number, year: number) => {
    const res = await reqFindAllConsultsByMonthAndYear(month, year)

    if (res.data.length === 0) return
    dispatch(setConsults(res.data))
  }

  return (
    <div className='hidden md:block select-none'>
      <Calendar
        aria-label='Date (Controlled Focused Value)'
        errorMessage
        onFocusChange={(e) => handleFindConsultsByMonthAndYear(e.month, e.year)}
        onChange={(e) =>
          dispatch(setCurrentConsultDate({ day: e.day, month: e.month, year: e.year }))
        }
        value={consults.currentConsultDate ? parseDate(defaultDate) : undefined}
        isDateUnavailable={isDateUnavailable}
      />
    </div>
  )
}
