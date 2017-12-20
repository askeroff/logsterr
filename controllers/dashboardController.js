const mongoose = require('mongoose');

const Timelog = mongoose.model('Timelog');

exports.getLastMonthData = async (req, res) => {
  const date = new Date();
  const setFirstDay = date.setDate(1);
  const getLastDay = new Date(new Date(2008, 11 + 1, 1) - 1).getDate();
  const setLastDay = date.setDate(getLastDay);
  const data = await Timelog.find({
    author: req.user._id,
    started: {
      $gte: setFirstDay,
      $lte: setLastDay,
    },
  });

  res.send({ data });
};
