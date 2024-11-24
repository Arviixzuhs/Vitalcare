import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ClinicalStaffService } from './clinicalStaff.service'
import { ClinicalStaffController } from './clinicalStaff.controller'

@Module({
  controllers: [ClinicalStaffController],
  providers: [ClinicalStaffService],
  imports: [PrismaModule],
})
export class ClinicalStaffModule {}
