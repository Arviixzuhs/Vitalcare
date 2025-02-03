import { IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class FindAllConsultByMonthAndYearDto {
  @ApiPropertyOptional({ description: 'Mes de la consulta', example: 1 })
  @IsString()
  month: string

  @ApiPropertyOptional({ description: 'Año de la consulta', example: 2025 })
  @IsString()
  year: string
}
