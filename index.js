// set environment variables
require('dotenv').config();

// import third-party
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');

// import local file
const { MAX } = require('./src/constant');
const corsConfig = require('./src/configs/cors.config');
const accountApi = require('./src/apis/account.api');
const wordApi = require('./src/apis/word.api');
const gameApi = require('./src/apis/game.api');
const flashcardApi = require('./src/apis/flashcard.api');
const commonApi = require('./src/apis/common.api');
const sentenceApi = require('./src/apis/sentence.api');
const blogApi = require('./src/apis/blog.api');
const highscoreApi = require('./src/apis/highscore.api');
const passportConfig = require('./src/middlewares/passport.middleware');

// ================== set port ==================
const app = express();
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT);

// ================== setup ==================
app.use(express.static(path.join(__dirname, '../frontend/build')));

const dev = app.get('env') !== 'production';

// ================== Connect mongodb with mongoose ==================
const mongoose = require('mongoose');
const MONGO_URL = dev ? process.env.MONGO_URL_LOCAL : process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB connect successful');
  });

// ================== config ==================
app.use(express.json({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(express.urlencoded({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(cookieParser());
// app.use(cors(corsConfig));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://itss-fe.vercel.app');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// ================== Listening ... ==================
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} !!`);
});
console.log('hello');
// ================== Apis ==================
const BASE_URL = '/apis';
app.get(`${BASE_URL}/test`, (req, res, next) => {
  res.json({ message: 'hello' });
});
app.use(`${BASE_URL}/account`, accountApi);
app.use(`${BASE_URL}/word`, wordApi);
app.use(`${BASE_URL}/games`, gameApi);
app.use(`${BASE_URL}/flashcard`, flashcardApi);
app.use(`${BASE_URL}/common`, commonApi);
app.use(`${BASE_URL}/sentence`, sentenceApi);
app.use(`${BASE_URL}/blog`, blogApi);
app.use(
  `${BASE_URL}/highscore`,
  passportConfig.jwtAuthentication,
  highscoreApi,
);

module.exports = app;
