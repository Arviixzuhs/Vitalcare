import { Sidebar } from '@renderer/components/Sidebar'
import { Tab, Tabs } from '@nextui-org/react'
import { NavbarMain } from '@renderer/components/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const PageLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (path: string) => navigate(path)

  const tabs = [
    {
      title: 'Inicio',
      key: '/',
    },
    {
      title: 'Pacientes',
      key: '/patient',
    },
    {
      title: 'Personal',
      key: '/staff',
    },
    {
      title: 'Consultas',
      key: '/consult',
    },
  ]

  return (
    <div className='flex items-center content-center p-4 w-full h-screen'>
      <main className='w-full h-full flex flex-col gap-2'>
        <NavbarMain />
        <div className='flex flex-col gap-3 w-full h-full'>
          <div className='flex gap-4 h-full'>
            <Sidebar />
            <div className='flex w-full h-full flex-col select-none gap-4'>
              <Tabs
                aria-label='Options'
                color='primary'
                variant='underlined'
                selectedKey={location.pathname}
                onSelectionChange={(e) => handleNavigate(`${e}`)}
              >
                {tabs.map((item) => (
                  <Tab key={item.key} title={item.title} className='pb-0' />
                ))}
              </Tabs>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
