import { ReactNode } from 'react'

export interface DropdownItemInteface {
  key: string
  title: string
  onPress: (args: number) => Promise<void> | void
  startContent?: ReactNode | undefined
}
