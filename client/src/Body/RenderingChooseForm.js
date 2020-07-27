import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const styles = {
  form: {
    position: 'fixed',
    top: 'inherit ',
    right: '0',
    zIndex: 999,
    padding: 20,
    borderRadius: 30,
  },
};

function RenderingChooseForm({ changeRenderingType, changeUrl }) {
  const [fromDate, setFromDate] = useState('2017-10-23');
  const [toDate, setToDate] = useState('2018-10-23');
  const [cloudiness, setCloudiness] = useState(20);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(fromDate, toDate, cloudiness);
    const url = `https://services.sentinel-hub.com/ogc/wms/501e9445-5b62-41ab-b1d2-209ce2878130?TIME=${fromDate}/${toDate}&MAXCC=${cloudiness}`;
    changeUrl(url);
  };

  return (
    <Form style={styles.form} className="bg-white" onSubmit={submitHandler}>
      <Form.Group onChange={(event) => changeRenderingType(event.target.value)}>
        <Form.Label>Rendering</Form.Label>
        <Form.Check
          type="radio"
          label="Natural color (true color)"
          name="rendering"
          id="TRUE_COLOR"
          value="TRUE_COLOR"
          defaultChecked
        />
        <Form.Check
          type="radio"
          label="NDVI"
          name="rendering"
          id="NDVI"
          value="NDVI"
        />
        <Form.Check
          type="radio"
          label="False color (urban)"
          name="rendering"
          id="FALSE_COLOR_URBAN"
          value="FALSE_COLOR_URBAN"
        />
        <Form.Check
          type="radio"
          label="Bathymetric"
          name="rendering"
          id="BATHYMETRIC"
          value="BATHYMETRIC"
        />
        <Form.Check
          type="radio"
          label="Moisture Index"
          name="rendering"
          id="MOISTURE_INDEX"
          value="MOISTURE_INDEX"
        />
        <Form.Check
          type="radio"
          label="False color (vegetation)"
          name="rendering"
          id="FALSE_COLOR"
          value="FALSE_COLOR"
        />
        <Form.Check
          type="radio"
          label="Agriculture"
          name="rendering"
          id="AGRICULTURE"
          value="AGRICULTURE"
        />
        <Form.Check
          type="radio"
          label="Geology"
          name="rendering"
          id="GEOLOGY"
          value="GEOLOGY"
        />
        <Form.Check
          type="radio"
          label="SWIR"
          name="rendering"
          id="SWIR"
          value="SWIR"
        />
      </Form.Group>
      <Form.Group className="bg-white">
        <label htmlFor="from">From:</label>
        <input
          value={fromDate}
          onChange={(event) => {
            setFromDate(event.target.value);
          }}
          id="from"
          type="text"
          name="name"
          size="10"
        />
        <label htmlFor="to"> To:</label>
        <input
          value={toDate}
          onChange={(event) => {
            setToDate(event.target.value);
          }}
          id="to"
          type="text"
          name="name1"
          size="10"
        />{' '}
        <p />
        <label htmlFor="cloud">Cloudiness:</label>
        <input
          onChange={(event) => {
            setCloudiness(event.target.value);
          }}
          value={cloudiness}
          id="cloud"
          type="range"
          name="name2"
          min="0"
          max="100"
        />{' '}
        <p />
        <Button type="submit">Нажми меня</Button>
      </Form.Group>
    </Form>
  );
}

RenderingChooseForm.propTypes = {
  changeRenderingType: PropTypes.func.isRequired,
  changeUrl: PropTypes.func.isRequired,
};

export default RenderingChooseForm;
