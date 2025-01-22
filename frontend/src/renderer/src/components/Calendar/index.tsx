import { Calendar } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import { RootState } from '@renderer/store'
import { newParseDate } from '@renderer/utils/newParseDate'
import { setCurrentConsultDate } from '@renderer/features/consultSlice'
import { useDispatch, useSelector } from 'react-redux'

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

  return (
    <div className='hidden md:block'>
      <Calendar
        aria-label='Date (Controlled Focused Value)'
        onChange={(e) =>
          dispatch(setCurrentConsultDate({ day: e.day, month: e.month, year: e.year }))
        }
        value={consults.currentConsultDate ? parseDate(defaultDate) : undefined}
        isDateUnavailable={isDateUnavailable}
      />
    </div>
  )
}
