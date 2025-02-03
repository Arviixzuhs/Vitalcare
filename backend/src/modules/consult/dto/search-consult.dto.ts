import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsDateString } from 'class-validator'

export class SearchConsultDto {
  @ApiPropertyOptional({
    description: 'Valor de búsqueda (nombre del paciente, apellido o CI)',
    example: 'Juan Pérez',
  })
  @IsOptional()
  @IsString()
  searchValue?: string

  @ApiPropertyOptional({
    description: 'Fecha de inicio en formato ISO (YYYY-MM-DD)',
    example: '2024-02-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string

  @ApiPropertyOptional({
    description: 'Fecha de fin en formato ISO (YYYY-MM-DD)',
    example: '2024-02-28',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string
}
