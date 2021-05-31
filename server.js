const express = require('express');
const path = require('path');
const app = express();
const routes = require('./lib/routes');
const compression = require('compression');

app.use(compression());

app.use(function (req, res, next) {
  res.header('Content-Type');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

require('dotenv').config();

app.use(require('./lib/routes'));
app.use(require('./lib/routes/pages'));

app.use('/', routes);

app.use(
  '*/css',
  express.static(path.join(__dirname + '/lib/web/assets/', 'css'))
);
app.use(
  '*/js',
  express.static(path.join(__dirname + '/lib/web/assets/', 'js'))
);
app.use(
  '*/img',
  express.static(path.join(__dirname + '/lib/web/assets/', 'img'))
);
app.use(
  '*/fonts',
  express.static(path.join(__dirname + '/lib/web/assets/', 'fonts'))
);

app.set('views', path.join(__dirname + '/lib/web/', 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(function (req, res, next) {
  req.getUrl = function () {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
  };
  return next();
});

app.listen(9984, () => {
  console.log('port 9984');
});
