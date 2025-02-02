const { ObjectId } = require('mongodb');
const connectToDatabase = require('./dbConnection');
const UserModel = require('./models/userModel');  // Make sure this is the correct import

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
    const result = await userModel.completeTask(userId,taskId);
    console.log("task Done:", result); 

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





async function main() {
  
  try {
  //   const userData = {
  //     name: "John Doe",
  //     email: "john@example.com",
  //     password: "12345"
  //   };

  //   const petType = 1; 
  //   const petName = "Whiskers";

  //   await registerUser(userData,petType,petName);
   

    const currentUser = await loginUser("john@example.com", "12345");
    console.log(currentUser);
    if (currentUser) {
      //add task
      //const task = await addTaskToUser(currentUser._id,'Study JavaScript');
      //const task1 = await addTaskToUser(currentUser._id,'Study JavaScript');

      //change task
      // console.log('change it task ');
      // await taskComplete(currentUser._id,task._id);

      console.log('getall task ');
      console.log(await getTasksForUser(currentUser._id));

      console.log('get specific task ');
      console.log(currentUser._id);
      console.log(await getTaskForUser(currentUser._id,task._id) );
   
     }

  } catch (error) {
    console.error("Error:", error);
  }
}


main().catch(console.error);


/**
 * getTasks: DONE!
 * getTask: NOT DONE!
 * dateCalculate: NOT DONE!
 * moodChange: NOT DONE!
 * register: DONE!
 * login: DONE!
 * addTasktoUser: DONE!
 * taskComplete: NOT DONE!
 * 
 * 
 */
