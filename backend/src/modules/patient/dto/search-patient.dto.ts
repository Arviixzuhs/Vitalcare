import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDate, IsOptional, MaxLength } from 'class-validator'

export class SearchPatientDto {
  @ApiProperty({ description: 'Nombre del paciente', example: 'Jane' })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  name?: string

  @ApiProperty({ description: 'Fecha de inicio del rango de búsqueda', example: '2023-01-01' })
  @IsDate()
  @IsOptional()
  startDate?: Date

  @ApiProperty({ description: 'Fecha de fin del rango de búsqueda', example: '2023-12-31' })
  @IsDate()
  @IsOptional()
  endDate?: Date
}
