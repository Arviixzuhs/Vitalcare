import { Consult } from './consultModel'
import { Room } from './roomModel'

export enum Status {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Patient {
  id: number
  CI: string
  age: number
  name: string
  email: string
  status: Status
  gender: Gender
  avatar: string
  lastName: string
  createdAt?: Date | null
  description: string
  reasonEntry: string
  reasonDeath: string
  Consult?: Consult[] // Relación con consultas
  Room?: Room[] // Relación con habitaciones
}
