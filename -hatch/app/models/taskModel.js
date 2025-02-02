// taskModel.js
const { ObjectId } = require('mongodb');

class TaskModel {
  constructor(db) {
    this.db = db;
    this.collection = this.db.collection('tasks');  
  }

  // Static method to create a task
  static async createTask( taskName) {
    const task = {
      name: taskName,
      isCompleted:false,
      createdAt: new Date(),
    };

    return result.ops[0];  
  }
}

module.exports = TaskModel;
