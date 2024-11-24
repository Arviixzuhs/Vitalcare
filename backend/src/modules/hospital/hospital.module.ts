import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { HospitalService } from './hospital.service'
import { HospitalController } from './hospital.controller'

@Module({
  controllers: [HospitalController],
  providers: [HospitalService],
  imports: [PrismaModule],
})
export class HospitalModule {}
