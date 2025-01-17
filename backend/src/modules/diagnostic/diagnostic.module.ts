import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DiagnosticService } from './diagnostic.service'
import { DiagnosticController } from './diagnostic.controller'

@Module({
  controllers: [DiagnosticController],
  providers: [DiagnosticService],
  imports: [PrismaModule],
})
export class DiagnosticModule {}
