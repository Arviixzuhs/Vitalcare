import { Gender } from '@prisma/client'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class ClinicalStaffDto {
  @ApiPropertyOptional({ description: 'URL del avatar', example: 'http://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  avatar?: string

  @ApiProperty({ description: 'Nombre del miembro del personal clínico', example: 'John' })
  @IsString()
  @MaxLength(30)
  name: string

  @ApiProperty({ description: 'Apellido del miembro del personal clínico', example: 'Doe' })
  @IsString()
  @MaxLength(30)
  lastName: string

  @ApiPropertyOptional({ description: 'Correo electrónico', example: 'doctor@example.com' })
  @IsEmail()
  @MaxLength(254)
  email?: string

  @ApiProperty({ description: 'CI del miembro del personal clínico', example: '123456789' })
  @IsString()
  @MaxLength(30)
  CI: string

  @ApiProperty({ description: 'Edad del miembro del personal clínico', example: 35 })
  @IsInt()
  age: number

  @ApiPropertyOptional({ description: 'Teléfono', example: '+123456789' })
  @IsString()
  @MaxLength(30)
  phone?: string

  @ApiPropertyOptional({ description: 'Dirección', example: '123 Main St' })
  @IsString()
  @MaxLength(180)
  address?: string

  @ApiPropertyOptional({ description: 'Cargo nominal', example: 'Doctor' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  cargoNominal?: string

  @ApiPropertyOptional({ description: 'Dependencias', example: 'Laboratorio' })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  dependencias?: string

  @ApiPropertyOptional({ description: 'Talla de camisas', example: 'L' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  tallaCamisas?: string

  @ApiPropertyOptional({ description: 'Estado egresado', example: 'Sí' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  egresados?: string

  @ApiPropertyOptional({ description: 'Número de hijos', example: '2' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  numeroHijos?: string

  @ApiPropertyOptional({ description: 'Placa del carro', example: 'ABC-1234' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  placaCarro?: string

  @ApiPropertyOptional({ description: 'Estado jubilado', example: 'No' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  jubilados?: string

  @ApiProperty({
    description: 'Género del miembro del personal clínico',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender

  @ApiPropertyOptional({ description: 'Área de trabajo', example: 'Pediatría' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  area?: string

  @ApiPropertyOptional({ description: 'URL del avatar', example: 'http://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  ubicacionFiscal?: string
}
