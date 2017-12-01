const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const timelogSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Timelog should have the name of the task',
  },
  done: {
    type: Boolean,
    default: false,
  },
  seconds: {
    type: Number,
    default: 0,
  },
  started: {
    type: Date,
    default: Date.now,
  },
  finished: {
    type: Date,
    default: Date.now,
  },
  task: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
    required: 'Timelog should have assigned task',
  },
});

module.exports = mongoose.model('Timelog', timelogSchema);
