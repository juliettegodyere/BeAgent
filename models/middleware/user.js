var express = require('express');
var router = express.Router();
var User = require('../photo');

module.exports = function(req,res,next){
	var uid = req.session.uid;
	if (!uid) return next();
	User.get(uid,function(err,user){
		if(err) return next(err);
		req.user = res.locals.user = user;
		next();
	});
};

module.exports = router;