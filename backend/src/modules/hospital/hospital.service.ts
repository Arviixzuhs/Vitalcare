import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ClinicalStaffService } from '../clinicalStaff/clinicalStaff.service'
import { PatientService } from '../patient/patient.service'

@Injectable()
export class HospitalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clinicalStaffService: ClinicalStaffService,
    private readonly patientService: PatientService,
  ) {}

  async getInfo(): Promise<{
    rooms: number
    consults: number
    patients: number
    clinicalStaffs: number
    patientsCount: { time: string; value: number }[]
    clinicalStaffsCount: { time: string; value: number }[]
    patientsCountByGender: { gender: string; count: number }[]
  }> {
    const [
      { rooms, consults, patients, clinicalStaffs },
      patientsCount,
      clinicalStaffsCount,
      patientsCountByGender,
    ] = await Promise.all([
      this.prisma.$transaction(async (prisma) => {
        const rooms = await prisma.room.count()
        const consults = await prisma.consult.count()
        const patients = await prisma.patient.count()
        const clinicalStaffs = await prisma.clinicalStaff.count()
        return { rooms, consults, patients, clinicalStaffs }
      }),
      this.patientService.getPatientsCountByDate(),
      this.clinicalStaffService.getClinicalStaffCountByDate(),
      this.patientService.getPatientsCountByGender(),
    ])

    return {
      rooms,
      consults,
      patients,
      clinicalStaffs,
      patientsCount,
      clinicalStaffsCount,
      patientsCountByGender,
    }
  }
}
