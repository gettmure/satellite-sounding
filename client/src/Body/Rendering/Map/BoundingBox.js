import React from 'react';
import PropTypes from 'prop-types';
import { Rectangle, Marker } from 'react-leaflet';

function BoundingBox({ polygon }) {
  const { start, end, isInitialPolygon } = polygon;
  const bounds = [
    [start.lat, start.lng],
    [end.lat, end.lng],
  ];
  if (!isInitialPolygon) {
    return (
      <Rectangle color="purple" bounds={bounds}>
        <Marker position={{ lat: start.lat, lng: start.lng }} />
      </Rectangle>
    );
  } else {
    return null;
  }
}

BoundingBox.propTypes = {
  polygon: PropTypes.object.isRequired,
};

export default BoundingBox;
