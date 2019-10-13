var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyToken(req, res, next) {
  try{
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send('Sin token.');
      
    jwt.verify(token, config.secret_jwt, function(err, decoded) {
      if (err)
      return res.status(500).send('Token no autorizado.');
        
      req.userId = decoded.id;
      next();
    });
  }
  catch(e){
    return res.status(500).send('Token no procesado.');
  }
}

module.exports = verifyToken;