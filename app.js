const express = require('express');
const path = require('path');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.SERVER_PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const port = app.get('port');
app.listen(port, () => console.log(`http://localhost:${port}`));

module.exports = app;
