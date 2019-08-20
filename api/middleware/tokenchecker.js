const jwt = require('jsonwebtoken');
const config = require('../config.js');

const checkToken = (req, res, next) => {
  let token = req.headers['Authorization'];
  
  if (token) {
    
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = checkToken;
