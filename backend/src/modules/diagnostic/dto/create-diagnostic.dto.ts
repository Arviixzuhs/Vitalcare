import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, MaxLength } from 'class-validator'

export class CreateDiagnosticDto {
  @ApiProperty({ description: 'Condición diagnóstica', example: 'Gripe' })
  @IsString()
  @MaxLength(280)
  condition: string

  @ApiProperty({
    description: 'Descripción del diagnóstico',
    example: 'Paciente presenta fiebre y tos',
  })
  @IsString()
  @MaxLength(280)
  description: string

  @ApiProperty({ description: 'ID del paciente', example: 1 })
  @IsOptional()
  patientId?: number

  @ApiProperty({ description: 'ID del doctor', example: 1 })
  @IsOptional()
  doctorId?: number
}
