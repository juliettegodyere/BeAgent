var models = require('../models/photo');

exports.form = function(req,res){
	res.render('login', {title:'Sign In'});
};

exports.submit = function(req,res,next){
	var usermail = req.body.usermail;
	var password = req.body.password;

	models.MyUser.findOne({usermail:usermail,password:password}, function(err,user){
		if(err)return next(err);

		if(user){
			req.session.uid = user.id;
			res.redirect('/upload');
		}else{
			res.error("Sorry invalid credentials.");
			res.redirect('back');
		}
	});
};

exports.logout = function(req,res){
	req.session.destroy(function(err){
		if(err) throw err;
		res.redirect('/');
	})
};

// This commented code is used to query/find all item in base all datas from the database
// models.MyUser.find({}, function(err, user){
// 	console.log(err);
// 	console.log(user);
// });




