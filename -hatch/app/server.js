const { ObjectId } = require('mongodb');
const connectToDatabase = require('./dbConnection');
const UserModel = require('./models/userModel');  // Make sure this is the correct import

/**
 * 
 * @param {*} newUser 
 * @param {*} petType 
 * @param {*} petName 
 * @returns 
 */
async function registerUser(newUser, petType, petName) {
  let client;
  try {
    client = await connectToDatabase();
    const userModel = new UserModel(client); 
    const resultUser = await userModel.createUser(newUser, petType, petName);
    console.log("User created with ID:", resultUser.insertedId);

    return resultUser;
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function loginUser(email, password) {
  let client;
  try {
    client = await connectToDatabase();
    const userModel = new UserModel(client); // Instantiate UserModel

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      console.log("User not found");
      return null;
    }

    const isValidPassword = await userModel.validatePassword(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password");
      return null;
    }

    console.log("Login successful");
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
  } finally {
    if (client) {
      await client.close();
    }
  }

  
}

async function addTaskToUser( userId, taskName) {
  client = await connectToDatabase();
  const userModel = new UserModel(client); // Create an instance of UserModel
  
  // Use the addTask method from UserModel to add the task
  try {
    const result = await userModel.addTask(userId, taskName);
    console.log('Task Added:', result);
    return result;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

async function taskComplete(userId, taskId) {
  client = await connectToDatabase();
  const userModel = new UserModel(client);

  try {
    const task = await getTaskForUser(userId,taskId);
    if (!task) {
      console.log("Task not found");
      return;
    }

    const result = await userModel.completeTask(task);
    console.log("task Done:", result);

    //details of user
    const user = await userModel.getUserById(userId);
    const pet = user.pet;

    if (pet.health < 100) {
      pet.health = Math.min(pet.health + 20, 100); // pet.health + 20 but it wont exceed to 100
    }
    
    const userUpdateResult = await userModel.updateUserTime(userId);
    console.log("is time updated? "+userUpdateResult);

    const updatePetHealthResult = await userModel.updatePetHealth(userId, pet.health);
    console.log("Pet health updated:", updatePetHealthResult);

  } catch (error) {
    console.error("Error marking task as completed:", error);
    throw error;
  }
}

async function getTasksForUser(userId) {
  let client;
  try {
    client = await connectToDatabase();
    const userModel = new UserModel(client);
    const tasks = await userModel.getTasks(userId);
    console.log("User Tasks:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  } finally {
    if (client) await client.close();
  }
}

async function getTaskForUser(userId, taskId) {
  let client;
  try {
    client = await connectToDatabase();
    const userModel = new UserModel(client);
    const task = await userModel.getTask(userId, taskId);
    console.log("user id:" + userId);
    console.log('taskid: '+taskId);
    
    if (!task) {
      console.log("Task not found");
      return null;
    }
    
    console.log("Task Retrieved:", task);
    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
  } finally {
    if (client) await client.close();
  }
}

async function isMoreThanSixHours(userId) {
  client = await connectToDatabase();
  const userModel = new UserModel(client);

  try {
    // Find the user by userId
    const user = await userModel.collection.findOne({ _id: userId });

    if (!user) {
      console.log("User not found");
      return;
    }

    const currentTime = new Date();

    const lastModifiedTime = new Date(user.lastTimeModified);

    const timeDifferenceMs = currentTime - lastModifiedTime;
    const sixHoursInMs = 6 * 60 * 60 * 1000;// 6 hrs = 21,600,000

    console.log(timeDifferenceMs);

    return timeDifferenceMs > sixHoursInMs;

  } catch (error) {
    console.error("Error calculating time difference:", error);
    throw error;
  }
}

async function updatePetMood(userId){
  client = await connectToDatabase();
  const userModel = new UserModel(client);

  try{
    const result = await userModel.getPetMood(userId);
    console.log(result);

  }catch (error) {
    console.error("Error calculating time difference:", error);
    throw error;
  }

}





async function main() {
  
  try {
    // const userData = {
    //   name: "John Doe",
    //   email: "john@example.com",
    //   password: "12345"
    // };

    // const petType = 1; 
    // const petName = "Whiskers";

    // await registerUser(userData,petType,petName);
   

    const currentUser = await loginUser("john@example.com", "12345");
    console.log(currentUser);
    if (currentUser) {
      //add task
      //const task = await addTaskToUser(currentUser._id,'Study Jnone');
      //const task1 = await addTaskToUser(currentUser._id,'Study JavaScript');

      // console.log('getall task ');
      // console.log(await getTasksForUser(currentUser._id));

       //console.log('get specific task ');
      // console.log(currentUser._id);
       //console.log(await getTaskForUser(currentUser._id,new ObjectId('679eff9b9cf25c04b56ef450')) );

      //change task
      // console.log('change it task ');
      // await taskComplete(currentUser._id,new ObjectId('679eff9b9cf25c04b56ef450'));

      //is more than 6 hours
      // const result = await isMoreThanSixHours(currentUser._id);
      // console.log(result);

      //update mood
      //console.log(await updatePetMood(currentUser._id));
      
      
   
     }

  } catch (error) {
    console.error("Error:", error);
  }
}


main().catch(console.error);


/**
 * getTasks: DONE!-> get all the task under the user
 * getTask:  DONE!  -> get specific task
 * isMoreThanSixHours:  DONE! -> this calculated the last time a mofication occured in the data to the current
 * moodChange:  DONE! -> this method can beused to update the moood of the pet only. to update the life use 'isMoreThanSixHours'
 * register: DONE!
 * login: DONE!
 * addTasktoUser: DONE! -> add task to the user
 * taskComplete:  DONE! -> when a task is complete, it sets the 'isComplete' to true, update the lastTimeModified, and pethealth
 * 
 * 
 */
