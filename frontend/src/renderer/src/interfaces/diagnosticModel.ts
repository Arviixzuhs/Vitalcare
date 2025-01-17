import { ClinicalStaff } from './clinicalStaffModel'
import { Patient } from './patientModel'

export interface DiagnosticModel {
  id: number
  doctorId?: number
  patientId?: number
  createdAt?: Date
  updatedAt: Date
  condition: string
  description: string
  doctor?: ClinicalStaff
  patient?: Patient
}
