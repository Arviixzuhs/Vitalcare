import { Module } from '@nestjs/common'
import { NoteService } from './note.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { NoteController } from './note.controller'

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [PrismaModule],
})
export class NoteModule {}
