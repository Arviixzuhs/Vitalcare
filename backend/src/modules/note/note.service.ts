import { Note } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  createNote(data: CreateNoteDto): Promise<Note> {
    return this.prisma.note.create({
      data,
    })
  }

  findAllNotesByPatientId(patientId: number): Promise<Note[]> {
    return this.prisma.note.findMany({ where: { patientId } })
  }

  findNoteById(id: number): Promise<Note> {
    return this.prisma.note.findFirst({
      where: { id },
    })
  }

  updateNote(id: number, data: UpdateNoteDto): Promise<Note> {
    return this.prisma.note.update({
      where: {
        id,
      },
      data,
    })
  }

  deleteNote(id: number): Promise<Note> {
    return this.prisma.note.delete({
      where: {
        id,
      },
    })
  }
}
