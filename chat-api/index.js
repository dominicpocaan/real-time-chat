'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');

const MongoStore = require('connect-mongo');

const accessLog = require('./src/middlewares/accessLogs');
const extendedResponse = require('./src/middlewares/extendResponse');
const mongoConnection = require('./src/configs/mongoConnection');

const PORT = process.env.PORT ?? 3001;

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const { errorHandler } = require('./src/middlewares/errorHandler');

const app = express();

mongoConnection.start();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: mongoConnection.uri,
      dbName: mongoConnection.options.dbName,
      collectionName: 'sessions',
    }),
    cookie: {
      secure: process.env.ENVIRONMENT === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14,
      domain: process.env.APP_DOMAIN,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(accessLog);
app.use(extendedResponse);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server] running on port ${PORT}`);
});
