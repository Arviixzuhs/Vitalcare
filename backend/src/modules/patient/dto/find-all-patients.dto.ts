import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class FindAllPatientsDto {
  @ApiProperty({ description: 'Fecha de inicio del rango de búsqueda', example: '2023-01-01' })
  @IsString()
  @IsOptional()
  startDate?: string

  @ApiProperty({ description: 'Fecha de fin del rango de búsqueda', example: '2023-12-31' })
  @IsString()
  @IsOptional()
  endDate?: string
}
