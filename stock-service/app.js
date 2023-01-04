const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require('./swagger.json');
const indexRouter = require('./routes/index');
const { HttpError } = require('./errors/HttpError');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/v1', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof HttpError) {
    return res.status(err.status).json(err.message);
  }

  // render the error page
  res.status(err.status || 500);
  return res.json('Internal Server Error');
});

module.exports = app;
