export const newParseDate = ({ date, padStart = false }) => {
  const today = new Date(date)
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()

  if (padStart) {
    const paddedMonth = month.toString().padStart(2, '0')
    const paddedDay = day.toString().padStart(2, '0')
    return {
      day: paddedDay,
      month: paddedMonth,
      year,
    }
  } else {
    return {
      day,
      month,
      year,
    }
  }
}
