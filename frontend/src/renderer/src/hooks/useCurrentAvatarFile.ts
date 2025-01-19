import { useContext } from 'react'
import { CurrentAvatarFileContext } from '@renderer/providers/SelectAvatarProvider'

export const useCurrentAvatarFile = () => useContext(CurrentAvatarFileContext)
