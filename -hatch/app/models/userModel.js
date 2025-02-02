const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt'); //hash

//model
const TaskModel = require('./taskModel');

class UserModel {
  constructor(client) {
    this.db = client.db('HackConcordia'); 
    this.collection = this.db.collection('userData'); // Collection name
  }

  // method to create a new user
   async  createUser(userData, petType, petName) {
    const hashedPassword = await bcrypt.hash(userData.password, 10); 

    const user = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      lastTimeModified:new Date(),
      pet:{
        type:petType,
        name: petName,
        health:100, //initial 
        mood: 1,// happy=1, calm=2, sad=3
      },
    tasks:[]
    };

    const result = await this.collection.insertOne(user);
    return result;
  }

  // method to find a user by email
  async findUserByEmail(email) {
    const user = await this.collection.findOne({ email });
    return user;
  }

  // method to validate user password
  async validatePassword(inputPassword, storedPassword) {
    const isValid = await bcrypt.compare(inputPassword, storedPassword);
    return isValid;
  }

  // method to get all users (or customize as needed)
  async getAllUsers() {
    const users = await this.collection.find().toArray();
    return users;
  }

 async addTask(userId, taskName) {
    console.log("addtask");

    const task = {
      _id: new ObjectId(),
      taskDesc:taskName,           // Task name
      isCompleted: false,  // Task completion status
      createdDate: new Date(),       // Current date for createdDate
  }; 
  console.log(task);
  if (!this.collection) {
    throw new Error('Collection not initialized');
  }else{
    console.log("yes");
  }
    const result = await this.collection.updateOne(
      { _id: userId },
      { $push: { tasks: task } }  // Add task to the tasks array
    );
    console.log("out");
    return result;
  }

  async completeTask(userId, taskId) {
    console.log("update task");

    if (!this.collection) {
      throw new Error('Collection not initialized');
    }else{
      console.log("yes");
    }
      const result = await this.collection.updateOne(
        { _id: userId, _id: taskId }, 
        {$set: { "tasks.$.isCompleted": true } } // Add task to the tasks array
      );
      console.log("out");
      return result;
  }

  async getTasks(userId) {
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }else{
      console.log("yes");
    }

    try {
      const user = await this.collection.findOne({ _id: userId });

      if (!user) {//if user is not in the system
        console.log("User not found");
        return [];
      }

      return user.tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async getTask(userId, taskId) {
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }else{
      console.log("yes");
    }

    try {
      const user = await this.collection.findOne({ _id: userId });
      if (!user) {
        console.log("User not found");
        return null;
      }
  
      // Find the task with the matching _id
      const task = user.tasks.find(task => task._id.toString() === taskId);
  
      return task || null;
    } catch (error) {
      console.error("Error retrieving task:", error);
      throw error;
    }
  }

  

  //helper class
  async  timeConverter(){
    const localTime = new Date().toLocaleString("en-CA", {
      timeZone: "America/Toronto", 
      hour12: false,              
    });

    return localTime;
  }



  async checkAndUpdateHealth(userId) {
    const user = await this.collection.findOne({ _id: userId });

    if (user) {
      // Get the current time and calculate the difference in hours
      const currentTime = new Date();
      const lastModified = user.lastTimeModified;
      const timeDiff = (currentTime - lastModified) / (1000 * 60 * 60);  

      if (timeDiff >= 6) {
        // Decrease health if more than 6 hours have passed
        const newHealth = user.pet.health - 20;  
        const updatedPet = { ...user.pet, health: newHealth };
        
        // Update the user's health and set lastTimeModified to current time
        await this.collection.updateOne(
          { _id: userId },
          { 
            $set: {
              "pet": updatedPet,
              "lastTimeModified": currentTime // Update lastTimeModified to current time
            }
          }
        );
        console.log(`User's health has been updated to: ${newHealth}`);
      } else {
        console.log("Health update not necessary yet.");
      }
    } else {
      console.log("User not found.");
    }
  }

}

module.exports = UserModel;
