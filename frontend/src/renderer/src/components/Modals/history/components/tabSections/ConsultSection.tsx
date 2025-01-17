import React from 'react'
import { TabTable } from '../TabTable'
import { RootState } from '@renderer/store'
import { setTabData, setColumns } from '@renderer/features/tablePerTabSlice'
import { useDispatch, useSelector } from 'react-redux'
import { reqGetAllConsultsByPatientId } from '@renderer/api/Requests'

export const ConsultSection = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.tablePerTab)
  const tab = table.currentTab
  const currentPatientId = useSelector((state: RootState) => state.users.currentUserIdEdit)

  React.useEffect(() => {
    const columns = [
      { uid: 'doctor', title: 'Doctor' },
      { uid: 'reason', title: 'Razón' },
      { uid: 'date', title: 'Fecha' },
    ]
    dispatch(setColumns(columns))

    reqGetAllConsultsByPatientId(currentPatientId)
      .then((res) => {
        const data = res.data
        console.log(data)
        dispatch(setTabData({ tab, data }))
      })
      .catch(console.log)
  }, [table.currentTab])

  return <TabTable />
}
