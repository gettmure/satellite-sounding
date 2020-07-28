import React, { useState } from 'react';
import Map from './Map/Map';
import Form from './Form';

const config = {
  baseUrl:
    'https://services.sentinel-hub.com/ogc/wms/501e9445-5b62-41ab-b1d2-209ce2878130',
};

export default function Container() {
  const [renderingType, setRenderingType] = useState('TRUE_COLOR');
  const [url, setUrl] = useState(config.baseUrl);

  return (
    <div className="map-container">
      <Form changeRenderingType={setRenderingType} changeUrl={setUrl}></Form>
      <Map layer={renderingType} url={url} />
    </div>
  );
}
