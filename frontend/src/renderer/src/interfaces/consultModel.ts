import { Patient } from './patientModel'
import { ClinicalStaff } from './clinicalStaffModel'

export interface Consult {
  id: number
  date: Date
  patientId?: number | null
  doctorId?: number | null
  reason: string
  patient?: Patient | null
  doctor?: ClinicalStaff | null
}
