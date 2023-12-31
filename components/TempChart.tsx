'use client';

import { AreaChart, Card, Title } from '@tremor/react';
import React from 'react';

interface TempChartProps {
  results: Root;
}

const TempChart: React.FC<TempChartProps> = ({ results }) => {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, index) => ({
    time: Number(hour),
    'UV Index': results.hourly.uv_index[index],
    'Temperature (C)': results.hourly.temperature_2m[index],
  }));

  const dataFormatter = (number: number) => `${number} °C`;

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className='mt-6'
        data={data}
        showLegend
        index='time'
        categories={['Temperature (C)', 'UV Index']}
        colors={['yellow', 'rose']}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default TempChart;