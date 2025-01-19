import { GraphView } from './GraphView'
import { DashboardHeader } from './Header'
import { ConsultsToDayModal } from './Modals/ConsultsToDayModal'

export const Dashboard = () => {
  return (
    <div className='flex flex-col gap-4 h-full'>
      <DashboardHeader />
      <GraphView />
      <ConsultsToDayModal />
    </div>
  )
}
