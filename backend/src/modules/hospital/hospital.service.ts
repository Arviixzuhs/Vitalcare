import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ClinicalStaffService } from '../clinicalStaff/clinicalStaff.service'
import { PatientService } from '../patient/patient.service'
import { ConsultService } from '../consult/consult.service'

@Injectable()
export class HospitalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clinicalStaffService: ClinicalStaffService,
    private readonly patientService: PatientService,
    private readonly consultService: ConsultService,
  ) {}

  async getInfo(): Promise<{
    consults: number
    patients: number
    consultsToDay: number
    clinicalStaffs: number
    patientsCount: { time: string; value: number }[]
    clinicalStaffsCount: { time: string; value: number }[]
    patientsCountByGender: { gender: string; count: number }[]
  }> {
    const [
      { consults, consultsToDay, patients, clinicalStaffs },
      patientsCount,
      clinicalStaffsCount,
      patientsCountByGender,
    ] = await Promise.all([
      this.prisma.$transaction(async (prisma) => {
        const consults = await prisma.consult.count()
        const patients = await prisma.patient.count()
        const consultsToDay = await this.consultService.findAllConsultsToDayCount()
        const clinicalStaffs = await prisma.clinicalStaff.count()
        return { consults, consultsToDay, patients, clinicalStaffs }
      }),
      this.patientService.getPatientsCountByDate(),
      this.clinicalStaffService.getClinicalStaffCountByDate(),
      this.patientService.getPatientsCountByGender(),
    ])

    return {
      consults,
      patients,
      consultsToDay,
      clinicalStaffs,
      patientsCount,
      clinicalStaffsCount,
      patientsCountByGender,
    }
  }
}
