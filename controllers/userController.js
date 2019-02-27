const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');
const mail = require('./common/mail');

const User = mongoose.model('User');
const Invite = mongoose.model('Invite');

exports.validateSignup = async (req, res, next) => {
  const data = validationResult(req);
  const invite = await Invite.find({
    invite: req.body.invite
  });
  const trueInvite = invite.length > 0 && invite[0].used === false;

  if (!data.isEmpty() || !trueInvite) {
    const errors = data.array().map(err => err.msg);
    if (!trueInvite) {
      errors.push('This invite is either already used or false');
    }
    res.status(403).json({ result: 'error', errors });
  } else {
    try {
      const item = await Invite.findById(invite[0]._id);
      item.used = true;
      item.save();
      return next();
    } catch (e) {
      res.status(403).json({
        result: 'error',
        errors: ['Something went wrong. Try again later']
      });
    }
  }
  return true;
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
    resetURL
  });
  res.json({ message });
};

exports.saveSettings = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, startsDay, newPassword = '' } = req.body.settings;
  user.startsDay = startsDay;
  await user.save();
  if (newPassword.length > 0) {
    const changePassword = promisify(user.changePassword, user);
    try {
      await changePassword(oldPassword, newPassword);
    } catch (err) {
      return res.json({ error: 'Old password is incorrect' });
    }
  }
  return res.json({
    success: true,
    user: {
      email: user.email,
      startsDay: user.startsDay,
      _id: user._id
    }
  });
};

exports.getReset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });

  if (!user) {
    res.json({
      message: 'Password reset is either invalid or expired',
      getReset: false
    });
  } else {
    res.json({ message: 'User was found!', getReset: true });
  }
};

exports.postReset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });

  if (!user) {
    res.json({
      message: 'Password reset is either invalid or expired',
      getReset: false
    });
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordExpires = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  res.json({ message: 'Password is reset succesfully', postReset: true });
};
