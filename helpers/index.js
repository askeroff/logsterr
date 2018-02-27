exports.catchErrors = fn =>
  function gotcha(req, res, next) {
    return fn(req, res, next).catch(next);
  };
