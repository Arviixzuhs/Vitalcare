import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, MaxLength } from 'class-validator'

export class CreateNoteDto {
  @ApiProperty({ description: 'Título de la nota', example: 'Consulta médica' })
  @IsString()
  @MaxLength(280)
  title: string

  @ApiProperty({
    description: 'Descripción de la nota',
    example: 'El paciente presenta síntomas de gripe.',
  })
  @IsString()
  @MaxLength(280)
  description: string

  @ApiProperty({ description: 'ID del paciente (opcional)', example: 1, required: false })
  @IsOptional()
  patientId: number
}
