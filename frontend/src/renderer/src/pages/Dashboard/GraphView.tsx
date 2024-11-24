import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { ColorType, createChart } from 'lightweight-charts'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

const ChartComponent = ({ data, colors }) => {
  const chartContainerRef: any = React.useRef()
  const theme = localStorage.getItem('theme')

  React.useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

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
  const graphList = [
    {
      title: 'Frecuencia de pacientes',
      colors: {
        backgroundColor: 'transparent',
        lineColor: '#007BFF', // Dark blue
        textColor: '#71717a',
        areaTopColor: '#007BFF', // Dark blue
        areaBottomColor: 'rgba(0, 123, 255, 0.1)', // Light blue with opacity
      },
      initialData: [
        { time: '2018-12-22', value: 1 },
        { time: '2018-12-23', value: 2 },
        { time: '2018-12-24', value: 3 },
        { time: '2018-12-25', value: 5 },
        { time: '2018-12-26', value: 4 },
        { time: '2018-12-27', value: 5 },
        { time: '2018-12-28', value: 6 },
        { time: '2018-12-29', value: 7 },
        { time: '2018-12-30', value: 6 },
        { time: '2018-12-31', value: 7 },
      ],
    },
    {
      title: 'Frecuencia de personal',
      colors: {
        backgroundColor: 'transparent',
        lineColor: '#4C9EFF', // Turquoise
        textColor: '#71717a',
        areaTopColor: '#4C9EFF', // Turquoise
        areaBottomColor: 'rgba(76, 159, 255, 0.1)', // Light turquoise with opacity
      },
      initialData: [
        { time: '2018-12-22', value: 1 },
        { time: '2018-12-23', value: 2 },
        { time: '2018-12-24', value: 3 },
        { time: '2018-12-25', value: 5 },
        { time: '2018-12-26', value: 5 },
        { time: '2018-12-27', value: 3 },
        { time: '2018-12-28', value: 7 },
        { time: '2018-12-29', value: 7 },
        { time: '2018-12-30', value: 9 },
        { time: '2018-12-31', value: 8 },
      ],
    },
  ]

  return (
    <div className='flex gap-4'>
      <Card className='w-full'>
        <CardHeader>
          <h3 className='font-medium'>Resumen de estadísticas</h3>
        </CardHeader>
        <CardBody className='flex items-center'>
          <PieChart
            style={{ maxWidth: '220px' }}
            data={[
              { title: 'One', value: 10, color: 'rgba(160, 214, 255)' },
              { title: 'Two', value: 15, color: 'rgba(76, 159, 255, 0.28)' },
              { title: 'Three', value: 20, color: 'rgba(0, 123, 255' },
            ]}
          />
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
