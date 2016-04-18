var mongoose = require('mongoose');
var Photo = require('../models/photo');

// var bcrypt = require('bcrypt');
// mongoose.connect('mongodb://127.0.0.1:27017/photo_app');

var schema = new mongoose.Schema({
	username: String,
	password: String,
	confirmuserpass:String,
	usermail:String
});

// var schema2 = new mongoose.Schema({
// 	houseName:String,
// 	location:String,
// 	price:Number
// })

module.exports = mongoose.model('User', schema);
// module.exports = mongoose.model('Search', schema2);


//Fetching a user from mongodb
// User.getByName = function(name, fn){
// 	//Look up user ID by name
// 	User.getId(name, function(err,id){
// 		if (err) return fn(err);
// 		//Grab user with the id
// 		User.get(id,fn);
// 	});

// };

// User.getId = function(name,fn){
	
// }