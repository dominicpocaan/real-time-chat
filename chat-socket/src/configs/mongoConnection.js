const fs = require('fs');
const mongoose = require('mongoose');

const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } =
  process.env;

const mongoConnection = (() => {
  let instance;

  const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGO_DATABASE,
  };

  const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(uri, options, (error) => {
      if (error) throw error;
    });

    // Initialize collections
    const initCollections = async () => {
      const models = fs.readdirSync(`${process.cwd()}/src/models`);

      // for (const model of models) {
      //   const schema = require(`${process.cwd()}/src/models/${model}`);

      //   try {
      //     await mongoose.connection.createCollection(schema.collection.name);
      //   } catch (error) {
      //     // If collection already exists, continue to other models.
      //     if (
      //       error.name &&
      //       error.name === 'MongoServerError' &&
      //       error.codeName &&
      //       error.codeName === 'NamespaceExists'
      //     ) {
      //       continue;
      //     }

      //     throw error;
      //   }
      // }
    };

    mongoose.connection.on('connected', () => {
      console.log('[database] connected');

      initCollections();
    });

    mongoose.connection.on('reconnect', () => {
      console.log('[database] reconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.log(`[database] error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('[database] disconnected');
      console.log('[database] reconnecting');
      connect();
    });

    mongoose.connection.on('close', () => {
      console.log('[database] close');
    });

    return mongoose;
  };

  return {
    uri,
    options,
    start: connect,
    getInstance: () => {
      if (!instance) instance = connect();

      return instance;
    },
  };
})();

module.exports = mongoConnection;
