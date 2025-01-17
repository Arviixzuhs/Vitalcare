import { Note } from '@prisma/client'
import { NoteService } from './note.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

@ApiTags('Note')
@ApiBearerAuth()
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.createNote(createNoteDto)
  }

  @Get('patient/:patientId')
  findAllNotesByPatientId(@Param('patientId') patientId: number): Promise<Note[]> {
    return this.noteService.findAllNotesByPatientId(patientId)
  }

  @Get(':id')
  findNoteById(@Param('id') id: number): Promise<Note> {
    return this.noteService.findNoteById(id)
  }

  @Patch(':id')
  updateNote(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.noteService.updateNote(id, updateNoteDto)
  }

  @Delete(':id')
  deleteNote(@Param('id') id: number): Promise<Note> {
    return this.noteService.deleteNote(id)
  }
}
