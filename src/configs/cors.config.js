require('dotenv').config();
const express = require('express');
const app = express();

const corsConfig = {
  // Configures the Access-Control-Allow-Origin
  origin:
    app.get('env') !== 'production'
      ? 'http://localhost:3000'
      : process.env.CORS_ORIGIN,

  // Configures the Access-Control-Allow-Methods
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
};

module.exports = corsConfig;
