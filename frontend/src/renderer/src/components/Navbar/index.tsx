import { ChangeTheme } from '../Theme'
import { GradientTitle } from '../GradientTitle'
import { NavbarUserOptions } from './NavbarUserOptions'

export const NavbarMain = () => {
  return (
    <nav className='w-full flex items-center justify-between pr-2'>
      <GradientTitle title={'VITALCARE'} />
      <div className='flex gap-4 items-center'>
        <ChangeTheme />
        <NavbarUserOptions />
      </div>
    </nav>
  )
}
