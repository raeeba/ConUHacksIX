const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://jannalomibaow:uch3W7qyRzFNbLHT@dbuno.m0dwb.mongodb.net/?retryWrites=true&w=majority&appName=dbUno';

  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to the database!");

    // List collections in HackConcordia database
    const collections = await listCollections(client, 'HackConcordia');
    console.log("Collections in HackConcordia database:");
    collections.forEach((collection) => {
      console.log(`- ${collection}`);
    });

  } catch (error) {
    console.error("Error connecting to the database: ", error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listCollections(client, dbName) {
  const db = client.db(dbName);
  const collections = await db.listCollections().toArray();
  return collections.map(collection => collection.name);
}

