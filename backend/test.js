const sentinel = require('@sentinel-hub/sentinelhub-js');
const fs = require('fs');

const layer = new sentinel.S2L2ALayer({
  instanceId: '501e9445-5b62-41ab-b1d2-209ce2878130',
  layerId: 'TRUE_COLOR',
  maxCloudCoverPercent: 10,
});

const bbox = new sentinel.BBox(
  sentinel.CRS_EPSG3857,
  -13152499,
  4020692,
  -13115771,
  4038942
);
const getMapParams = {
  bbox: bbox,
  fromTime: new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0)),
  toTime: new Date(Date.UTC(2018, 12 - 1, 3, 23, 59, 59)),
  width: 512,
  height: 512,
  format: sentinel.MimeTypes.PNG,
};

const getImage = async () => {
  const getBlob = async () => {
    return await layer.getMap(getMapParams, sentinel.ApiType.WMS);
  };

  const imageBlob = await getBlob();

  fs.writeFileSync('./aue.png', imageBlob, { encoding: null });
};

getImage();
