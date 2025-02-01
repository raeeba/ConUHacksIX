// server.js
const connectToDatabase = require('./dbConnection');
const UserModel = require('./models/userModel');

async function main() {
  let client;
  try {
    // Connect to MongoDB
    client = await connectToDatabase(); // mongo connect

    // // Create user
    // const userModel = new UserModel(client);
    // const newMember = {
    //   name: "rae",
    //   email: "rae@gmail.com",
    //   password: "12345"
    // };

    const result = await userModel.createUser(newMember); // Await the result of the async operation
    console.log(result.insertedId);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the client connection
    if (client) {
      await client.close();
    }
  }
}

main().catch(console.error);
