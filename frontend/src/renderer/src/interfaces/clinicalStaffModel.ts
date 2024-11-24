import { Consult } from './consultModel'
import { Gender } from './patientModel'

export interface ClinicalStaff {
  id: number
  age: number
  name: string
  lastName: string
  CI: string
  placaCarro: string
  numeroHijos: string
  area: string
  gender: Gender
  createdAt?: Date | null
  jubilados: string
  egresados: string
  tallaCamisas: string
  dependencias: string
  cargoNominal: string
  phone: string
  email: string
  address: string
  avatar: string
  Consult?: Consult[]
}
