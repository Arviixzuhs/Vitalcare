import React from 'react'
import { Calendar } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import { RootState } from '@renderer/store'
import { setConsults } from '@renderer/features/consultSlice'
import { newParseDate } from '@renderer/utils/newParseDate'
import { reqGetAllConsults } from '@renderer/api/Requests'
import { setCurrentConsultDate } from '@renderer/features/consultSlice'
import { useDispatch, useSelector } from 'react-redux'

export const MedicalConsultationCalendar = () => {
  const dispatch = useDispatch()
  const consults = useSelector((state: RootState) => state.consult)
  const defaultDate = `${consults.currentConsultDate?.year}-${consults.currentConsultDate?.month?.toString().padStart(2, '0')}-${consults.currentConsultDate?.day?.toString().padStart(2, '0')}`

  React.useEffect(() => {
    const loadAllConsults = async () => {
      const response = await reqGetAllConsults()
      dispatch(setConsults(response.data))
    }
    loadAllConsults()
  }, [])

  const isDateUnavailable = (date: any) => {
    return !consults.data.some((consult: any) => {
      const parsedConsultDate = newParseDate({ date: consult.date })
      return (
        parsedConsultDate.day === date.day &&
        parsedConsultDate.month === date.month &&
        parsedConsultDate.year === date.year
      )
    })
  }

  return (
    <Calendar
      aria-label='Date (Controlled Focused Value)'
      onChange={(e) =>
        dispatch(setCurrentConsultDate({ day: e.day, month: e.month, year: e.year }))
      }
      defaultValue={consults.currentConsultDate && parseDate(defaultDate)}
      isDateUnavailable={isDateUnavailable}
    />
  )
}
