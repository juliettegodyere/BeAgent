var models = require('../models/photo');



exports.form = function(req,res){
	res.render('register', {title:'Sign Up'});
};

exports.submit = function(req,res,next){
	var username = req.body.username;
	var usermail = req.body.usermail;
	var password = req.body.password;
	var confirmuserpass = req.body.confirmuserpass;

	models.MyUser.findOne({username:username,password:password,usermail:usermail}, function(err,user){
		if(err) return next(err);

		if(user){
			res.error("Username is already taken!");
			res.redirect('back');
		}else{
				var user = new models.MyUser();
				user.username = username;
				user.usermail = usermail;
				user.password = password;
				user.confirmuserpass = confirmuserpass;
			
				user.save(function(err, savedUser){
					if(err){
					console.log(err);
					return res.status(500).send();
					}
					console.log(savedUser);
					req.session.uid = user.id;
					console.log(user.id);
					return res.redirect('/login');
				// return res.status(200).send();
				});

			}
	});

		
};
// This commented code is used to query/find all item in base all datas from the database
// models.MyUser.find({}, function(err, user){
// 	console.log(err);
// 	console.log(user);
// });
