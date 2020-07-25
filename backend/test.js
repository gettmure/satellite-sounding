const sentinel = require('@sentinel-hub/sentinelhub-js');
const fs = require('fs');

const layer = new sentinel.S2L2ALayer({
  instanceId: '501e9445-5b62-41ab-b1d2-209ce2878130',
  layerId: 'TRUE_COLOR',
  maxCloudCoverPercent: 10,
});

const bbox = new sentinel.BBox(
  sentinel.CRS_EPSG4326,
  -11.8,
  20.85,
  -10.9,
  21.35
);
const getMapParams = {
  bbox: bbox,
  fromTime: new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0)),
  toTime: new Date(Date.UTC(2018, 12 - 1, 3, 23, 59, 59)),
  width: 512,
  height: 512,
  format: sentinel.MimeTypes.JPEG,
};

const getImage = async () => {
  const getBlob = async () => {
    return await layer.getMap(getMapParams, sentinel.ApiType.WMS);
  };

  const imageBlob = await getBlob();

  fs.writeFileSync('./aue.jpeg', imageBlob, { encoding: null });
};

getImage();
