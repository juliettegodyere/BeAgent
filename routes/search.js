var Photo = require('../models/photo');


exports.search = function(req,res,next){ 
	res.render('index');
};

exports.searchSubmit = function(req,res,next){
	var name = req.body.name;
	var location = req.body.location;
	var amount = req.body.amount;

	console.log(propertyName);

	models.Photo.find({}, function(err,input){
		
		if (err) {
			console.log(err);
			return res.status(500).send();
		}
		if (input===req.body.propertyName) {
			return res.status(200).send();
			console.log("Hey man! have got you covered");
		}
		console.log(input);
		console.log(name);
		// if(err) return next(err);

		// if(!search){
		// 	res.error("Sorry! saved item matches your input");
		// 	res.redirect('back');
		// }else{
		// 		var photo = new Photo();
		// 		photo.name = name;
		// 		photo.location = location;
		// 		photo.amount = amount;
				
		// 		console.log(search);

		// 		return res.send('You are good');
			
				// user.save(function(err, savedUser){
				// 	if(err){
				// 	console.log(err);
				// 	return res.status(500).send();
				// 	}
				// 	console.log(savedUser);
				// 	req.session.uid = user.id;
				// 	console.log(user.id);
				// 	return res.redirect('/login');
				// // return res.status(200).send();
				// });

			
	});

		
};

