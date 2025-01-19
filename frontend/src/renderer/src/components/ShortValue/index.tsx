import { Tooltip } from '@nextui-org/react'

interface ShortCellValueProps {
  value: string | undefined
  maxLength?: number
}

export const ShortValue = ({ value, maxLength = 20 }: ShortCellValueProps) => {
  if (!value) return ''

  if (value.length > maxLength) {
    return (
      <Tooltip className='default-text-color' content={value}>
        {value.slice(0, maxLength) + '...'}
      </Tooltip>
    )
  }

  return value
}
