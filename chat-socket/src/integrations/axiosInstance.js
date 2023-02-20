const axios = require('axios');

module.exports = axios.create({
  baseURL: process.env.API,
  headers: {
    'Content-type': 'application/json',
  },
});
