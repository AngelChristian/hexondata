// server intialization
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// starting the server
app
  .listen(port, () => {
    console.log(`App running on port ${port}.`);
  })
  .on('error', (e) => {
    console.log('Error happened: ', e.message);
  });

//All routes
const vehicleRoutes = require('./routes/vehicleRoutes.js');
const tripRoutes = require('./routes/tripRoutes.js');
const routeRoutes = require('./routes/routeRoutes.js');
const driverRoutes = require('./routes/driverRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

app.get('/', (request, response) => {
  response.json({ info: 'Hexon data task api' });
});

app.use('/vehicles', vehicleRoutes);
app.use('/trips', tripRoutes);
app.use('/routes', routeRoutes);
app.use('/drivers', driverRoutes);
app.use('/auth', authRoutes);
