import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ConsultService } from '../consult/consult.service'
import { PatientService } from '../patient/patient.service'
import { HospitalService } from './hospital.service'
import { HospitalController } from './hospital.controller'
import { ClinicalStaffService } from '../clinicalStaff/clinicalStaff.service'

@Module({
  controllers: [HospitalController],
  providers: [HospitalService, PatientService, ClinicalStaffService, ConsultService],
  imports: [PrismaModule],
})
export class HospitalModule {}
