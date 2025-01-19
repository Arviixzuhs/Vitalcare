import { Patient } from '@renderer/interfaces/patientModel'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { newParseDateWithTime } from '@renderer/utils/newParseDate'
import { Avatar, Card, CardBody, Chip, Tooltip } from '@nextui-org/react'

export const PatientCard = () => {
  const users = useSelector((state: RootState) => state.users.data)
  const currentUserIdEdit = useSelector((state: RootState) => state.users.currentUserIdEdit)
  const currentUserEdit = users.find((item) => item.id == currentUserIdEdit) as Patient

  const parsedDate = newParseDateWithTime({ date: currentUserEdit?.createdAt })
  const statusColorMap: {
    [key: string]: { text: string; color: 'secondary' | 'primary' | 'success' | 'danger' }
  } = {
    FEMALE: {
      text: 'Femenino',
      color: 'secondary',
    },
    MALE: {
      text: 'Masculino',
      color: 'primary',
    },
    ALIVE: {
      text: 'Vivo',
      color: 'success',
    },
    DEAD: {
      text: 'Fallecido',
      color: 'danger',
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
              {currentUserEdit?.status && (
                <>
                  <Tooltip
                    className='default-text-color max-w-xs'
                    content={currentUserEdit.reasonDeath}
                    isDisabled={
                      currentUserEdit.status === 'ALIVE' || currentUserEdit.reasonDeath.length === 0
                    }
                  >
                    <Chip
                      size='sm'
                      variant='flat'
                      color={statusColorMap[currentUserEdit.status].color}
                    >
                      {statusColorMap[currentUserEdit.status].text}
                    </Chip>
                  </Tooltip>
                </>
              )}
            </div>
            <div>
              {currentUserEdit.reasonEntry.length > 0 && (
                <div>
                  <p className='text-tiny'>{currentUserEdit.reasonEntry}</p>
                </div>
              )}
              <p className='text-tiny text-foreground-400'>
                Ingrso: {parsedDate.date} a las {parsedDate.time}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
