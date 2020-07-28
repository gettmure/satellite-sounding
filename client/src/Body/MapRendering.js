import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer, WMSTileLayer } from 'react-leaflet';
import RenderingChooseForm from './RenderingChooseForm';

const config = {
  baseUrl:
    'https://services.sentinel-hub.com/ogc/wms/501e9445-5b62-41ab-b1d2-209ce2878130',
  attribution:
    '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
  urlPattern: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  urlProcessingApi:
    'https://services.sentinel-hub.com/ogc/wms/aeafc74a-c894-440b-a85b-964c7b26e471',
};

export default function MapRendering() {
  const [renderingType, setRenderingType] = useState('TRUE_COLOR');

  const [url, setUrl] = useState(config.baseUrl);

  return (
    <div className="map-container">
      <RenderingChooseForm
        changeRenderingType={setRenderingType}
        changeUrl={setUrl}
      ></RenderingChooseForm>
      <LeafletMap
        center={[43.03781097648953, 131.89533233642578]}
        zoom={14}
        minZoom={6}
        maxZoom={16}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer attribution={config.attribution} url={config.urlPattern} />
        <WMSTileLayer tileSize={512} url={url} layers={renderingType} />
      </LeafletMap>
    </div>
  );
}
