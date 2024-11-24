import { Tooltip } from '@nextui-org/react'

export const ShortCellValue = ({ cellValue }: { cellValue: string }) => {
  if (!cellValue) return ''

  if (cellValue.length > 20) {
    return (
      <Tooltip className='default-text-color' content={cellValue}>
        <div>{cellValue.slice(0, 20) + '...'}</div>
      </Tooltip>
    )
  }

  return cellValue
}
