import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DriveService } from './drive.service'
import { DriveController } from './drive.controller'

@Module({
  controllers: [DriveController],
  providers: [DriveService],
  imports: [PrismaModule],
})
export class DriveModule {}
