const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const timelogSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Timelog should have the name of the task'
  },
  done: {
    type: Boolean,
    default: false
  },
  seconds: {
    type: Number,
    default: 0
  },
  started: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Project should belong to an author'
  },
  task: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
    required: 'Timelog should have assigned task'
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'Timelog should have assigned task'
  }
});

timelogSchema.statics.getProjects = function getProjects(id, start, end) {
  const query = [
    { $sort: { started: 1 } },
    {
      $lookup: {
        from: 'projects',
        localField: 'project',
        foreignField: '_id',
        as: 'projectdata'
      }
    },
    {
      $lookup: {
        from: 'tasks',
        localField: 'task',
        foreignField: '_id',
        as: 'taskdata'
      }
    }
  ];
  if (start && end) {
    query.unshift({
      $match: {
        $and: [{ started: { $gte: start, $lte: end } }, { author: id }]
      }
    });
  } else {
    query.unshift({ $match: { author: id } });
  }
  return this.aggregate(query);
};

module.exports = mongoose.model('Timelog', timelogSchema);
