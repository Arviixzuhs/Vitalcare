import { TelescopeIcon } from 'lucide-react'

export const EmptyTableContent = () => {
  return (
    <div className='w-full flex justify-center flex-col items-center'>
      <TelescopeIcon size={60} color='#71717a' />
      <p className='default-text-color'>Sin registros</p>
      <p className='text-gray-400'>Los registros guardados se verán aquí</p>
    </div>
  )
}
