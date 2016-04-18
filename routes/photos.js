
var models = require('../models/photo');
// var user = require('../models/user');

var path = require('path');
var fs = require('fs');
var join = path.join;

//This commented code is using arrays to hold images
// var photos = [];
// photos.push({
// 	name:'Node.js Logo',
// 	path:src='/images/avatar1.png' 
// });
// photos.push({
// 	name:'Ryan Speaking',
// 	path: src='/images/avatar.jpg'
// });

exports.form = function(req,res){
	res.render('photos/upload', {
		title:'Photo upload',
	});
};

//Handles the photo upload submit aspect
exports.submit = function(req,res){
	// Gets the temporary location of photo
	var tmp_path = req.file.path;
	//Show where the file should actually exists-in this caseit is in the "public/photos" directory
	var target_path = './public/photos/' + req.file.originalname;
	//The uploaded photo path called in index.ejs as such photo.path
	var img = req.file;
	//The original name of the uploaded file is stored in the variable originalname
	var path = img.originalname;

	//Move the photo from the temporary location to the intended location
	var src = fs.createReadStream(tmp_path);

	var dest = fs.createWriteStream(target_path);
	src.pipe(dest);
	src.on('end',function(){

			//This initializes the variable name from the model
			var name = req.body.name;
			var location = req.body.location;
			var amount = req.body.amount;
			var datePosted = new Date();
			
			//instantiating our model
			var user = new models.Photo();
			//This initializes the variable name and path from the model
			user.name = name,
			user.location = location,
			user.amount = amount,
			user.path = path,
			user. datePosted = datePosted

			//saves the uploaded photo and inputed name in MongoDB(database)
			user.save(function(err,savedUser){
			if (err) return res.status(err);
				//This outputs datas like the: Field which in our case is thumbnail
				//Originalname which gives the actual name of the uploaded photo
				//destination which in our case it's public/photos
				//size  which is the size of the image
				//filename
				//path which comprises of the destination/filename etc
				console.log(req.file);

				//This outputs to the console the saves data
				console.log(savedUser);
				//when successful redirect to database
				res.redirect('/');
			});	

			
	
	});
	//Error flag when photo not uploaded
	src.on('error',function(err){
		console.log('File not uploaded');
		res.render('error');
	});

};

// This commented code is used to delete/remove all datas from the database
// models.Photo.find({}).remove({}, function(){
// 	console.log('purge complete');
// });


// This commented code is used to query/find all item in base all datas from the database
// Photo.find({}, function(err, inputs){
// 	console.log(err);
// 	console.log(inputs);
// });

//This code here handles the search submit.
exports.searchSubmit = function(req,res){
	var name = req.body.name;

	var location = req.body.location;
	var amount = req.body.amount;
	// var path = req.file.thumbnail;

	//Finds only for a matching name. will still work on matching location and amount
	models.Photo.find({name:name}, function(err,input){
		if (err) {
			return res.status(500).send();
		}
		//This checks if input===[](when no matching value in the database),if yes return error
		if (input.length===0) {
			console.log(input);
			return res.status(404).send();		
		}
		//this renders index and post only the items found
		console.log(input);
		res.render('search',{
			title:'Photos',
			photos:input
		});


	
	});
				


		
};

	
exports.list = function(req,res,next){
	models.Photo.find({}, function(err, photos){
		if (err) return next(err);
		res.render('photos', {
			title:'Photos',
			photos:photos
		});


	});
	
};
	
// module.exports = router;