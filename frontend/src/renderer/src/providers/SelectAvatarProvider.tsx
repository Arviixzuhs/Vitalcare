import React from 'react'

export interface CurrentAvatarFile {
  currentAvatarFile: null | File
  setCurrentAvatarFile: React.Dispatch<React.SetStateAction<null | File>>
}

export const CurrentAvatarFileContext = React.createContext<CurrentAvatarFile>({
  currentAvatarFile: null,
  setCurrentAvatarFile: () => {},
})

interface CurrentAvatarFileProviderProps {
  children: React.ReactNode
}

export const CurrentAvatarFileProvider: React.FC<CurrentAvatarFileProviderProps> = ({
  children,
}) => {
  const [currentAvatarFile, setCurrentAvatarFile] = React.useState<null | File>(null)

  return (
    <CurrentAvatarFileContext.Provider value={{ currentAvatarFile, setCurrentAvatarFile }}>
      {children}
    </CurrentAvatarFileContext.Provider>
  )
}
