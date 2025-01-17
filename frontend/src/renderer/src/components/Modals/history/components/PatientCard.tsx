import { Avatar } from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { Card, CardBody, Chip } from '@nextui-org/react'

export const PatientCard = () => {
  const users = useSelector((state: RootState) => state.users.data)
  const currentUserIdEdit = useSelector((state: RootState) => state.users.currentUserIdEdit)
  const currentUserEdit = users.find((item) => item.id == currentUserIdEdit)

  const statusColorMap: { [key: string]: { text: string; color: 'secondary' | 'primary' } } = {
    FEMALE: {
      text: 'Femenino',
      color: 'secondary',
    },
    MALE: {
      text: 'Masculino',
      color: 'primary',
    },
  }

  return (
    <Card shadow='none'>
      <CardBody>
        <div className='flex gap-4 items-center'>
          <Avatar src={currentUserEdit?.avatar} className='w-[80px] h-[80px]'></Avatar>
          <div className='flex gap-2 flex-col'>
            <h3>
              {currentUserEdit?.name} {currentUserEdit?.lastName}
            </h3>
            <div className='flex gap-2'>
              <Chip size='sm' variant='flat'>
                {currentUserEdit?.age} años
              </Chip>
              {currentUserEdit?.gender && (
                <Chip size='sm' variant='flat' color={statusColorMap[currentUserEdit.gender].color}>
                  {statusColorMap[currentUserEdit.gender].text}
                </Chip>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
