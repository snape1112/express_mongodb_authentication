const { MongoClient } = require('mongodb');
const { index } = require('./db.config');

class Database {
  static async connect(dbURI, dbOptions) {
    const client = new MongoClient(dbURI, dbOptions);
    await client.connect();
    const collection = client.db(index.Db).collection(index.Users);
    return { collection, client };
  }
}

module.exports = {
  Database,
};
