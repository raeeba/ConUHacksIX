
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://jannalomibaow:uch3W7qyRzFNbLHT@dbuno.m0dwb.mongodb.net/?retryWrites=true&w=majority&appName=dbUno';

async function connectToDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to the database!");
    return client;
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    throw error; 
  }
}

module.exports = connectToDatabase;
