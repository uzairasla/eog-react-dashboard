import React from 'react';
import MetricsDisplayBox from './MetricDisplayBox';
import { useSelector } from 'react-redux';

const MetricsListed = () => {
  const selected_metrics = useSelector(state => state.measurements.selectedMetrics)

  if (selected_metrics.length === 0) {
    return <h3 style={{margin: '0 auto'}}>Please select metrics to view</h3>
  }
  return (
    <div>
      {selected_metrics.map((metric, i) => {
        return <MetricsDisplayBox key={i} metricName={metric.value} />
      })}
    </div>
  )
}
export default MetricsListed