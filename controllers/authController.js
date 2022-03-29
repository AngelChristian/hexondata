var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

// @desc    fake sign-in
// @route   POST /auth/signin
exports.signin = (req, res) => {
  const { username, password } = req.body;

  if (username == 'admin' && password == 'admin') {
    //create token
    const token = jwt.sign({ username: 'admin' }, process.env.SECRET);
    //put token in cookie
    res.cookie('token', token, { expiresIn: '2h' });

    //send response
    return res.json({ token, user: { username } });
  } else {
    return res.status(401).json({
      error: 'failed to login',
    });
  }
};

// @desc    fake sign-out to destroy the jwt in cookie
// @route   GET /auth/signout
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'User signed out successfully',
  });
};

//custom middlewares for jwt verification
exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(401).json({
      error: 'TOKEN REQUIRED',
    });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        error: 'ACCESS DENIED',
      });

    next();
  });
};
