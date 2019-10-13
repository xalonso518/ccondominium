var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyTokenAdmin(req, res, next) {
	try{
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send('No token provided.');
      
    jwt.verify(token, config.secret_jwt, function(err, decoded) {
      if (err)
      return res.status(500).send('Failed to authenticate token.');
        
      // if everything good, save to request for use in other routes
      if(decoded.tipo == "admin") next();
      else return res.status(500).send('Failed to authenticate token.');
    });
  }
  catch(e){
    return res.status(500).send('Token no procesado.');
  }  
}
  
module.exports = verifyTokenAdmin;