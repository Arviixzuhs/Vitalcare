import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Gender } from '@prisma/client'

export class EditClinicalStaffDto {
  @ApiProperty({ description: 'Edad del miembro del personal clínico', example: 35 })
  @IsInt()
  @IsOptional()
  age?: number

  @ApiProperty({ description: 'Nombre del miembro del personal clínico', example: 'John' })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  name?: string

  @ApiProperty({ description: 'Apellido del miembro del personal clínico', example: 'Doe' })
  @IsString()
  @MaxLength(30)
  lastName: string

  @ApiProperty({ description: 'CI del miembro del personal clínico', example: '123456789' })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  CI?: string

  @ApiPropertyOptional({ description: 'Placa del carro', example: 'ABC-1234' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  placaCarro?: string

  @ApiPropertyOptional({ description: 'Número de hijos', example: '2' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  numeroHijos?: string

  @ApiPropertyOptional({ description: 'Área de trabajo', example: 'Pediatría' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  area?: string

  @ApiProperty({
    description: 'Género del miembro del personal clínico',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender

  @ApiPropertyOptional({ description: 'Estado jubilado', example: 'No' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  jubilados?: string

  @ApiPropertyOptional({ description: 'Estado egresado', example: 'Sí' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  egresados?: string

  @ApiPropertyOptional({ description: 'Talla de camisas', example: 'L' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  tallaCamisas?: string

  @ApiPropertyOptional({ description: 'Dependencias', example: 'Laboratorio' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  dependencias?: string

  @ApiPropertyOptional({ description: 'Cargo nominal', example: 'Doctor' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  cargoNominal?: string

  @ApiPropertyOptional({ description: 'Teléfono', example: '+123456789' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string

  @ApiPropertyOptional({ description: 'Correo electrónico', example: 'doctor@example.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(30)
  email?: string

  @ApiPropertyOptional({ description: 'Dirección', example: '123 Main St' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  address?: string

  @ApiPropertyOptional({ description: 'URL del avatar', example: 'http://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  avatar?: string
}
