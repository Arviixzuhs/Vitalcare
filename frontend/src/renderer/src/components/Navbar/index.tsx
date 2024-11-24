import { ChangeTheme } from '../Theme'
import { Notification } from '../Notification'
import { GradientTitle } from '../GradientTitle'
import { NavbarUserOptions } from './NavbarUserOptions'

export const NavbarMain = () => {
  return (
    <nav className='w-full flex items-center justify-between'>
      <GradientTitle title={'VITALCARE'} />
      <div className='flex gap-4 items-center'>
        <ChangeTheme />
        <Notification />
        <NavbarUserOptions />
      </div>
    </nav>
  )
}
