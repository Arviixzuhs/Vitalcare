import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { ColorType, createChart } from 'lightweight-charts'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import {
  reqGetPatientsCountByDate,
  reqGetPatientsCountByGender,
  reqGetClinicalStaffCountByDate,
} from '@renderer/api/Requests'

const ChartComponent = ({ data, colors }) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null)
  const theme = localStorage.getItem('theme')

  React.useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current === null) return
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    if (chartContainerRef.current === null) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      grid: {
        vertLines: {
          color: 'transparent',
        },
        horzLines: {
          color: 'transparent',
        },
      },
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    })
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [data, colors, theme])

  return <div ref={chartContainerRef} />
}

export const GraphView = () => {
  const [patientsCount, setPatientsCount] = React.useState([])
  const [clinicalStaffsCount, setClinicalStaffsCount] = React.useState([])
  const [patientsCountByGender, setPatientCountByGender] = React.useState([])

  React.useEffect(() => {
    reqGetPatientsCountByDate()
      .then((res) => setPatientsCount(res.data))
      .catch(() => setPatientsCount([]))

    reqGetClinicalStaffCountByDate()
      .then((res) => setClinicalStaffsCount(res.data))
      .catch(() => setClinicalStaffsCount([]))

    reqGetPatientsCountByGender()
      .then((res) => {
        const formattedData = res.data.map((item) => ({
          title: `${item.gender === 'FEMALE' ? 'Mujeres' : 'Hombres'}: ${item.count}`, // Título con cantidad
          value: item.count,
          color: item.gender === 'FEMALE' ? 'rgba(160, 214, 255)' : 'rgba(0, 123, 255)',
        }))
        setPatientCountByGender(formattedData)
      })
      .catch(() => setPatientCountByGender([]))
  }, [])

  const graphList = [
    {
      title: 'Frecuencia de pacientes',
      colors: {
        backgroundColor: 'transparent',
        lineColor: '#007BFF',
        textColor: '#71717a',
        areaTopColor: '#007BFF',
        areaBottomColor: 'rgba(0, 123, 255, 0.1)',
      },
      initialData: patientsCount,
    },
    {
      title: 'Frecuencia de personal',
      colors: {
        backgroundColor: 'transparent',
        lineColor: '#4C9EFF',
        textColor: '#71717a',
        areaTopColor: '#4C9EFF',
        areaBottomColor: 'rgba(76, 159, 255, 0.1)',
      },
      initialData: clinicalStaffsCount,
    },
  ]

  return (
    <div className='flex gap-4'>
      <Card className='w-full'>
        <CardHeader>
          <h3 className='font-medium'>Resumen de estadísticas</h3>
        </CardHeader>
        <CardBody className='flex items-center'>
          <PieChart style={{ maxWidth: '220px' }} data={patientsCountByGender} />
        </CardBody>
      </Card>
      {graphList.map((item, index) => (
        <Card className='w-full' key={index}>
          <CardHeader>
            <h3 className='font-medium'>{item.title}</h3>
          </CardHeader>
          <CardBody>
            <ChartComponent data={item.initialData} colors={item.colors}></ChartComponent>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
