const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/ping', function (req, res) {
  res.json({
    response: 'pong',
  });
});

app.post('/welcome', (req, res) => {
  if (!req.body.name) {
    res.json({
      status: 403,
      response: `gavno ebanoe`,
    });
  } else {
    res.json({
      status: 200,
      response: `Welcome, ${req.body.name}!`,
    });
  }
});

app.listen(1337, () => {
  console.log('Server is running');
});
