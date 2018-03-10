const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');
const mail = require('./common/mail');

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

exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const message = 'Reset has been sent to you.';
  if (!user) {
    res.json({ message: 'No Such Account', success: false });
    return;
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  const resetURL = `/reset/${user.resetPasswordToken}`;
  await mail.send({
    user,
    subject: 'Password Reset',
    resetURL,
  });
  res.json({ message });
};

exports.getReset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    res.json({
      message: 'Password reset is either invalid or expired',
      getReset: false,
    });
  } else {
    res.json({ message: 'User was found!', getReset: true });
  }
};

exports.postReset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    res.json({
      message: 'Password reset is either invalid or expired',
      getReset: false,
    });
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordExpires = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  res.json({ message: 'Password is reset succesfully', postReset: true });
};
