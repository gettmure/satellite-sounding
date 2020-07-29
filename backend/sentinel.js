const {
  CRS_EPSG4326,
  ApiType,
  BBox,
  MimeTypes,
  WmsLayer,
} = require('@sentinel-hub/sentinelhub-js');

const fs = require('fs');
const PNG = require('pngjs').PNG;

const getDates = (fromDate, toDate) => {
  const fromDateParts = fromDate.split('-').map(Number);
  const toDateParts = toDate.split('-').map(Number);
  const fromDateUtc = new Date(
    Date.UTC(fromDateParts[0], fromDateParts[1] - 1, fromDateParts[2], 0, 0, 0)
  );
  const toDateUtc = new Date(
    Date.UTC(toDateParts[0], toDateParts[1] - 1, toDateParts[2], 23, 59, 59)
  );
  return [fromDateUtc, toDateUtc];
};

const getAverageNdvi = async (bbox, fromTime, toTime, layer, imageIndex) => {
  const getMapParams = {
    bbox: bbox,
    fromTime: fromTime,
    toTime: toTime,
    width: 1024,
    height: 720,
    format: MimeTypes.PNG,
  };
  const getBlob = async () => {
    return await layer.getMap(getMapParams, ApiType.WMS);
  };
  const imageBlob = await getBlob();
  fs.writeFileSync(`./aue${imageIndex}.png`, imageBlob, { encoding: null });
  const readStream = fs.createReadStream(`./aue${imageIndex}.png`);
  const pngStream = readStream.pipe(new PNG());
  const ndviFromStream = new Promise(function (resolve, reject) {
    pngStream.on('parsed', function () {
      let sum = 0;
      let count = 0;
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let ndvi;
          const idx = (this.width * y + x) << 2;
          const red = this.data[idx];
          const blue = this.data[idx + 2];
          if (blue + red === 0) {
            ndvi = 0;
          } else {
            ndvi = (blue - red) / (blue + red);
          }
          count++;
          sum += ndvi;
        }
      }
      averageNdvi = sum / count;
      resolve(averageNdvi);
    });
  });
  const ndvi = await ndviFromStream;
  const ndviObject = {
    ndviValue: ndvi,
    fromTime,
    toTime,
  };
  return ndviObject;
};

const fetchImages = async (
  minX,
  minY,
  maxX,
  maxY,
  fromDate,
  toDate,
  cloudiness
) => {
  let ndviArray = [];
  const bbox = new BBox(CRS_EPSG4326, minX, minY, maxX, maxY);
  const [fromTime, toTime] = getDates(fromDate, toDate);
  const layer = new WmsLayer({
    baseUrl:
      'https://services.sentinel-hub.com/ogc/wms/501e9445-5b62-41ab-b1d2-209ce2878130',
    layerId: 'TRUE_COLOR',
    maxCloudCoverPercent: cloudiness,
  });
  for (let i = 0; i < 5; i++) {
    const ndvi = await getAverageNdvi(bbox, fromTime, toTime, layer, i);
    ndviArray.push(ndvi);
    fromTime.setFullYear(fromTime.getFullYear() + 1);
    toTime.setFullYear(toTime.getFullYear() + 1);
  }
  return ndviArray;
};

module.exports.fetchImages = fetchImages;
