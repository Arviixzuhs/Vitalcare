import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsBoolean, IsUrl, IsInt, Min, Max } from 'class-validator'

export class CreateFileDto {
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'documento.pdf',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Ruta donde se almacenará el archivo',
    example: '/uploads/documents/',
  })
  @IsString()
  path: string

  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 1024,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  size?: number | null

  @ApiProperty({
    description: 'URL del archivo',
    example: 'https://example.com/uploads/documento.pdf',
  })
  @IsString()
  @IsOptional()
  fileURL: string | null

  @ApiProperty({
    description: 'Indica si el archivo es una carpeta o no',
    example: false,
  })
  @IsBoolean()
  isFolder: boolean

  @ApiProperty({
    description: 'Tipo de contenido del archivo, como "image/jpeg", "application/pdf", etc.',
    example: 'application/pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  contentType?: string
}
