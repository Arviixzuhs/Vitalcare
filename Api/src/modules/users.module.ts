import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersService } from 'src/services/users.service'
import { UsersController } from 'src/controllers/users.controller'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
