require('dotenv').config();
const express = require('express');
const app = express();

const corsConfig = {
  // Configures the Access-Control-Allow-Origin
  origin: 'https://itss-fe9ktcjmc-ddevtk.vercel.app/',
  // Configures the Access-Control-Allow-Methods
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',

  // Configures the Access-Control-Allow-Credentials
  credentials: true,

  allowedHeaders:
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization',

  // //Configures the Access-Control-Expose-Headers
  // exposedHeaders: 'Content-Range,X-Content-Range,Authorization',

  // // Provides a status code to use for successful OPTIONS requests
  // optionsSuccessStatus: 200,
};

module.exports = corsConfig;
