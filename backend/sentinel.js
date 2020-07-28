const {
  S2L2ALayer,
  CRS_EPSG4326,
  ApiType,
  BBox,
  MimeTypes,
  WmsLayer,
} = require('@sentinel-hub/sentinelhub-js');

const fs = require('fs');

const getDates = (fromDate, toDate) => {
  const fromDateParts = fromDate.split('-').map(Number);
  const toDateParts = toDate.split('-').map(Number);

  const fromDateUtc = new Date(
    Date.UTC(fromDateParts[0], fromDateParts[1] - 1, fromDateParts[2])
  );
  const toDateUtc = new Date(
    Date.UTC(toDateParts[0], toDateParts[1] - 1, toDateParts[2])
  );

  return [fromDateUtc, toDateUtc];
};

const getImage = async (
  minX,
  minY,
  maxX,
  maxY,
  fromDate,
  toDate,
  cloudiness
) => {
  const bbox = new BBox(CRS_EPSG4326, minX, minY, maxX, maxY);
  const [fromTime, toTime] = getDates(fromDate, toDate);
  const getMapParams = {
    bbox: bbox,
    fromTime: fromTime,
    toTime: toTime,
    width: 1024,
    height: 720,
    format: MimeTypes.PNG,
  };
  const layerS2L2AWithEvalscript = new WmsLayer({
    baseUrl:
      'https://services.sentinel-hub.com/ogc/wms/501e9445-5b62-41ab-b1d2-209ce2878130',
    layerId: 'TRUE_COLOR',
    maxCloudCoverPercent: cloudiness,
  });
  const getBlob = async () => {
    return await layerS2L2AWithEvalscript.getMap(getMapParams, ApiType.WMS);
  };
  const imageBlob = await getBlob();
  fs.writeFileSync('./aue.png', imageBlob, { encoding: null });
};

module.exports.getImage = getImage;
