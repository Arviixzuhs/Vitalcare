import { GraphView } from './GraphView'
import { DashboardHeader } from './Header'

export const Dashboard = () => {
  return (
    <div className='flex flex-col gap-4 h-full'>
      <DashboardHeader />
      <GraphView />
    </div>
  )
}
