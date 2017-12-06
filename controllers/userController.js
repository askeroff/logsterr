const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const { validationResult } = require('express-validator/check');

const User = mongoose.model('User');

exports.validateSignup = (req, res, next) => {
  const data = validationResult(req);
  if (!data.isEmpty()) {
    res
      .status(403)
      .json({ result: 'error', errors: data.array().map(err => err.msg) });
  } else {
    next();
  }
};

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    res.json({ message: 'Please, provide a valid email' });
    return;
  }
  const user = new User({ email });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};
