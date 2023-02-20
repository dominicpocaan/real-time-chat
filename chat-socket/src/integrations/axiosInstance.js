const axios = require('axios');

console.log(process.env.API);

module.exports = axios.create({
  baseURL: process.env.API,
  headers: {
    'Content-type': 'application/json',
  },
});
