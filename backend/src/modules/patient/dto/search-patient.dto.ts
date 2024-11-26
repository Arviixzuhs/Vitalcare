import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class SearchPatientDto {
  @ApiProperty({ description: 'Nombre del paciente', example: 'Jane' })
  @IsString()
  @MaxLength(30)
  name: string
}
