const { MongoClient } = require('mongodb');

let client;

const initializeDbConnection = async () => {
    client = await MongoClient.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}

module.exports = {initializeDbConnection, getDbConnection}