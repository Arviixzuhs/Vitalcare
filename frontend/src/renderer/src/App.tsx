import Router from './routes'
import { NotificationToast } from './components/Notification'
import './styles/theme.scss'
import './styles/webkit.scss'
import './styles/style.css'

function App(): JSX.Element {
  return (
    <>
      <NotificationToast />
      <Router />
    </>
  )
}

export default App