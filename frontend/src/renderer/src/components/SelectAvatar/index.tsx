import React from 'react'
import { Camera } from 'lucide-react'
import { useCurrentAvatarFile } from '@renderer/hooks/useCurrentAvatarFile'
import toast from 'react-hot-toast'

interface SelectAvatarProps {
  defaultAvatarURL?: string | undefined
}

export const SelectAvatar: React.FC<SelectAvatarProps> = ({ defaultAvatarURL }) => {
  const { setCurrentAvatarFile } = useCurrentAvatarFile()
  const [previewURL, setPreviewURL] = React.useState<string | null>(defaultAvatarURL || null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        setCurrentAvatarFile(file)
        const newPreviewURL = URL.createObjectURL(file)
        setPreviewURL(newPreviewURL)
      } else {
        toast.error('Solo se permiten imágenes')
      }
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='default-text-color text-sm'>Avatar</h3>
      <label htmlFor='selectAvatar' className='default-text-color cursor-pointer'>
        <div className='relative hover:opacity-75 transition overflow-hidden border rounded-2xl border-dashed w-28 h-28 justify-center flex items-center'>
          <Camera className='default-text-color z-50 absolute' />
          {previewURL && (
            <img src={previewURL} alt='Avatar Preview' className='w-full h-full object-cover' />
          )}
        </div>
      </label>
      <input
        type='file'
        id='selectAvatar'
        className='hidden'
        accept='image/*'
        onChange={onChange}
      />
    </div>
  )
}
