import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class SearchClinicalStaffDto {
  @ApiProperty({ description: 'Nombre del doctor', example: 'Victor' })
  @IsString()
  @MaxLength(30)
  name: string
}
