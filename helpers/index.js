exports.catchErrors = fn => {
  return function gotcha(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
