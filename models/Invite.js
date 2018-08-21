const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const inviteSchema = new mongoose.Schema({
  invite: {
    type: String,
    trim: true,
    required: 'This field can not be empty'
  },
  used: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Invite', inviteSchema);
