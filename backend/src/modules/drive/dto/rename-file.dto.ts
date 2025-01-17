import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RenameFileDto {
  @ApiProperty({
    description: 'Nuevo nombre para el archivo',
    example: 'nuevo-documento.pdf',
  })
  @IsString()
  newName: string
}
