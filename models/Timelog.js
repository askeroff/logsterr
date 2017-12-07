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
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Project should belong to an author',
  },
  task: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
    required: 'Timelog should have assigned task',
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'Timelog should have assigned task',
  },
});

timelogSchema.statics.getProjects = function(id) {
  return this.aggregate([
    { $match: { author: id } },
    { $sort: { started: 1 } },
    {
      $lookup: {
        from: 'projects',
        localField: 'project',
        foreignField: '_id',
        as: 'projectdata',
      },
    },
  ]);
};

module.exports = mongoose.model('Timelog', timelogSchema);
