const mongoose = require('mongoose');

const Timelog = mongoose.model('Timelog');

exports.addTime = async (req, res) => {
  const timelog = await new Timelog(req.body).save();
  res.json({ timelog });
};
