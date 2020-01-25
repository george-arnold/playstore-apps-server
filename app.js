const express = require('express');
const morgan = require('morgan');
const playstoredata = require('./playstore-data');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
  res.json(playstoredata);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});