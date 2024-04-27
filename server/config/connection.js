const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
// mongodb+srv://mvs1027:Qs5j27101991!@cluster0.uqds3we.mongodb.net/ 
// mongodb+srv://mvs1027:<password>@cluster0.uqds3we.mongodb.net/

//const uri = process.env.MONGODB_URI;
module.exports = mongoose.connection;
