const UserDAO = require('../models/UserDAO');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	UserDAO.getAll()
	.then((users) => {
		res.send(users);
	});
});

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id)
	UserDAO.getByID(id)
	.then((users) => {
		res.status(200)
		.json({
			status: "success",
			user: users
		});
		res.send()
	})
	.catch((error) =>
		res.send(error)
		)

});

router.post('/', function(req, res, next) {
	var name = req.body.user.name
	var email = req.body.user.email
	console.log(name +  ' ' + email)
	UserDAO.createUser(name, email)
	.then((result) => {
		res.status(200)
		res.send(result)
	})
		.catch((error) =>
		res.send(error)
		)

});
	

router.delete('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var id = req.body.user.id
	if(urlid==id){
		UserDAO.deleteUser(id)
		.then((result) => {
			res.status(200)
			res.send(result)
		})
			.catch((error) =>
			res.send(error)
			)
	}

});


router.put('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var id = req.body.user.id
	var name = req.body.user.name
	var email = req.body.user.email
	var alliance = req.body.user.alliance
	if (urlid == id){
		UserDAO.updateUser(id, name, email, alliance)
		.then((result) => {
			res.status(200)
			res.send(result)
		})
			.catch((error) =>
			res.send(error)
			)
	}

});
	


module.exports = router;
