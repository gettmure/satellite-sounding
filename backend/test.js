const {
  WmsLayer,
  S2L2ALayer,
  CRS_EPSG4326,
  ApiType,
  BBox,
  MimeTypes,
} = require('@sentinel-hub/sentinelhub-js');

const fs = require('fs');

const bbox = new BBox(CRS_EPSG4326, 18, 20, 20, 22);

const getMapParams = {
  bbox: bbox,
  fromTime: new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0)),
  toTime: new Date(Date.UTC(2018, 12 - 1, 22, 23, 59, 59)),
  width: 512,
  height: 512,
  format: MimeTypes.JPEG,
};

const instanceId = '501e9445-5b62-41ab-b1d2-209ce2878130';

const layerS2L2AWithEvalscript = new S2L2ALayer({
  instanceId,
  layerId: 'TRUE_COLOR',
});

const getImage = async () => {
  const getBlob = async () => {
    return await layerS2L2AWithEvalscript.getMap(getMapParams, ApiType.WMS);
  };

  const imageBlob = await getBlob();
  console.log(imageBlob);
  fs.writeFileSync('./aue.png', imageBlob, { encoding: null });
};

getImage();
