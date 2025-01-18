import { TelescopeIcon } from 'lucide-react'

interface EmptyContentProps {
  title?: string
  description?: string
}

export const EmptyContent = ({
  title = 'Sin registros',
  description = 'Los registros guardados se verán aquí',
}: EmptyContentProps) => {
  return (
    <div className='w-full flex justify-center flex-col items-center h-full'>
      <TelescopeIcon size={60} color='#71717a' />
      <p className='default-text-color'>{title}</p>
      <p className='text-gray-400'>{description}</p>
    </div>
  )
}
