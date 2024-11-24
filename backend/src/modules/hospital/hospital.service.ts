import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

  async getInfo(): Promise<{
    rooms: number
    consults: number
    patients: number
    clinicalStaffs: number
  }> {
    const rooms = (await this.prisma.room.findMany()).length
    const consults = (await this.prisma.consult.findMany()).length
    const patients = (await this.prisma.patient.findMany()).length
    const clinicalStaffs = (await this.prisma.clinicalStaff.findMany()).length

    return { rooms, consults, patients, clinicalStaffs }
  }
}
