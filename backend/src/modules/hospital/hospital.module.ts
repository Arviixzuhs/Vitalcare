import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { HospitalService } from './hospital.service'
import { HospitalController } from './hospital.controller'
import { PatientService } from '../patient/patient.service'
import { ClinicalStaffService } from '../clinicalStaff/clinicalStaff.service'

@Module({
  controllers: [HospitalController],
  providers: [HospitalService, PatientService, ClinicalStaffService],
  imports: [PrismaModule],
})
export class HospitalModule {}
