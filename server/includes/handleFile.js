const path = require('path');
const uuidv4 = require('uuid/v4')
const multer = require('multer');
var dir = './public/uploads/';

//Storage
var storage = multer.diskStorage({
destination: (req, file, cb) => {
    var dest = dir + req.params.dir;
    cb(null, dest)
},
filename: (req, file, cb) => {
    var uuid = uuidv4();
    cb(null, uuid + path.extname(file.originalname))
}
});

//will be using this for uplading
const uploadFile = multer({ storage: storage });

module.exports = uploadFile;