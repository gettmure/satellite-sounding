import React, { useState } from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Loader from './Loader';

const styles = {
  form: {
    position: 'fixed',
    top: 'inherit',
    right: '0',
    zIndex: 999,
    padding: 20,
    borderRadius: 30,
  },
};

function Form({ changeLayer, changeUrl, polygon }) {
  const [fromDate, setFromDate] = useState('2017-10-23');
  const [toDate, setToDate] = useState('2018-10-23');
  const [cloudiness, setCloudiness] = useState(20);
  const [layer, setLayer] = useState('TRUE_COLOR');
  const [loading, setLoading] = useState(false);

  const postPolygonBounds = async (bounds) => {
    try {
      if (!polygon.isInitialPolygon) {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:1337/api/post_polygon',
          {
            start: bounds.start,
            end: bounds.end,
            isInitialPolygon: bounds.isInitialPolygon,
            fromDate: fromDate,
            toDate: toDate,
            cloudiness: cloudiness,
          }
        );
        console.log('👉 Returned data:', response);
        setLoading(false);
        alert('Data was received successfully!');
      }
    } catch (e) {
      alert('Error! Check console.');
      console.log(`😱 Axios request failed: ${e}`);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    changeLayer(layer);
    const url = `https://services.sentinel-hub.com/ogc/wms/501e9445-5b62-41ab-b1d2-209ce2878130?LAYERS=${layer}$TIME=${fromDate}/${toDate}&MAXCC=${cloudiness}`;
    changeUrl(url);
    postPolygonBounds(polygon);
  };

  return (
    <BootstrapForm
      style={styles.form}
      className="bg-white"
      onSubmit={submitHandler}
    >
      <BootstrapForm.Group
        onChange={(event) => {
          setLayer(event.target.value);
        }}
      >
        <BootstrapForm.Label>Rendering</BootstrapForm.Label>
        <BootstrapForm.Check
          type="radio"
          label="Natural color (true color)"
          name="rendering"
          id="TRUE_COLOR"
          value="TRUE_COLOR"
          defaultChecked
        />
        <BootstrapForm.Check
          type="radio"
          label="NDVI"
          name="rendering"
          id="NDVI"
          value="NDVI"
        />
        <BootstrapForm.Check
          type="radio"
          label="False color (urban)"
          name="rendering"
          id="FALSE_COLOR_URBAN"
          value="FALSE_COLOR_URBAN"
        />
        <BootstrapForm.Check
          type="radio"
          label="Bathymetric"
          name="rendering"
          id="BATHYMETRIC"
          value="BATHYMETRIC"
        />
        <BootstrapForm.Check
          type="radio"
          label="Moisture Index"
          name="rendering"
          id="MOISTURE_INDEX"
          value="MOISTURE_INDEX"
        />
        <BootstrapForm.Check
          type="radio"
          label="False color (vegetation)"
          name="rendering"
          id="FALSE_COLOR"
          value="FALSE_COLOR"
        />
        <BootstrapForm.Check
          type="radio"
          label="Agriculture"
          name="rendering"
          id="AGRICULTURE"
          value="AGRICULTURE"
        />
        <BootstrapForm.Check
          type="radio"
          label="Geology"
          name="rendering"
          id="GEOLOGY"
          value="GEOLOGY"
        />
        <BootstrapForm.Check
          type="radio"
          label="SWIR"
          name="rendering"
          id="SWIR"
          value="SWIR"
        />
      </BootstrapForm.Group>
      <BootstrapForm.Group className="bg-white">
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
        />
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
        />
        <p />
        <Button type="submit">Apply</Button>
        {loading && <Loader></Loader>}
      </BootstrapForm.Group>
    </BootstrapForm>
  );
}

Form.propTypes = {
  changeLayer: PropTypes.func.isRequired,
  changeUrl: PropTypes.func.isRequired,
  polygon: PropTypes.object.isRequired,
};

export default Form;
