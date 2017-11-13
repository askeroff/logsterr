const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You need to give your project a name!',
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Project should belong to an author',
  },
});

module.exports = mongoose.model('Project', projectSchema);
