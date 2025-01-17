import { Patient } from './patientModel'

export interface NoteModel {
  id: number
  title: string
  patientId: number
  createdAt?: Date
  updatedAt: Date
  description: string
  patient: Patient
}
