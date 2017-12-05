exports.login = (req, res) => {
  res.json({ user: req.user });
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ loggedIn: false });
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.json({ authenticated: false, test: req.session });
};

exports.getClientAUser = (req, res) => {
  const user = { loggedIn: false };
  if (req.user) {
    user._id = req.user._id;
    user.email = req.user.email;
    user.__v = req.user.__v;
    user.loggedIn = true;
    user.error = '';
  }
  res.json({ user });
};
