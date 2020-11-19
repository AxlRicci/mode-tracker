import React from 'react';
import propTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

import { ReactComponent as Bike } from '../../assets/bike.svg';
import { ReactComponent as Walk } from '../../assets/walk.svg';
import { ReactComponent as Roll } from '../../assets/roll.svg';
import { ReactComponent as PublicTrans } from '../../assets/publicTrans.svg';
import { ReactComponent as Schoolbus } from '../../assets/schoolbus.svg';
import { ReactComponent as Car } from '../../assets/car.svg';

// Needs spinner but has if statement for now... fix dis plz

const SurveyTable = ({ additionalClasses, survey }) => {
  if (survey) {
    return (
      <Table className={`${additionalClasses}`} responsive>
        <thead>
          <tr>
            <th>Direction</th>
            <th>
              <Bike width="30" height="30" />
            </th>
            <th>
              <Walk width="30" height="30" />
            </th>
            <th>
              <Roll width="30" height="30" />
            </th>
            <th>
              <Schoolbus width="32" height="32" />
            </th>
            <th>
              <PublicTrans width="30" height="30" />
            </th>
            <th>
              <Car width="30" height="30" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>To School</td>
            {survey.to.map((mode) => (
              <td>{mode.value}</td>
            ))}
          </tr>
          <tr>
            <td>From School</td>
            {survey.from.map((mode) => (
              <td>{mode.value}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    );
  }
  return <p>Spinner should be here...</p>;
};

SurveyTable.propTypes = {
  additionalClasses: propTypes.string,
  survey: propTypes.object,
};

export default SurveyTable;
