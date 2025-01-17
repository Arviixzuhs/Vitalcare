import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, MaxLength } from 'class-validator'

export class UpdateNoteDto {
  @ApiProperty({ description: 'Título de la nota', example: 'Consulta médica', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(280)
  title?: string

  @ApiProperty({
    description: 'Descripción de la nota',
    example: 'El paciente tiene síntomas leves de gripe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(280)
  description?: string
}
