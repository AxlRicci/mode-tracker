import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import { ReactComponent as Icon } from '../../assets/info.svg';

import { locationListWithAdditionalData } from '../../firebase/firebase.utils';

const LocationList = ({ history }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(null);
  const [tooltipShow, setTooltipShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    const getAndSetLocationList = async () => {
      setLoading(true);
      const locationList = await locationListWithAdditionalData();
      setLocations(locationList);
      setLoading(false);
    };
    getAndSetLocationList();
  }, []);

  return (
    <Container className="p-0">
      {!loading ? (
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Address</th>
              <th>
                Active Score{' '}
                <Icon
                  ref={target}
                  onClick={() => setTooltipShow(!tooltipShow)}
                  style={{
                    width: '15px',
                    height: '15px',
                    lineHeight: '0',
                    cursor: 'pointer',
                    fill: '#555',
                  }}
                />
                <Overlay
                  target={target.current}
                  placement="top"
                  show={tooltipShow}
                >
                  {(props) => {
                    const {
                      arrowProps,
                      placement,
                      popper,
                      ref,
                      show,
                      style,
                    } = props;
                    return (
                      <Tooltip
                        id="active-score-tooltip"
                        arrowProps={arrowProps}
                        placement={placement}
                        popper={popper}
                        ref={ref}
                        show={show}
                        style={style}
                      >
                        The active score is the percentage of students who bike,
                        walk or roll to school.
                      </Tooltip>
                    );
                  }}
                </Overlay>
              </th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr
                key={location.locationId}
                onClick={() => history.push(`/location/${location.locationId}`)}
              >
                <td>{location.locationName}</td>
                <td className="d-none d-md-table-cell">
                  {location.locationAddress}
                </td>
                <td>
                  {location.totals.activeScore
                    ? `${location.totals.activeScore}%`
                    : 'No Data'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Container
          className="d-flex align-items-center justify-content-center"
          fluid
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </Container>
  );
};

LocationList.propTypes = {
  history: propTypes.object,
  arrowProps: propTypes.object,
  placement: propTypes.string,
  popper: propTypes.object,
  ref: propTypes.object,
  show: propTypes.bool,
  style: propTypes.object,
};

export default withRouter(LocationList);
