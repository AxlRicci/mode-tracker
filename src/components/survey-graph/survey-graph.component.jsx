import React from 'react';
import propTypes from 'prop-types';

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

import { ReactComponent as Bike } from '../../assets/bike.svg';
import { ReactComponent as Walk } from '../../assets/walk.svg';
import { ReactComponent as Roll } from '../../assets/roll.svg';
import { ReactComponent as PublicTrans } from '../../assets/publicTrans.svg';
import { ReactComponent as Schoolbus } from '../../assets/schoolbus.svg';
import { ReactComponent as Car } from '../../assets/car.svg';

const CustomizedLabel = ({ x, y, payload }) => {
  switch (payload.value) {
    case 'bike':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <Bike
            width="35"
            height="35"
            x={-40}
            y={-17.5}
            dy={0}
            textAnchor="middle"
          />
        </g>
      );
    case 'walk':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <Walk
            width="25"
            height="25"
            x={-30}
            y={-12.5}
            dy={0}
            textAnchor="middle"
          />
        </g>
      );
    case 'roll':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <Roll
            width="30"
            height="30"
            x={-35}
            y={-15}
            dy={0}
            textAnchor="middle"
          />
        </g>
      );
    case 'schoolbus':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <Schoolbus
            width="40"
            height="40"
            x={-45}
            y={-20}
            dy={0}
            textAnchor="middle"
          />
        </g>
      );
    case 'publicTrans':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <PublicTrans
            width="35"
            height="35"
            x={-40}
            y={-17.5}
            dy={0}
            textAnchor="middle"
          />
        </g>
      );
    case 'car':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <Car
            width="35"
            height="35"
            x={-40}
            y={-17.5}
            dy={0}
            textAnchor="middle"
          />
        </g>
      );
    default:
      return (
        <g transform={`translate(${x}, ${y})`}>
          <Car
            width="25"
            height="25"
            x={-30}
            y={-12.5}
            dy={0}
            textAnchor="middle"
          />
        </g>
      );
  }
};

const SurveyGraph = ({ additionalClasses, survey }) => (
  <ResponsiveContainer
    className={`${additionalClasses}`}
    width="100%"
    height={215}
  >
    <BarChart layout="vertical" data={survey} barCategoryGap="1">
      <YAxis dataKey="name" type="category" tick={<CustomizedLabel />} />
      <XAxis type="number" />
      <Bar dataKey="value" label={{ fill: 'white' }} />
    </BarChart>
  </ResponsiveContainer>
);

CustomizedLabel.propTypes = {
  payload: propTypes.object,
  x: propTypes.number,
  y: propTypes.number,
};

SurveyGraph.propTypes = {
  additionalClasses: propTypes.string,
  survey: propTypes.array,
};

export default SurveyGraph;
