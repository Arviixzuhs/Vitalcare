import { Tab, Tabs } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { NoteSection } from './tabSections/NoteSection'
import { DriveSection } from './tabSections/DriveSection'
import { setCurrentTab } from '@renderer/features/tablePerTabSlice'
import { ConsultSection } from './tabSections/ConsultSection'
import { DiagnosticSection } from './tabSections/DiagnosticSection'

export const HistoryTabs = () => {
  const dispatch = useDispatch()

  const tabs = [
    {
      id: 'notes',
      label: 'Notas',
      content: <NoteSection />,
    },
    {
      id: 'diagnostics',
      label: 'Diagnosticos',
      content: <DiagnosticSection />,
    },
    {
      id: 'files',
      label: 'Archivos',
      content: <DriveSection />,
    },
    {
      id: 'consults',
      label: 'Consultas',
      content: <ConsultSection />,
    },
  ]

  return (
    <div className='flex w-full flex-col'>
      <Tabs
        aria-label='Dynamic tabs'
        items={tabs}
        className='select-none'
        onSelectionChange={(tab) => dispatch(setCurrentTab(tab))}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
