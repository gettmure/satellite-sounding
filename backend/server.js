const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  console.log(req);
  // if (!req.body.name) {
  //   res.json({
  //     status: 403,
  //     response: `gavno ebanoe`,
  //   });
  // } else {
  //   res.json({
  //     status: 200,
  //     response: `Welcome, ${req.body.name}!`,
  //   });
  // }
});

app.listen(1337, () => {
  console.log('Server is running');
});
