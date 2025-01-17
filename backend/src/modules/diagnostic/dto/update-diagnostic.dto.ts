import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, IsOptional } from 'class-validator'

export class UpdateDiagnosticDto {
  @ApiProperty({ description: 'Condición diagnóstica', example: 'Neumonía', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(280)
  condition?: string

  @ApiProperty({
    description: 'Descripción del diagnóstico',
    example: 'Paciente presenta dificultad para respirar',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(280)
  description?: string
}
