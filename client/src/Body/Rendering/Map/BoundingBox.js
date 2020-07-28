import React from 'react';
import PropTypes, { number } from 'prop-types';
import { Rectangle } from 'react-leaflet';

const initialPoint = [
  [0, 0],
  [0, 0],
];

function BoundingBox({ mouseIsDown, polygon }) {
  if (mouseIsDown && polygon) {
    return <Rectangle color="purple" bounds={polygon} />;
  } else {
    if (polygon != initialPoint) {
      return <Rectangle color="purple" bounds={polygon} />;
    } else {
      return null;
    }
  }
}

BoundingBox.propTypes = {
  mouseIsDown: PropTypes.bool.isRequired,
  polygon: PropTypes.arrayOf(PropTypes.arrayOf(number)).isRequired,
};

export default BoundingBox;
