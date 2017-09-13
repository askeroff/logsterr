exports.login = (req, res) => {
  res.json({ result: 'success', user: req.user });
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true });
    next();
  }
  res.json({ authenticated: false });
};
