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

  return <MetricsCard metricInfo={data && data.getLastKnownMeasurement} />;
}

export default Metrics;
