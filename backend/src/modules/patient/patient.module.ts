import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PatientService } from './patient.service'
import { PatientController } from './patient.controller'

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [PrismaModule],
})
export class PatientModule {}
