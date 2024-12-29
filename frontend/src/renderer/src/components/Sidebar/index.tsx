import React from 'react'
import { Card } from '@nextui-org/react'
import { logOut } from '@renderer/utils/logOut'
import { useNavigate } from 'react-router-dom'
import { Listbox, ListboxItem } from '@nextui-org/react'
import {
  FaCode,
  FaCog,
  FaHome,
  FaUsers,
  FaCalendar,
  FaDoorOpen,
  FaLightbulb,
  FaUserShield,
  FaChevronRight,
} from 'react-icons/fa'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const hospitalData = useSelector((state: RootState) => state.hospital)
  const handleNavigate = (path: string) => navigate(path)

  const IconWrapper = ({
    children,
    className = '',
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div className={`flex items-center rounded-small justify-center text-lg ${className}`}>
      {children}
    </div>
  )

  const ItemCounter = ({ number }: { number: number }) => (
    <div className='flex items-center gap-1 text-default-400'>
      <span className='text-small'>{number}</span>
      <FaChevronRight className='text-xs' />
    </div>
  )

  return (
    <Card className='overflow-visible min-w-[220px] h-full'>
      <Listbox
        aria-label='User Menu'
        onAction={(key) => (key == 'logOut' ? logOut() : handleNavigate(key as string))}
        className=''
        itemClasses={{
          base: 'px-3 last:rounded-b-medium gap-3 h-12',
        }}
      >
        <ListboxItem
          key='/'
          style={{ background: location.pathname == '/' ? 'var(--cardBg)' : '' }}
          showDivider
          startContent={
            <IconWrapper>
              <FaHome className='text-primary' />
            </IconWrapper>
          }
        >
          Inicio
        </ListboxItem>
        <ListboxItem
          key='/patient'
          style={{ background: location.pathname == '/patient' ? 'var(--cardBg)' : '' }}
          endContent={<ItemCounter number={hospitalData.patients} />}
          startContent={
            <IconWrapper>
              <FaUsers className='text-secondary' />
            </IconWrapper>
          }
        >
          Pacientes
        </ListboxItem>
        <ListboxItem
          key='/staff'
          style={{ background: location.pathname == '/staff' ? 'var(--cardBg)' : '' }}
          endContent={<ItemCounter number={hospitalData.clinicalStaffs} />}
          startContent={
            <IconWrapper>
              <FaUserShield className='text-warning' />
            </IconWrapper>
          }
        >
          Personal
        </ListboxItem>
        <ListboxItem
          key='/consult'
          style={{ background: location.pathname == '/consult' ? 'var(--cardBg)' : '' }}
          endContent={<ItemCounter number={hospitalData.consults} />}
          showDivider
          startContent={
            <IconWrapper className='text-default-400'>
              <FaCalendar className='text-success' />
            </IconWrapper>
          }
        >
          Consultas
        </ListboxItem>
        <ListboxItem
          key='contributors'
          isReadOnly
          startContent={
            <IconWrapper className='text-default-400'>
              <FaCode />
            </IconWrapper>
          }
        >
          Reportes
        </ListboxItem>
        <ListboxItem
          key='releases'
          className='group h-auto py-3'
          showDivider
          isReadOnly
          startContent={
            <IconWrapper className='text-default-400'>
              <FaLightbulb />
            </IconWrapper>
          }
          textValue='Versión'
        >
          <div className='flex flex-col gap-1'>
            <div className='px-2 py-0.5 rounded-small bg-default-100 '>
              <span className='text-tiny text-default-600'>Vitalcare@0.0.1</span>
              <div className='flex gap-2 text-tiny'>
                <span className='text-default-500'>07/06/2024</span>
                <span className='text-success'>Latest</span>
              </div>
            </div>
          </div>
        </ListboxItem>
        <ListboxItem
          isReadOnly
          key='watchers'
          startContent={
            <IconWrapper className='text-default-400'>
              <FaCog className='text-lg' />
            </IconWrapper>
          }
        >
          Configuración
        </ListboxItem>
        <ListboxItem
          key='logOut'
          className='text-danger'
          color='danger'
          startContent={
            <IconWrapper>
              <FaDoorOpen className='text-lg' />
            </IconWrapper>
          }
        >
          Cerrar sesión
        </ListboxItem>
      </Listbox>
    </Card>
  )
}
