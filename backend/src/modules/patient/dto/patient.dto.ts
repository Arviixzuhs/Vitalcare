import { Gender, Status } from '@prisma/client'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class PatientDto {
  @ApiProperty({ description: 'CI del paciente', example: '123456789' })
  @IsString()
  @MaxLength(30)
  CI: string

  @ApiProperty({ description: 'Edad del paciente', example: 30 })
  @IsInt()
  age: number

  @ApiProperty({ description: 'Nombre del paciente', example: 'Jane' })
  @IsString()
  @MaxLength(30)
  name: string

  @ApiProperty({ description: 'Correo electrónico del paciente', example: 'jane@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ description: 'Estado del paciente', enum: Status, example: Status.ALIVE })
  @IsEnum(Status)
  status: Status

  @ApiProperty({ description: 'Género del paciente', enum: Gender, example: Gender.FEMALE })
  @IsEnum(Gender)
  gender: Gender

  @ApiPropertyOptional({
    description: 'Avatar del paciente',
    example: 'http://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  avatar?: string

  @ApiProperty({ description: 'Apellido del paciente', example: 'Doe' })
  @IsString()
  @MaxLength(30)
  lastName: string

  @ApiPropertyOptional({ description: 'Descripción del paciente', example: 'Paciente regular' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  description?: string

  @ApiPropertyOptional({ description: 'Razón de entrada', example: 'Dolor abdominal' })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  reasonEntry?: string

  @ApiPropertyOptional({ description: 'Razón de muerte', example: 'Infarto' })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  reasonDeath?: string
}
