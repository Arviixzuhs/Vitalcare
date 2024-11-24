import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ConsultService } from './consult.service'
import { ConsultController } from './consult.controller'

@Module({
  controllers: [ConsultController],
  providers: [ConsultService],
  imports: [PrismaModule],
})
export class ConsultModule {}
