export const newParseDate = ({ date, padStart = false }) => {
  const today = new Date(date)
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const hours = today.getHours()
  const minutes = today.getMinutes()

  if (padStart) {
    const paddedMonth = month.toString().padStart(2, '0')
    const paddedDay = day.toString().padStart(2, '0')
    const paddedHours = hours.toString().padStart(2, '0')
    const paddedMinutes = minutes.toString().padStart(2, '0')
    return {
      day: paddedDay,
      month: paddedMonth,
      year,
      hours: paddedHours,
      minutes: paddedMinutes,
    }
  } else {
    return {
      day,
      month,
      year,
      hours,
      minutes,
    }
  }
}



export const newParseDateWithTime = ({ date }) => {
  const today = new Date(date);

  // Extraer año, mes, día, hora, minutos, y AM/PM
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Los meses en JS son de 0 a 11
  const day = today.getDate();

  let hour = today.getHours(); // Hora en formato 24 horas
  const minute = today.getMinutes();

  // AM/PM y conversión de hora a formato 12 horas
  const ampm = hour >= 12 ? 'P.M.' : 'A.M.';
  hour = hour % 12; // Convertir a formato de 12 horas
  if (hour === 0) hour = 12; // Para las 12 A.M. o P.M.

  // Aplicar padding si se requiere
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');
  const paddedHour = hour.toString().padStart(2, '0');
  const paddedMinute = minute.toString().padStart(2, '0');

  // Retornar el formato deseado
  return {
    date: `${paddedDay}/${paddedMonth}/${year}`,
    time: `${paddedHour}:${paddedMinute} ${ampm}`,
  };
}
