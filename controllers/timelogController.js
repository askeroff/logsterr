const mongoose = require('mongoose');

const Timelog = mongoose.model('Timelog');

exports.addTime = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const timelog = await new Timelog(req.body).save();
  res.json({ timelog });
};

exports.getLogs = async (req, res) => {
  const timelogs = await Timelog.find({
    author: req.user._id,
  }).sort({ started: 'desc' });

  res.json(timelogs);
};
