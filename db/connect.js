// CONEXION PROTOCOL??
const dotenv = require('dotenv');
dotenv.config();
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');
let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
//FINISHED


//  - - - OLD CONNECTION FROM OTHER EXAMPLE



// const { MongoClient } = require('mongodb');

// async function main(){

//     const uri = 'mongodb+srv://user1:dUJLF3FTNr9GG5bw@cluster0.4fspa7c.mongodb.net/?retryWrites=true&w=majority';

//     const client = new MongoClient(uri);

//     try {
//         await client.connect();

//         await listDatabases(client);
//     } catch(e) {
//             console.error(e);
        
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// async function listDatabases(client) {
//     const databasesList = await client.db().admin().listDatabases();

//     console.log('Databases:');
//     databasesList.databases.forEach(db => {
//         console.log(`- ${db.name}`);
//     })
// }