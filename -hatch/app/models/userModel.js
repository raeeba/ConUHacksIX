const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt'); //hash


class UserModel {
  constructor(client) {
    this.db = client.db('HackConcordia'); 
    this.collection = this.db.collection('userData'); // Collection name
  }

  /**
   * 
   * @param {array of user's data} userData 
   * @param {number either 1 or 2} petType 
   * @param {string name} petName 
   * @returns it return an object containing details about the operation
   */
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

  /**
   * 
   * @param {user email} email 
   * @returns it returns the user document
   */
  async findUserByEmail(email) {
    const user = await this.collection.findOne({ email });
    return user;
  }
/**
 * 
 * @param {*} userid 
 * @returns a boolean
 */
  async updateUserTime(userid){
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }
    try {
      const user = await this.collection.findOne({ _id: userid });
  
      if (!user) {
        console.log("User not found");
        return;
      }
  
      // Update the lastTimeModified 
      const result = await this.collection.updateOne(
        { _id: userid },
        { $set: { lastTimeModified: new Date() } }
      );
  
      if (result.modifiedCount > 0) {
        console.log("User's lastTimeModified updated successfully.");
        return true;
      } else {
        console.log("No modification to lastTimeModified.");
        return false;
      }
      
    } catch (error) {
      console.error("Error updating user's lastTimeModified:", error);
      throw error;
    }

  }

  /**
   * 
   * @param {*} inputPassword 
   * @param {*} storedPassword 
   * @returns returns a boolean
   */
  async validatePassword(inputPassword, storedPassword) {
    const isValid = await bcrypt.compare(inputPassword, storedPassword);
    return isValid;
  }

  async getUserById(userID){
    try {
      const user = await this.collection.findOne({ _id: userID });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw error;
    }
  }

  /**
   * 
   * @returns array of users
   */
  async getAllUsers() {
    const users = await this.collection.find().toArray();
    return users;
  }

  /**
   * 
   * @param {*} userId 
   * @param {*} taskName 
   * @returns returns an object containing details about the operation
   */
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
      { $push: { tasks: task } }  
    );
    console.log("out");
    return result;//result
  }


  /**
   * 
   * @param {*} task 
   * @returns a boolean
   */
  async completeTask(task) {
    console.log("Updating task to completed");
  
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }
  
    try {
      // Ensure the task document has an _id field
      if (!task._id) {
        throw new Error("Task document does not have an _id field");
      }
  
      // Update the task's isCompleted field
      const result = await this.collection.updateOne(
        { "tasks._id": task._id },  // Match task by its _id inside the tasks array
        { $set: { "tasks.$.isCompleted": true } }  // Set isCompleted to true
      );
  
      console.log("Update result:", result);
  
      if (result.modifiedCount === 0) {
        console.log("No task was updated. The task might already be completed or not found.");
        return null;
      } else {
        console.log("Task completed successfully")
  
        return true;
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }


  /**
   * 
   * @param {*} userId 
   * @returns returns an array of task
   */
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

  /**
   * 
   * @param {*} userId 
   * @param {*} taskId 
   * @returns a specific task
   */
  async getTask(userId, taskId) {
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }else{
      console.log("yes");
    }

    if (!(userId instanceof ObjectId)) {
      console.log("user id is not object")
    }
    if (!(taskId instanceof ObjectId)) {
      console.log("task id is not object")
    }

    try {
      const user = await this.collection.findOne({ _id: userId });
      if (!user) {
        console.log("User not found");
        return null;
      }
      console.log("specific task");
  
      // Find the task with the matching _id
      const task = user.tasks.find(task => task._id.equals(taskId));
  
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

  /**
   * 
   * @param {*} userId 
   * @param {*} newHealth 
   * @returns returns the object containig some details
   */

  async updatePetHealth(userId, newHealth) {
    try {
      const result = await this.collection.updateOne(
        { _id: userId },
        { $set: { "pet.health": newHealth } }
      );
      if (result.modifiedCount === 0) {
        throw new Error("Pet health update failed");
      }
      return result;
    } catch (error) {
      console.error("Error updating pet health:", error);
      throw error;
    }
  }

  /**
   * 
   * @param {*} userId 
   * @returns boolean if the updatting of pet mood is done
   */
  async getPetMood(userId) {
    try {
      const user = await this.getUserById(userId);
      const pet = user.pet;

      // Update pet's mood based on health
      console.log('pet:' + pet);
      if (pet.health <= 20) {
        pet.mood = 3;// sad
      } else if (pet.health <= 60) {
        pet.mood = 2; //calm
      } else if (pet.health <= 100) {
        pet.mood = 1; //happy
      }
      console.log( "mood:" + pet.mood);

      const result = await this.collection.updateOne(
        { _id: userId },
        { $set: { "pet.mood": pet.mood } }
      );

      if (result.modifiedCount === 0) {
        console.log('No changes')
      }

      console.log(`Pet mood updated to: ${pet.mood}`);
      return true; // Return the updated pet object
    } catch (error) {
      console.error("Error retrieving pet health or updating mood:", error);
      throw error;
    }
  }




  

}

module.exports = UserModel;
