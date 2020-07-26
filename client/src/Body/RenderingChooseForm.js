import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

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

function RenderingChooseForm({ changeRenderingType }) {
  return (
    <Form.Group
      onChange={(event) => changeRenderingType(event.target.value)}
      className="bg-white"
      style={styles.form}
    >
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
  );
}

RenderingChooseForm.propTypes = {
  changeRenderingType: PropTypes.func.isRequired,
};

export default RenderingChooseForm;
