exports.login = (req, res) => {
  res.json({ user: req.user });
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ loggedIn: false });
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true });
    next();
  }
  res.json({ authenticated: false });
};
