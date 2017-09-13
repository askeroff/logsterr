const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');

exports.validateSignup = (req, res, next) => {
  req.checkBody('email', 'Invalid email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password Cannot be less than 5 symbols long!').isLength({ min: 5 });
  const errors = req.validationErrors();
  if (errors) {
    res.json({ result: 'error', errors: errors.map(err => err.msg) });
    return;
  }
  next();
};

exports.signup = async (req, res, next) => {
  const user = new User({ email: req.body.email });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

