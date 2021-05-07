import React from 'react';
import MetricsCard from './MetricsCard';
import { useQuery } from '@apollo/client';
import { lastKnowMeasurementQuery } from '../graphQLQueries/index';

function Metrics({ metricName }) {
  const { loading, error, data } = useQuery(lastKnowMeasurementQuery, {
    variables: { metricName },
    pollInterval: 1300,
  });

  if (loading) return <p>Metric Info is loading</p>;
  if (error) return `Error! ${error}`;

  return (
      <div style={{width: '200px', height: '100px', marginLeft: '2rem', display: 'inline-block', marginTop: '1rem'}}>
      <MetricsCard metricInfo={data && data.getLastKnownMeasurement} />
      </div>
  )
}

export default Metrics;
