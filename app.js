const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const clientsRouter = require('./routes/clients');
const carsRouter = require('./routes/cars');
const reparationsRouter = require('./routes/reparations');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 10 }));

app.use('/api/clients', clientsRouter);
app.use('/api/cars', carsRouter);
app.use('/api/reparations', reparationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('Page not found');
});

// error handler
app.use(function(err, req, res, next) {
  res.send(err);
});

module.exports = app;
