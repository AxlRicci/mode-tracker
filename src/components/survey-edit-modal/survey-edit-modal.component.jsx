import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { updateSurveyData } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

const SurveyEditModal = ({ show, handleClose, data }) => {
  const [modalData, setModalData] = useState({
    direction: '',
    name: '',
    value: 0,
    surveyId: '',
  });

  const handleChange = (event) =>
    setModalData({ ...modalData, value: event.target.value });

  const handleSubmit = async () => {
    await updateSurveyData(modalData.surveyId, modalData);
  };

  useEffect(() => {
    setModalData(data);
  }, [data]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit survey entry: </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Mode:</strong> {modalData.name}
        </p>
        <p>
          <strong>Direction:</strong> {modalData.direction} school
        </p>
        <FormInput
          type="number"
          name={modalData.name}
          value={modalData.value}
          handleChange={handleChange}
          min={0}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SurveyEditModal.propTypes = {
  show: propTypes.bool,
  data: propTypes.object,
  handleClose: propTypes.func,
};

export default SurveyEditModal;