const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You need to give your task a name!',
  },
  done: {
    type: Boolean,
    default: false,
  },
  timeSpent: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'Task should have a parent project',
  },
});

module.exports = mongoose.model('Task', taskSchema);
