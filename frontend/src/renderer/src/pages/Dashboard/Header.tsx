import toast from 'react-hot-toast'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody } from '@nextui-org/react'
import { useModal, modalTypes } from '@renderer/hooks/useModal'
import { FaUserShield, FaCalendar, FaUsers, FaCalendarDay } from 'react-icons/fa'

export const DashboardHeader = () => {
  const navigate = useNavigate()
  const hospitalData = useSelector((state: RootState) => state.hospital)
  const [_, toggleViewConsultsToDay] = useModal(modalTypes.viewConsultsToDay)

  const cards = [
    {
      title: 'Pacientes',
      value: hospitalData?.patients,
      onPress: () => navigate('/patient'),
      icon: <FaUsers />,
    },
    {
      title: 'Personal',
      value: hospitalData?.clinicalStaffs,
      onPress: () => navigate('/staff'),
      icon: <FaUserShield />,
    },
    {
      title: 'Consultas para hoy',
      value: hospitalData?.consultsToDay,
      onPress: () => {
        if (hospitalData.consultsToDay === 0) {
          toast.error('No hay consultas para hoy')
          return
        }
        toggleViewConsultsToDay()
      },
      icon: <FaCalendarDay />,
    },
    {
      title: 'Consultas',
      value: hospitalData?.consults,
      onPress: () => navigate('/consult'),
      icon: <FaCalendar />,
    },
  ]

  return (
    <div className='flex flex-col sm:flex-row gap-4'>
      {cards.map((item, index) => (
        <div onClick={() => item.onPress()} key={index} className='w-full cursor-pointer'>
          <Card className='w-full' shadow='none'>
            <CardBody>
              <span className='w-fit text-[#006fee] p-[10px] text-[30px] rounded-md bg-[var(--cardBg)]'>
                {item.icon}
              </span>
              <div className='flex flex-col'>
                <h3 className='font-medium text-nowrap'>{item.title}</h3>
                <span className='text-small text-default-500'>{item.value}</span>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  )
}
