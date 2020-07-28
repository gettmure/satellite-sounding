import React, { useState } from 'react';
import Map from './Map/Map';
import Form from './Form';
import Toolbar from './Map/Toolbar';

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
  baseUrl:
    'https://services.sentinel-hub.com/ogc/wms/501e9445-5b62-41ab-b1d2-209ce2878130',
};

export default function Container() {
  const [layer, setLayer] = useState('TRUE_COLOR');
  const [url, setUrl] = useState(config.baseUrl);
  const [isDraggable, setIsDraggable] = useState(true);
  const [polygon, setPolygon] = useState(initialPolygon);

  return (
    <div className="content-container">
      <Form polygon={polygon} changeLayer={setLayer} changeUrl={setUrl}></Form>
      <Toolbar setDragging={setIsDraggable}></Toolbar>
      <Map
        polygon={polygon}
        changePolygon={setPolygon}
        isDraggable={isDraggable}
        layer={layer}
        url={url}
      />
    </div>
  );
}
