import React, { useState } from 'react';
import propTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { deleteSurvey } from '../../firebase/firebase.utils';

import SurveyEditModal from '../survey-edit-modal/survey-edit-modal.component';

import { ReactComponent as Bike } from '../../assets/bike.svg';
import { ReactComponent as Walk } from '../../assets/walk.svg';
import { ReactComponent as Roll } from '../../assets/roll.svg';
import { ReactComponent as PublicTrans } from '../../assets/publicTrans.svg';
import { ReactComponent as Schoolbus } from '../../assets/schoolbus.svg';
import { ReactComponent as Car } from '../../assets/car.svg';

import './survey-table.styles.css';

// Needs spinner but has if statement for now... fix dis plz

const SurveyTable = ({ additionalClasses, survey, editable }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    direction: '',
    name: '',
    value: '',
    surveyId: '',
  });

  const handleClose = () => setShowModal(false);

  const handleClick = (event) => {
    // Add editable modal popup if survey is editable
    console.log(survey);
    setModalInfo({
      direction: event.target.attributes.getNamedItem('direction').nodeValue,
      name: event.target.name,
      value: event.target.value,
      surveyId: survey.surveyId,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    await deleteSurvey(survey.surveyId);
  };

  if (survey) {
    return (
      <Figure style={{ width: '100%' }}>
        {showModal ? (
          <SurveyEditModal
            show={showModal}
            handleClose={handleClose}
            data={modalInfo}
          />
        ) : null}
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
              {survey.data.to.map((mode) => (
                <td key={mode.name}>
                  {editable ? (
                    <button
                      className="unstyled-button"
                      type="button"
                      onClick={handleClick}
                      name={mode.name}
                      value={mode.value}
                      direction="to"
                    >
                      {mode.value}
                    </button>
                  ) : (
                    mode.value
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td>From School</td>
              {survey.data.from.map((mode) => (
                <td key={mode.name}>
                  {editable ? (
                    <button
                      className="unstyled-button"
                      type="button"
                      onClick={handleClick}
                      name={mode.name}
                      value={mode.value}
                      direction="from"
                    >
                      {mode.value}
                    </button>
                  ) : (
                    mode.value
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        {editable ? (
          <Figure.Caption className="text-center d-flex flex-column align-items-center">
            <p className="mb-1">Click or tap a table cell to edit or:</p>
            <Button onClick={handleDelete} size="sm" variant="danger">
              Delete Survey
            </Button>
          </Figure.Caption>
        ) : null}
      </Figure>
    );
  }
  return (
    <Spinner animation="boarder" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

SurveyTable.propTypes = {
  additionalClasses: propTypes.string,
  survey: propTypes.object,
  editable: propTypes.bool,
};

export default SurveyTable;
