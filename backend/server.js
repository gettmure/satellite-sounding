const { fetchImages } = require('./sentinel');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Add headers
app.use(function (req, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/api/post_polygon', async (request, response) => {
  const { start, end, fromDate, toDate, cloudiness } = request.body;
  console.log('Processing...');
  const [minY, minX, maxY, maxX] = [
    Math.min(start.lat, end.lat).toPrecision(8),
    Math.min(start.lng, end.lng).toPrecision(8),
    Math.max(start.lat, end.lat).toPrecision(8),
    Math.max(start.lng, end.lng).toPrecision(8),
  ];
  const ndvi = await fetchImages(
    minX,
    minY,
    maxX,
    maxY,
    fromDate,
    toDate,
    cloudiness
  );
  console.log('Done!');
  response.json({
    status: 200,
    ndviData: ndvi,
  });
});

app.listen(1337, () => {
  console.log(`Server is running`);
});
