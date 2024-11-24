import { IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ConsultDto {
  @ApiPropertyOptional({ description: 'Fecha de la consulta', example: '2024-11-23T10:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  date?: string

  @ApiPropertyOptional({ description: 'ID del paciente asociado', example: 1 })
  @IsOptional()
  @IsInt()
  patientId?: number

  @ApiPropertyOptional({ description: 'ID del doctor asociado', example: 2 })
  @IsOptional()
  @IsInt()
  doctorId?: number

  @ApiPropertyOptional({ description: 'Razón de la consulta', example: 'Consulta general' })
  @IsOptional()
  @IsString()
  @MaxLength(400)
  reason?: string
}
