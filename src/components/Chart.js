import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'
import {dataQuery, heartBeatQuery} from '../graphQLQueries/index'
import Chart from 'react-apexcharts';

const Graph = () => {

    const grabMetric = useSelector( state => state.measurements.selectedMetrics)
    const { error: heartBeatError, data: heartBeatData } = useQuery(heartBeatQuery);
    let input = []
    input = grabMetric.map(metricName => ({
      metricName: metricName.value,
      after: new Date(heartBeatData.heartBeat - 1800000).getTime()
    }));

    const { loading, error, data } = useQuery(dataQuery, {
      variables: {input},
      pollInterval: 1300
  })

  const dispatch = useDispatch()
  useEffect(() => {
    if (!data || error) return
    
      const {getMultipleMeasurements} = data
      dispatch({type: "METRICS_RECEIVED", payload: getMultipleMeasurements })

},[data, error, dispatch])
    
const grabMetricData = useSelector(state => state.measurements.metricData)

    if (loading) return <p>Loading... </p>
    if (error) return <p> ${error.message}</p>
 
    let chartData = []
    let yAxisConfig = []
    let metric_unitSet = new Set()
  
    grabMetricData.forEach(metricData => {
      let datapoints = []
     let  measures = metricData.measurements
      measures.forEach(record => {
        let pair = [record.at, record.value]
        datapoints.push(pair)
        if (!metric_unitSet.has(record.unit)) {
          metric_unitSet.add(record.unit)
          yAxisConfig.push({
            seriesName: record.unit === 'F' ? 'Temp' : record.unit === 'PSI' ? 'Pressure' : 'injValveOpen',
            title: {
              text: record.unit === 'F' ? 'Temp' : record.unit === 'PSI' ? 'Pressure' : 'injValveOpen',
            },
            axisBorder: {
              show: true,
            },
            axisTicks: {
              show: true,
            },
          });
        }
      })
  
      chartData.push({
        name: metricData.metric,
        data: datapoints,
      })
    })
  
    if (grabMetric.length === 0) {
      return null;
    }
  
    return (
      <div style={{margin: '2rem '}}>
        <Chart
          options={{
            chart: {
              stacked: false,
              zoom: {
                type: 'x',
                enabled: true,
              },
              toolbar: {
                autoSelected: 'zoom',
              },
            },
            plotOptions: {
              line: {
                curve: 'smooth',
              },
            },
            dataLabels: {
              enabled: false,
            },
  
            markers: {
              size: 0,
              style: 'full',
            },
            title: {
              text: 'Metric measurements',
              align: 'left',
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
              },
            },
            yaxis:
              yAxisConfig.length !== 0
                ? yAxisConfig
                : {
                    title: {
                      text: 'Value',
                    },
                    axisBorder: {
                      show: true,
                    },
                    axisTicks: {
                      show: true,
                    },
                  },
            xaxis: {
              type: 'datetime',
            },
          }}
          series={chartData}
          type="area"
          height="450"
          width="1000"
        />
      </div>
    )
  }

export default Graph
