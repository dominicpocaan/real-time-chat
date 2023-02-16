require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { createServer } = require('http');
const { Server } = require('socket.io');

const MongoStore = require('connect-mongo');

const mongoConnection = require('./src/configs/mongoConnection');
const inboxHandler = require('./src/handlers/inboxHandler');
const messageHandler = require('./src/handlers/messageHandler');

const PORT = process.env.PORT ?? 3002;

const app = express();

mongoConnection.start();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

io.engine.use(
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

io.on('connection', (socket) => {
  console.log('[server] new socket connection: ', socket.id);

  inboxHandler(io, socket);

  messageHandler(io, socket);
});

httpServer.listen(PORT, () => console.log(`[server] running on port ${PORT}`));
