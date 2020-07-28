import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer, WMSTileLayer } from 'react-leaflet';
import BoundingBox from './BoundingBox';

const config = {
  attribution:
    '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
  urlPattern: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
};

const initialPoint = [
  [0, 0],
  [0, 0],
];

function Map({ layer, url }) {
  const [startPoint, setStartPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);
  const [polygon, setPolygon] = useState(initialPoint);
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const mouseDownHandler = ({ latlng }) => {
    const { lat, lng } = latlng;
    setStartPoint([lat, lng]);
    setMouseIsDown(true);
  };
  const mouseMoveHandler = ({ latlng }) => {
    if (mouseIsDown) {
      const { lat, lng } = latlng;
      setEndPoint([lat, lng]);
      setPolygon([startPoint, endPoint]);
    }
  };
  const mouseUpHandler = () => {
    setMouseIsDown(false);
  };

  return (
    <LeafletMap
      dragging={false}
      onmousedown={mouseDownHandler}
      onmousemove={mouseMoveHandler}
      onmouseup={mouseUpHandler}
      center={[43.03781097648953, 131.89533233642578]}
      zoom={14}
      minZoom={10}
      maxZoom={16}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer attribution={config.attribution} url={config.urlPattern} />
      <WMSTileLayer tileSize={512} url={url} layers={layer} />
      <BoundingBox mouseIsDown={mouseIsDown} polygon={polygon} />
    </LeafletMap>
  );
}

Map.propTypes = {
  layer: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default Map;
