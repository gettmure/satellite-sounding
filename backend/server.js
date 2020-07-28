const { getImage } = require('./sentinel');

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

app.post('/api/post_polygon', (request, response) => {
  const {
    start,
    end,
    isInitialPolygon,
    fromDate,
    toDate,
    cloudiness,
  } = request.body;
  if (isInitialPolygon) {
    response.status(400).json({ success: false, error: 'Polygon is empty' });
  } else {
    console.log('Processing...');
    response.json({
      status: 200,
      response: 'OK',
    });
    const [minY, minX, maxY, maxX] = [
      Math.min(start.lat, end.lat).toPrecision(8),
      Math.min(start.lng, end.lng).toPrecision(8),
      Math.max(start.lat, end.lat).toPrecision(8),
      Math.max(start.lng, end.lng).toPrecision(8),
    ];
    getImage(minX, minY, maxX, maxY, fromDate, toDate, cloudiness);
    console.log('Done!');
  }
});

app.listen(1337, () => {
  console.log(`Server is running`);
});
