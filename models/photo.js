var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/photo_app');

var schema = new mongoose.Schema({
	name: String,
	path: String,
	location:String,
	amount:String,
	datePosted:Date
});
var Photo = mongoose.model('Photo', schema);

var schemaForm = new mongoose.Schema({
	username:String,
	password:String,
	confirmuserpass:String,
	usermail:String,

});


var MyUser = mongoose.model('MyUser', schemaForm);

module.exports = {
	Photo:Photo,
	MyUser:MyUser
};

