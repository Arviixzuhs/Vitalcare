import { Patient } from './patientModel'

export interface Room {
  id: number
  piso: number
  patientId?: number | null
  numeroHabitacion: number
  patient?: Patient | null
}
