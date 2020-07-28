import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer, WMSTileLayer } from 'react-leaflet';
import BoundingBox from './BoundingBox';

const initialPolygon = {
  start: {
    lat: 0,
    lng: 0,
  },
  end: {
    lat: 0,
    lng: 0,
  },
  isInitialPolygon: true,
};

const config = {
  attribution:
    '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
  urlPattern: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
};

function Map({ layer, url, isDraggable, polygon, changePolygon }) {
  const [startPoint, setStartPoint] = useState({
    lat: 0,
    lng: 0,
  });
  const [endPoint, setEndPoint] = useState({
    lat: 0,
    lng: 0,
  });
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const mouseDownHandler = ({ latlng }) => {
    console.log(latlng);
    if (!isDraggable) {
      if (!polygon.isInitialPolygon) {
        changePolygon(initialPolygon);
      }
      setStartPoint({ lat: latlng.lat, lng: latlng.lng });
      setMouseIsDown(true);
    }
  };
  const mouseMoveHandler = ({ latlng }) => {
    if (mouseIsDown && !isDraggable) {
      setEndPoint({ lat: latlng.lat, lng: latlng.lng });
      changePolygon({
        start: startPoint,
        end: endPoint,
        isInitialPolygon: false,
      });
    }
  };
  const mouseUpHandler = () => {
    if (!isDraggable) {
      setMouseIsDown(false);
    }
  };
  return (
    <LeafletMap
      dragging={isDraggable}
      onmousedown={mouseDownHandler}
      onmousemove={mouseMoveHandler}
      onmouseup={mouseUpHandler}
      center={[43.03781097648953, 131.89533233642578]}
      zoom={14}
      minZoom={10}
      maxZoom={16}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      animate={true}
      easeLinearity={0.35}
      zoomControl={false}
    >
      <TileLayer attribution={config.attribution} url={config.urlPattern} />
      <WMSTileLayer tileSize={512} url={url} layers={layer} />
      <BoundingBox polygon={polygon} />
    </LeafletMap>
  );
}

Map.propTypes = {
  layer: PropTypes.string,
  url: PropTypes.string.isRequired,
  isDraggable: PropTypes.bool.isRequired,
  polygon: PropTypes.object.isRequired,
  changePolygon: PropTypes.func.isRequired,
};

export default Map;
