const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt'); //hash

class UserModel {
  constructor(client) {
    this.db = client.db('HackConcordia'); 
    this.collection = this.db.collection('userData'); // Collection name
  }

  // Method to create a new user
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10); 

    const user = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    };

    const result = await this.collection.insertOne(user);
    return result;
  }

  // Method to find a user by email
  async findUserByEmail(email) {
    const user = await this.collection.findOne({ email });
    return user;
  }

  // Method to validate user password
  async validatePassword(inputPassword, storedPassword) {
    const isValid = await bcrypt.compare(inputPassword, storedPassword);
    return isValid;
  }

  // Method to get all users (or customize as needed)
  async getAllUsers() {
    const users = await this.collection.find().toArray();
    return users;
  }
}

module.exports = UserModel;
