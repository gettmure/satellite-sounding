const {
  S2L2ALayer,
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
    const getMapParams = {
      bbox: bbox,
      fromTime: fromTime,
      toTime: toTime,
      width: 1024,
      height: 720,
      format: MimeTypes.PNG,
    };
    console.log(fromTime, toTime);
    const getBlob = async () => {
      return await layer.getMap(getMapParams, ApiType.WMS);
    };
    const imageBlob = await getBlob();
    fs.writeFileSync(`./aue${i}.png`, imageBlob, { encoding: null });
    fromTime.setFullYear(fromTime.getFullYear() + 1);
    toTime.setFullYear(toTime.getFullYear() + 1);
    fs.createReadStream(`./aue${i}.png`)
      .pipe(new PNG())
      .on('parsed', function () {
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
        mediumNdvi = sum / count;
        console.log(mediumNdvi);
        ndviArray.push(parseFloat(mediumNdvi.toPrecision(3)));
      });
  }
  return ndviArray;
};

module.exports.fetchImages = fetchImages;
